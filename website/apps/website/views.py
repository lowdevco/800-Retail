import json
from django.shortcuts import render
from django.core.cache import cache
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from apps.dashboard.models import ContactEnquiry, CompanyDetails
from apps.dashboard.models import Page, Project, Product, Blog

def get_page_context(slug):
    try:
        return {'page': Page.objects.get(slug=slug)}
    except Page.DoesNotExist:
        return {}

def home(request):
    context = get_page_context('home')
    
    recent_blogs = Blog.objects.filter(status='Published').select_related('category').order_by('-created_at')
    
    # Try to get 3 blogs from separate categories
    distinct_blogs = []
    seen_categories = set()
    for blog in recent_blogs:
        if blog.category_id not in seen_categories:
            distinct_blogs.append(blog)
            seen_categories.add(blog.category_id)
        if len(distinct_blogs) == 3:
            break
            
    # If we couldn't get 3 from separate categories, fill the rest with the most recent ones not already picked
    if len(distinct_blogs) < 3:
        for blog in recent_blogs:
            if blog not in distinct_blogs:
                distinct_blogs.append(blog)
            if len(distinct_blogs) == 3:
                break
                
    context['recent_blogs'] = distinct_blogs
    return render(request, 'website/pages/index.html', context)

def about(request):
    return render(request, 'website/pages/about.html', get_page_context('about'))

def ceo_message(request):
    return render(request, 'website/pages/ceo-message.html', get_page_context('ceo_message'))

def global_facilities(request):
    return render(request, 'website/pages/global-facilities.html', get_page_context('global_facilities'))

def divisions(request):
    return render(request, 'website/pages/divisions.html', get_page_context('divisions'))

def product(request):
    context = get_page_context('product')
    context['products'] = Product.objects.all().order_by('-created_at')
    return render(request, 'website/pages/products.html', context)

def project(request):
    context = get_page_context('project')
    context['projects'] = Project.objects.all().order_by('-created_at')
    return render(request, 'website/pages/projects.html', context)

def client(request):
    return render(request, 'website/pages/clients.html', get_page_context('client'))

def blog(request):
    context = get_page_context('blog')
    context['blogs'] = Blog.objects.filter(status='Published').order_by('-created_at')
    return render(request, 'website/pages/blog.html', context)

def contact(request):
    return render(request, 'website/pages/contact.html', get_page_context('contact'))



def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0]
    return request.META.get('REMOTE_ADDR')

@csrf_exempt
def submit_contact(request):
    if request.method == 'POST':
        try:
            # Handle both JSON and form data
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

            
            ip = get_client_ip(request)
            cache_key = f"contact_limit_{ip}"
            attempts = cache.get(cache_key, 0)
            if attempts >= 3:
                return JsonResponse({'error': 'You have submitted too many requests. Please wait an hour before trying again.'}, status=429)
            cache.set(cache_key, attempts + 1, 3600) # 1 hour timeout
            
            name = data.get('name')
            email = data.get('email')
            phone = data.get('phone', '')
            subject = data.get('subject', 'New Contact Form Submission')
            message = data.get('message', '')

            if not name or not email or not message:
                return JsonResponse({'error': 'Name, email, and message are required.'}, status=400)

            # Save to database
            enquiry = ContactEnquiry.objects.create(
                name=name,
                email=email,
                phone=phone,
                subject=subject,
                message=message
            )

            # Get company details for the admin email
            company = CompanyDetails.objects.first()
            company_email = company.email if company and company.email else settings.DEFAULT_FROM_EMAIL
            base_url = request.build_absolute_uri('/')[:-1] # Remove trailing slash

            context = {
                'name': name,
                'email': email,
                'phone': phone,
                'subject': subject,
                'message': message,
                'base_url': base_url,
            }

            # Send Email to Admin
            admin_html = render_to_string('emails/contact_admin.html', context)
            admin_msg = EmailMultiAlternatives(
                subject=f"New Contact Form Submission: {subject}",
                body=f"Name: {name}\nEmail: {email}\nPhone: {phone}\n\nMessage:\n{message}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[company_email]
            )
            admin_msg.attach_alternative(admin_html, "text/html")
            admin_msg.send(fail_silently=True)

            # Send Email to Client
            client_html = render_to_string('emails/contact_client.html', context)
            client_msg = EmailMultiAlternatives(
                subject=f"We received your message: {subject}",
                body=f"Dear {name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\n800retail",
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[email]
            )
            client_msg.attach_alternative(client_html, "text/html")
            client_msg.send(fail_silently=True)

            return JsonResponse({'success': 'Your message has been sent successfully!'}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

from django.shortcuts import get_object_or_404

def blog_detail(request, slug):
    blog = get_object_or_404(Blog, slug=slug, status='Published')
    related_news = Blog.objects.filter(status='Published', category=blog.category).exclude(id=blog.id).first()
    if not related_news:
        related_news = Blog.objects.filter(status='Published').exclude(id=blog.id).first()
    return render(request, 'website/pages/blog_detail.html', {'blog': blog, 'related_news': related_news})
