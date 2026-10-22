"""Seed the new Data-module content with what was hardcoded in the
templates, and add the three CMS screens to the dashboard sidebar.

Images live in media/ like any file uploaded through the CMS
(editable / replaceable / deletable). If media/clients/ and media/team/
already hold the files they are linked directly; otherwise they are copied
from the old static/ location if it still exists. Missing files are skipped.
Each seed only runs when its table is empty, so re-running is safe.
"""
import os

from django.conf import settings
from django.core.files import File
from django.db import migrations

STATIC_IMG = os.path.join(settings.BASE_DIR, 'static', 'website', 'assets', 'images')

CLIENTS = [
    ('Adidas', 'clients/adidas.svg', 'Global Sportswear Brand',
     'Thank you, Asics, for partnering with us! We value your trust and collaboration. Together, we stride forward with confidence and excellence honoring our shared journey and success.'),
    ('Skechers', 'clients/Skechers.svg', 'Footwear & Lifestyle Brand',
     'We deeply appreciate Skechers for placing your trust in us! Thank you for your ongoing partnership together we walk strong, stepping toward success and shared growth.'),
    ('Birkenstock', 'clients/Birkenstock.svg', 'Premium Footwear Brand',
     'Thank you, Asics, for partnering with us! We value your trust and collaboration. Together, we stride forward with confidence and excellence honoring our shared journey and success.'),
    ('Asics', 'clients/asics.svg', 'Performance Sports Brand',
     'We are grateful to Apparel Group for your trust and partnership! Together we style success, blending fashion and quality. Thank you for continuing this valued journey with us.'),
    ('Apparel Group', 'clients/Apparel_group.png', 'Retail Partner',
     'We are grateful to Apparel Group for your trust and partnership! Together we style success, blending fashion and quality. Thank you for continuing this valued journey with us.'),
    ('Landmark Group', 'clients/Landmark_group.svg', 'Retail Conglomerate',
     'Thank you, Landmark Group, for your confidence and trust in our work! Together we build impact across retail and community. We appreciate this journey of excellence.'),
    ('Nesto', 'clients/Nesto.png', 'Hypermarket Chain',
     'We sincerely thank Nesto for entrusting us with your partnership! Together we serve communities with care and quality. Your trust inspires us toward continued growth.'),
    ('Brands For Less', 'clients/Brands_for_less.png', 'Discount Retailer',
     'We appreciate Brands For Less for your trust and partnership! Together we bring value and style to shoppers. Thank you for joining us on this innovative and rewarding journey.'),
    ('Brand Folio', 'clients/Brand_folio.jpg', 'Retail Group',
     'Thank you, Brand Folio, for your trust and collaboration! Together we elevate identity and creativity. We value our joint path forward grateful for your partnership every step.'),
    ('Reebok', 'clients/Reebok.svg', 'Sports Footwear',
     'Thank you, Reebok, for your trust and collaboration! Together we power performance and style. Your confidence in us fuels our commitment here is to continued success together.'),
]

CERTIFICATIONS = [
    ('ISO 9001:2015', 'Quality Management System ensuring the highest standards of manufacturing.'),
    ('ISO 14001:2015', 'Environmental Management System for sustainable and eco-friendly operations.'),
    ('ISO 45001:2018', 'Occupational Health & Safety management protecting our workforce.'),
    ('FSC® Certified', 'Sustainable Forestry Practices ensuring responsible sourcing of materials.'),
    ('Dubai Civil Defence', 'Approved Contractor for executing fire-safe structural and joinery works.'),
]

TEAM_PHOTOS = [
    'img/team-1.png', 'img/team-2.png', 'img/team-3.png', 'img/team-4.jpg',
    'img/team-5.jpg', 'img/team-6.jpg', 'img/team-7.jpg',
]

SIDEBAR_CHILDREN = [
    ('Clients', 'clients_list'),
    ('Certifications', 'certifications_list'),
    ('Team Photos', 'team_photos_list'),
]


def _attach(instance, field_name, rel_path, upload_to):
    """Point a file field at the seed image. Returns False if it can't be found."""
    name = os.path.basename(rel_path)
    in_media = os.path.join(settings.MEDIA_ROOT, upload_to, name)
    if os.path.exists(in_media):
        getattr(instance, field_name).name = f'{upload_to}/{name}'
        return True
    src = os.path.join(STATIC_IMG, rel_path)
    if not os.path.exists(src):
        return False
    with open(src, 'rb') as fh:
        getattr(instance, field_name).save(name, File(fh), save=False)
    return True


def seed(apps, schema_editor):
    Client = apps.get_model('dashboard', 'Client')
    Certification = apps.get_model('dashboard', 'Certification')
    TeamPhoto = apps.get_model('dashboard', 'TeamPhoto')
    Module = apps.get_model('dashboard', 'Module')
    Child = apps.get_model('dashboard', 'Child')
    Permission = apps.get_model('dashboard', 'Permission')
    UserGroup = apps.get_model('dashboard', 'UserGroup')

    if not Client.objects.exists():
        for i, (name, logo, industry, message) in enumerate(CLIENTS, start=1):
            obj = Client(name=name, industry=industry, message=message, order=i)
            if _attach(obj, 'logo', logo, 'clients'):
                obj.save()

    if not Certification.objects.exists():
        for i, (name, desc) in enumerate(CERTIFICATIONS, start=1):
            Certification.objects.create(name=name, description=desc, order=i)

    if not TeamPhoto.objects.exists():
        for i, path in enumerate(TEAM_PHOTOS, start=1):
            obj = TeamPhoto(order=i)
            if _attach(obj, 'image', path, 'team'):
                obj.save()

    # Sidebar: put the new screens under the "Data" module
    data = Module.objects.filter(name__iexact='Data').first()
    if data is None:
        last = Module.objects.order_by('-priority').first()
        data = Module.objects.create(
            name='Data', icon_class='bi bi-database',
            priority=(last.priority + 1) if last else 0)
        for group in UserGroup.objects.all():
            Permission.objects.get_or_create(usergroup=group, module=data, defaults={'enabled': True})
    for name, url_name in SIDEBAR_CHILDREN:
        Child.objects.get_or_create(module=data, url_name=url_name, defaults={'name': name})


def unseed(apps, schema_editor):
    Child = apps.get_model('dashboard', 'Child')
    Child.objects.filter(url_name__in=[u for _, u in SIDEBAR_CHILDREN]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0021_client_certification_teamphoto'),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
