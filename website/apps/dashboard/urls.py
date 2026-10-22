
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import LogoutView
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='dashboard_index'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('password-reset/', auth_views.PasswordResetView.as_view(),
         name='password_reset'),
    path('password-reset/done/', auth_views.PasswordResetDoneView.as_view(),
         name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(),
         name='password_reset_complete'),
    path('index/', views.index, name='index'),
    path('users_profile/<int:user_id>/',
         views.users_profile, name='users_profile'),
    path('company_profile/', views.company_profile, name="company_profile"),


    path('create_user/', views.create_user, name="create_user"),
    path('usergroup/', views.usergroup, name='usergroup'),
    path('usergroup/<int:usergroup_id>/permissions/',
         views.user_permission, name='user_permission'),
    path('users_list/', views.users_list, name='users_list'),
    path('delete_profile/<int:user_id>/',
         views.delete_profile, name='delete_profile'),
    path('module/<int:module_id>/', views.module_view, name='module_url_name'),
    path('child/<int:child_id>/', views.child_view, name='child_url_name'),
    path('add-usergroup/', views.add_usergroup, name='add_usergroup'),
    path('usergroup/edit/<int:group_id>/',
         views.edit_usergroup, name='edit_usergroup'),
    path('usergroups/delete/<int:id>/',
         views.usergroup_delete, name='usergroup_delete'),
    path('enquiry/', views.enquiry_view, name='enquiry'),
    path('add_page/', views.add_page, name='add_page'),
    path('page/', views.page_view, name='page_view'),
    path('page/edit/<int:page_id>/', views.edit_page, name='edit_page'),
    path('page/delete/<int:page_id>/', views.delete_page, name='delete_page'),
    path('page/toggle-status/<int:page_id>/',
         views.toggle_page_status, name='toggle_page_status'),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('add_gallery/', views.add_gallery, name='add_gallery'),
    path('gallery/', views.gallery_view, name='gallery_view'),
    path('edit-gallery/<int:id>/', views.edit_gallery, name='edit_gallery'),
    path('delete-gallery/<int:id>/', views.delete_gallery, name='delete_gallery'),
    path('add_file/', views.add_file, name='add_file'),
    path('files/', views.file_manager, name='file_manager'),
    path('edit_file/<int:id>/', views.edit_file, name='edit_file'),
    path('delete_file/<int:id>/', views.delete_file, name='delete_file'),
    
    # blog
    
    # categories
    
    path('categories/', views.categories, name='categories'),
    path('categories/add/', views.add_category, name='add_category'),
    path('categories/<int:pk>/edit/', views.edit_category, name='edit_category'),
    path('categories/<int:pk>/delete/',
         views.delete_category, name='delete_category'),
         
    # posts
    
    path('posts/', views.posts, name='posts'),
    path('post/add/', views.add_post, name='add_post'),
    path('post/edit/<int:pk>/', views.edit_post, name='edit_post'),
    path('post/delete/<int:pk>/', views.delete_post, name='delete_post'),
    
    #  FORM ENQUIRYS
    
    path('contact-enquiry/', views.contact_requests, name='contact_requests'),
    path('contact-enquiry/delete/<int:id>/',
         views.delete_contact_enquiry, name='delete_contact_enquiry'),

    # MODULE PRIORITY URL
    
    path('module-priority/', views.module_priority, name='module_priority'),


    # --- DATA MODULE ---
    path('products/', views.products_list, name='products_list'),
    path('products/add/', views.add_product, name='add_product'),
    path('products/edit/<int:pk>/', views.edit_product, name='edit_product'),
    path('products/delete/<int:pk>/', views.delete_product, name='delete_product'),

    path('product-categories/', views.product_categories, name='product_categories'),
    path('product-categories/add/', views.add_product_category, name='add_product_category'),
    path('product-categories/edit/<int:pk>/', views.edit_product_category, name='edit_product_category'),
    path('product-categories/delete/<int:pk>/', views.delete_product_category, name='delete_product_category'),

    path('clients/', views.clients_list, name='clients_list'),
    path('clients/add/', views.add_client, name='add_client'),
    path('clients/edit/<int:pk>/', views.edit_client, name='edit_client'),
    path('clients/delete/<int:pk>/', views.delete_client, name='delete_client'),

    path('certifications/', views.certifications_list, name='certifications_list'),
    path('certifications/add/', views.add_certification, name='add_certification'),
    path('certifications/edit/<int:pk>/', views.edit_certification, name='edit_certification'),
    path('certifications/delete/<int:pk>/', views.delete_certification, name='delete_certification'),

    path('team-photos/', views.team_photos_list, name='team_photos_list'),
    path('team-photos/add/', views.add_team_photo, name='add_team_photo'),
    path('team-photos/edit/<int:pk>/', views.edit_team_photo, name='edit_team_photo'),
    path('team-photos/delete/<int:pk>/', views.delete_team_photo, name='delete_team_photo'),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
