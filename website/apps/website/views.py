import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from apps.dashboard.models import ContactEnquiry, CompanyDetails




def home(request):
    return render(request, 'website/pages/index.html')

def about(request):
    return render(request, 'website/pages/about.html')

def ceo_message(request):
    return render(request, 'website/pages/ceo-message.html')

def global_facilities(request):
    return render(request, 'website/pages/global-facilities.html')

def divisions(request):
    return render(request, 'website/pages/divisions.html')

def product(request):
    return render(request, 'website/pages/products.html')

def project(request):
    return render(request, 'website/pages/projects.html')

def client(request):
    return render(request, 'website/pages/clients.html')

def blog(request):
    return render(request, 'website/pages/blog.html')

def contact(request):
    return render(request, 'website/pages/contact.html')


@csrf_exempt
def submit_contact(request):
    if request.method == 'POST':
        try:
            # Handle both JSON and form data
            if request.content_type == 'application/json':
                data = json.loads(request.body)
            else:
                data = request.POST

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
