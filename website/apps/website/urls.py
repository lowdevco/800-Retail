from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('company/about/', views.about, name='about'),
    path('company/ceo-message/', views.ceo_message, name='ceo_message'),
    path('company/global-facilities/', views.global_facilities, name='global_facilities'),
    path('capabilities/divisions/', views.divisions, name='divisions'),
    path('capabilities/products-and-solutions/', views.product, name='product'),
    path('portfolio/projects/', views.project, name='project'),
    path('portfolio/our-clientele/', views.client, name='client'),
    path('blog/', views.blog, name="blog"),
    path('blog/<slug:slug>/', views.blog_detail, name="blog_detail"),
    path('contact/', views.contact, name="contact"),
    path('api/contact/', views.submit_contact, name='submit_contact'),
]
