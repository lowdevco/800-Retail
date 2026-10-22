from django.urls import path
from django.views.generic import RedirectView
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('company/the-group/', views.the_group, name='the_group'),
    path('company/retail-concept/', views.retail_concept, name='retail_concept'),
    path('company/retail-fixture/', views.retail_fixture, name='retail_fixture'),
    path('company/retail-led/', views.retail_led, name='retail_led'),
    path('company/retail-lighting/', views.retail_lighting, name='retail_lighting'),
    path('portfolio/projects-and-solutions/', views.product, name='product'),
    path('portfolio/our-clientele/', views.client, name='client'),
    path('blog/', views.blog, name="blog"),
    path('blog/<slug:slug>/', views.blog_detail, name="blog_detail"),
    path('contact/', views.contact, name="contact"),
    path('capabilities/projects-and-solutions/', RedirectView.as_view(pattern_name='product', permanent=True)),
    path('api/contact/', views.submit_contact, name='submit_contact'),
]