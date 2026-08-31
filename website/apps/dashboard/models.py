# models.py
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_delete
import os
from ckeditor import widgets
from django.db import models
from django.contrib.auth.models import User
# pyrefly: ignore [missing-import]
from ckeditor_uploader.fields import RichTextUploadingField
# pyrefly: ignore [missing-import]
from ckeditor.fields import RichTextField


class Profile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    usergroup = models.ForeignKey(
        'UserGroup', on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=100, blank=True)
    image = models.ImageField(
        upload_to='profile_images', blank=True, null=True)

    class Meta:
        db_table = 'dashboard_profile'


class UserGroup(models.Model):
    name = models.CharField(max_length=100)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "dash_usergroup"


class Module(models.Model):
    name = models.CharField(max_length=100)
    url_name = models.CharField(max_length=255, null=True, blank=True)
    icon_class = models.CharField(max_length=100, blank=True)
    priority = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "dash_module"
        ordering = ['priority', 'id']


class Child(models.Model):
    module = models.ForeignKey(
        Module, related_name='children', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    url_name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.name} (Child of {self.module.name})"

    class Meta:
        db_table = "dash_child"


class Permission(models.Model):
    usergroup = models.ForeignKey(
        UserGroup, on_delete=models.CASCADE, null=True, blank=True)
    module = models.ForeignKey(
        Module, on_delete=models.CASCADE, null=True, blank=True)
    enabled = models.BooleanField(default=False)

    class Meta:
        db_table = "dash_permission"


class Page(models.Model):
    POSITION_CHOICES = [
        ('header', 'Header'),
        ('footer', 'Footer'),
    ]

    position = models.CharField(
        max_length=50,
        choices=POSITION_CHOICES,
        verbose_name="Position"
    )

    parent = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="Parent Page"
    )

    page_name = models.CharField(
        max_length=200,
        verbose_name="Page Name",
        null=True,
    )

    title = models.CharField(
        max_length=200,
        verbose_name="Title"
    )

    slug = models.SlugField(
        unique=True,
        help_text="URL friendly name (e.g. about-us, contact)",
        verbose_name="URL"
    )

    priority = models.IntegerField(
        default=0,
        verbose_name="Priority"
    )

    description = RichTextUploadingField(
        blank=True,
        verbose_name="Description"
    )

    # SEO Fields
    meta_title = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Meta Title"
    )

    canonical_tag = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name="Canonical Tag"
    )
    show_in_menu = models.BooleanField(default=True)

    meta_description = models.TextField(
        blank=True,
        null=True,
        verbose_name="Meta Description"
    )

    class Meta:
        ordering = ['priority', 'title']
        verbose_name = "Page"
        verbose_name_plural = "Pages"

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        try:
            from django.urls import reverse
            return reverse(self.slug)
        except:
            return f"/p/{self.slug}/"

    def get_menu_children(self):
        return self.page_set.filter(show_in_menu=True).order_by('priority')

    def is_active(self, current_url_name):
        if self.slug == current_url_name:
            return True
        for child in self.page_set.all():
            if child.slug == current_url_name:
                return True
        return False

    class Meta:
        db_table = "dash_page"


class Gallery(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.title


class FileManager(models.Model):

    name = models.CharField(max_length=200)
    image = models.ImageField(
        upload_to='gallery/'
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name

    @property
    def image_url(self):
        return self.image.url

# blog models


class Category(models.Model):
    category_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.category_name


STATUS_CHOICES = (
    ('Draft', 'Draft'),
    ('Published', 'Published')
)


class Blog(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    featured_image = models.ImageField(upload_to='blog/')
    short_description = models.TextField(max_length=500)
    meta_tags = models.CharField(max_length=255, blank=True, null=True,
                                 help_text="Comma-separated tags (e.g., Laundry Care, Dry cleaning Tips)")
    blog_body = RichTextUploadingField()
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='Draft')
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class ContactEnquiry(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.subject}"

    class Meta:
        verbose_name_plural = "Contact Enquiries"


class CompanyDetails(models.Model):
    company_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    short_description = models.TextField(blank=True, null=True)
    company_logo = models.ImageField(
        upload_to='company_logos/', blank=True, null=True)
    email_logo_url = models.CharField(
        max_length=500, blank=True, null=True, 
        help_text="Google Drive Logo ID: Extract and paste ONLY the file ID from your Google Drive share link.")
    def save(self, *args, **kwargs):
        self.pk = 1
        super(CompanyDetails, self).save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.company_name or "Company Profile"

    class Meta:
        verbose_name_plural = "Company Details"


# Define which fields to clean up for each model

MEDIA_MODELS = {
    Profile: "image",
    Gallery: "image",
    FileManager: "image",
    CompanyDetails: "company_logo",
    Blog: "featured_image",
}


def delete_media(file_field):
    if not file_field:
        return

    try:
        storage = file_field.storage
        storage.delete(file_field.name)
    except Exception:
        pass


@receiver(post_delete)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if sender not in MEDIA_MODELS:
        return

    field_name = MEDIA_MODELS[sender]
    file_field = getattr(instance, field_name, None)

    delete_media(file_field)


@receiver(pre_save)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if sender not in MEDIA_MODELS:
        return

    if not instance.pk:
        return

    try:
        old_instance = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    field_name = MEDIA_MODELS[sender]

    old_file = getattr(old_instance, field_name, None)
    new_file = getattr(instance, field_name, None)

    if old_file and old_file != new_file:
        delete_media(old_file)


class Project(models.Model):
    title = models.CharField(max_length=200)
    store_name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    thumbnail = models.CharField(max_length=500, help_text='Paste image URL from File Manager/Gallery')
    video_id = models.CharField(max_length=100, blank=True, null=True, help_text='YouTube Video ID (e.g., Ym-lgWHk9AY)')
    scope = RichTextUploadingField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    def save(self, *args, **kwargs):
        if self.thumbnail and '/website/media/' in self.thumbnail:
            self.thumbnail = self.thumbnail.replace('/website/media/', '/media/')
        if self.video_id:
            import re
            # Extract src if user pasted iframe
            match = re.search(r'src="([^"]+)"', self.video_id)
            if match:
                self.video_id = match.group(1)
            # Extract video ID from embed URL
            if 'youtube.com/embed/' in self.video_id:
                self.video_id = self.video_id.split('youtube.com/embed/')[1].split('?')[0]
            # Ensure it is just the ID
            self.video_id = self.video_id.replace('https://', '').replace('http://', '').replace('www.youtube.com/watch?v=', '')
            if '&' in self.video_id:
                self.video_id = self.video_id.split('&')[0]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProductCategory(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Product Categories'


    def __str__(self):
        return self.name

class Product(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.CharField(max_length=500, help_text='Paste image URL from File Manager/Gallery')
    video_url = models.CharField(max_length=500, blank=True, null=True, help_text='Full YouTube Embed URL')
    store_name = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200, blank=True)
    store_type = models.CharField(max_length=200, blank=True)
    store_size = models.CharField(max_length=100, blank=True)
    scope_of_project = RichTextUploadingField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)



    def save(self, *args, **kwargs):
        if self.image and '/website/media/' in self.image:
            self.image = self.image.replace('/website/media/', '/media/')
        if self.video_url:
            import re
            # Extract src if user pasted iframe
            match = re.search(r'src="([^"]+)"', self.video_url)
            if match:
                self.video_url = match.group(1)
            # Ensure it has http/https
            if self.video_url.startswith('www.'):
                self.video_url = 'https://' + self.video_url
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
