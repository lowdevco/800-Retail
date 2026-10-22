"""Create 10 demo blog posts written from the website's own content.

    python manage.py seed_demo_blogs            # create (skips posts that already exist)
    python manage.py seed_demo_blogs --delete   # remove the demo posts again

Posts are matched by slug, so running it twice never duplicates anything.
Featured images are copied from static/ into media/blog/.
"""
import os
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import User
from django.core.files import File
from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.dashboard.models import Blog, Category

IMG = os.path.join(settings.BASE_DIR, 'static', 'website', 'assets', 'images', 'img')

POSTS = [
    {
        'slug': 'inside-a-12-department-retail-fixture-factory',
        'title': 'Inside a 12-Department Retail Fixture Factory',
        'category': 'Retail Fixtures',
        'image': 'fixture_manufacturing_1787649246147.jpg',
        'tags': 'Retail Fixtures, Manufacturing, Store Fixtures',
        'short': 'From design and robotic metal fabrication to QC, packing and after-service, here is how twelve specialised departments turn a store concept into finished fixtures.',
        'body': '''
<p>Every fixture that leaves our facility passes through a chain of specialised teams. Keeping each step in-house is what lets us control quality, speed and cost on projects of any size.</p>
<h2>Design &amp; Development</h2>
<p>It starts with concept development, engineering detailing and prototyping of metal and joinery solutions. Design meets function before a single sheet of metal is cut.</p>
<h2>Machining and metal fabrication</h2>
<p>Our machine department cuts, shapes and refines materials with precision, while the robotic and manual fabrication lines handle cutting, welding, bending and forming of metal structures.</p>
<h2>Finishing</h2>
<ul>
<li><strong>Powder coating &amp; surface protection</strong> for durability and corrosion resistance.</li>
<li><strong>Joinery &amp; carpentry</strong> for modular components in solid wood and engineered boards.</li>
<li><strong>Painting</strong> for a flawless, protective final coat.</li>
</ul>
<h2>Quality, dispatch and installation</h2>
<p>Our QC department inspects every detail before anything is packed. Packing &amp; Dispatch makes sure orders arrive exactly as expected, and the Installation team completes the job on-site. After Service keeps everything running long after opening day.</p>
''',
    },
    {
        'slug': 'from-concept-to-complete-retail-space',
        'title': 'From Concept to Complete Retail Space: Our End-to-End Process',
        'category': 'Retail Fitout',
        'image': 'retail_fitout_1787649185482.jpg',
        'tags': 'Retail Fit-Out, Turnkey, Store Design',
        'short': 'Why brands choose a single partner to design, engineer, manufacture and install their stores, and what that means for timelines and quality.',
        'body': '''
<p>From the first spark of concept design to the final on-site installation, 800 Retail delivers complete retail environments for global and regional brands, all crafted in-house.</p>
<h2>One partner, one standard</h2>
<p>When engineering, fabrication and installation sit under one roof, there are no hand-offs between suppliers and no gaps in accountability. The result is a store that matches the approved design down to the last detail.</p>
<h2>How a project flows</h2>
<ol>
<li><strong>Design:</strong> concept, space planning and engineering detail.</li>
<li><strong>Engineer:</strong> prototypes, materials and lighting integration.</li>
<li><strong>Manufacture:</strong> fixtures, joinery, LED and lighting produced in our own facilities.</li>
<li><strong>Deliver:</strong> packing, logistics and complete on-site installation.</li>
</ol>
<p>It is the reason we describe ourselves as a true one-stop retail solution partner.</p>
''',
    },
    {
        'slug': 'how-led-screens-are-changing-the-storefront',
        'title': 'How LED Screens Are Changing the Storefront',
        'category': 'Retail LED',
        'image': 'led_display_1787649220452.jpg',
        'tags': 'Retail LED, Digital Signage, Video Walls',
        'short': 'Curved, transparent, cylindrical and 3D. A look at the LED display formats that help retail brands stand out, indoors and out.',
        'body': '''
<p>Digital displays have moved from a nice extra to a core part of the store experience. Our LED division designs, manufactures and installs systems built for retail.</p>
<h2>Formats that make an impact</h2>
<ul>
<li><strong>Semi-circular exterior screens:</strong> curved displays that add a bold, modern touch outdoors.</li>
<li><strong>Interconnecting wall screens:</strong> seamless video walls for stores, halls and event venues.</li>
<li><strong>Multi-storey cylindrical screens:</strong> eye-catching columns that bring creativity to atriums.</li>
<li><strong>Transparent screens:</strong> keep the storefront visible while showing content, ideal for malls and markets.</li>
<li><strong>3D screens:</strong> bring a brand to life with depth that stops passers-by.</li>
</ul>
<h2>More than hardware</h2>
<p>Every installation includes system design and engineering, control software, content creation, commissioning and ongoing maintenance, so screens keep performing long after launch.</p>
''',
    },
    {
        'slug': 'dtrack-a-faster-smarter-retail-ceiling',
        'title': "D'Track: A Faster, Smarter Retail Ceiling",
        'category': 'Retail Lighting',
        'image': 'retail_lighting.png',
        'tags': "D'Track, Retail Lighting, Ceilings",
        'short': "D'Track combines ceiling, power track, lighting and hanging systems in one profile, cutting install time to days and costs by up to 60%.",
        'body': '''
<p>Born in the UAE in 2025, D'Track is our answer to the many ceiling challenges retail projects face, whether that means replacing gypsum ceilings, upgrading power tracks or installing hanging systems.</p>
<h2>Key benefits</h2>
<ul>
<li><strong>Fast installation:</strong> a 20,000 sq. ft. store can be completed in just 3 days.</li>
<li><strong>Cost saving:</strong> 50-60% lower cost than conventional ceiling and lighting systems.</li>
<li><strong>Integrated power track:</strong> no separate track needed; power runs inside D'Track.</li>
<li><strong>Stretch and closed ceilings:</strong> fire-rated fabric and integrated stretch profiles without extra framing.</li>
<li><strong>Plug-and-play:</strong> EU-standard speakers and 4-line track lighting from international brands.</li>
</ul>
<h2>A complete ecosystem</h2>
<p>Main rails, linear, L, T and cross joints, end caps and suspension wires let designers create anything from simple runs to intricate track layouts, with 35W and 40W track lights and visual poster projectors to finish the space.</p>
''',
    },
    {
        'slug': 'why-made-in-uae-matters-for-retail-brands',
        'title': 'Why "Made in UAE" Matters for Retail Brands',
        'category': 'Company News',
        'image': 'made_in_uae_manufacturing_1787649598532.jpg',
        'tags': 'Made in UAE, Manufacturing, Al Ameen Group',
        'short': 'Proudly carrying the national "Made in UAE" mark, our locally manufactured solutions give brands shorter lead times and a quality they can trust.',
        'body': '''
<p>Al Ameen Group, the largest fixture manufacturing company in the Middle East, proudly represents home-grown brands with the "Made in UAE" national mark, a symbol of trust for locally manufactured solutions.</p>
<h2>What local manufacturing means for you</h2>
<ul>
<li><strong>Shorter lead times:</strong> production close to your stores across the GCC.</li>
<li><strong>Direct quality control:</strong> every stage happens in our own facilities.</li>
<li><strong>Flexibility:</strong> changes and roll-outs handled without long supply chains.</li>
</ul>
<p>With over 350,000 sq. ft. of facilities across the UAE and Saudi Arabia, we have the capacity to support everything from a single flagship to a regional roll-out.</p>
''',
    },
    {
        'slug': 'the-5s-system-behind-our-quality',
        'title': 'The 5S System Behind Our Quality',
        'category': 'Company News',
        'image': 'dept_fabrication.png',
        'tags': '5S, Lean Manufacturing, Quality',
        'short': 'Sort, Set in order, Shine, Standardise, Sustain. How lean workplace organisation keeps every division safe, efficient and consistent.',
        'body': '''
<p>We apply the 5S system across all divisions to promote operational excellence, safety and workplace efficiency. Rooted in lean manufacturing, 5S improves productivity by systematically organising the workplace.</p>
<h2>The five steps</h2>
<ol>
<li><strong>Sort:</strong> remove what is not needed.</li>
<li><strong>Set in order:</strong> a place for everything, and everything in its place.</li>
<li><strong>Shine:</strong> clean workplaces reveal problems early.</li>
<li><strong>Standardise:</strong> make the best way the normal way.</li>
<li><strong>Sustain:</strong> build the habit so improvements last.</li>
</ol>
<p>This disciplined approach improves day-to-day performance and builds a culture of continuous improvement, which shows up directly in the quality of what we deliver.</p>
''',
    },
    {
        'slug': 'al-ameen-group-expands-to-india',
        'title': 'Al Ameen Group Expands to India',
        'category': 'Company News',
        'image': 'retail_fixtures.png',
        'tags': 'India, Expansion, Gurgaon',
        'short': 'A new division in Gurgaon strengthens our manufacturing capabilities and brings our retail solutions expertise to the Indian market.',
        'body': '''
<p>Al Ameen Group proudly announces its new division in Gurgaon, India, marking another milestone in our global expansion.</p>
<h2>Why India</h2>
<p>India is one of the world's fastest-growing retail markets. This strategic addition strengthens our manufacturing capabilities and extends our retail solutions expertise to brands opening and upgrading stores across the country.</p>
<h2>A growing global presence</h2>
<p>India joins our hubs in the United Arab Emirates, Saudi Arabia and our sourcing hub in China, a network built to serve brands wherever they grow.</p>
''',
    },
    {
        'slug': 'certified-to-international-standards',
        'title': 'Certified to International Standards',
        'category': 'Company News',
        'image': 'dept_design.png',
        'tags': 'ISO 9001, ISO 14001, ISO 45001, FSC',
        'short': 'ISO 9001, ISO 14001, ISO 45001, FSC and Dubai Civil Defence approval: what each certification means for the projects we deliver.',
        'body': '''
<p>We are committed to international standards of quality, sustainability and excellence. Here is what our certifications mean in practice.</p>
<ul>
<li><strong>ISO 9001:2015</strong> - a quality management system ensuring the highest manufacturing standards.</li>
<li><strong>ISO 14001:2015</strong> - environmental management for sustainable, eco-friendly operations.</li>
<li><strong>ISO 45001:2018</strong> - occupational health &amp; safety management that protects our workforce.</li>
<li><strong>FSC&reg; Certified</strong> - responsible sourcing of wood through sustainable forestry practices.</li>
<li><strong>Dubai Civil Defence</strong> - approved contractor for fire-safe structural and joinery works.</li>
</ul>
<p>For our clients, these certifications mean predictable quality, safer sites and materials they can stand behind.</p>
''',
    },
    {
        'slug': 'designing-interactive-kiosks-for-retail',
        'title': 'Designing Interactive Kiosks for Retail',
        'category': 'Retail LED',
        'image': 'interactive_kiosk_1787649533408.jpg',
        'tags': 'Interactive Displays, Kiosks, Retail Technology',
        'short': 'Interactive transparent screens and kiosks turn browsing into engagement. Here is what to consider when adding them to a store.',
        'body': '''
<p>Interactive displays invite customers to explore products, check availability and discover stories behind a brand, all without waiting for a sales associate.</p>
<h2>What makes a kiosk work</h2>
<ul>
<li><strong>Placement:</strong> close to the products it supports, never blocking circulation.</li>
<li><strong>Integration:</strong> the screen, joinery and power designed together, not added later.</li>
<li><strong>Content:</strong> short, visual journeys that are easy to update remotely.</li>
<li><strong>Support:</strong> preventive maintenance so the experience never goes dark.</li>
</ul>
<p>Our LED and fixtures teams design the hardware and housing as one piece, and our content team builds the visuals that run on it.</p>
''',
    },
    {
        'slug': 'joinery-and-carpentry-precision-in-every-joint',
        'title': 'Joinery & Carpentry: Precision in Every Joint',
        'category': 'Retail Fixtures',
        'image': 'dept_joinery.png',
        'tags': 'Joinery, Carpentry, Custom Fit-Out',
        'short': 'Solid wood and engineered boards, crafted into modular retail components that look premium and stand up to daily store life.',
        'body': '''
<p>Wood brings warmth to retail spaces, but it has to survive heavy daily use. Our joinery &amp; carpentry department specialises in precision wood joinery and custom fit-outs using solid wood and engineered boards.</p>
<h2>Built to be modular</h2>
<p>We design components to be assembled, moved and reconfigured, so stores can refresh layouts without rebuilding from scratch.</p>
<h2>Finished to last</h2>
<p>Every piece passes through our painting and QC departments before dispatch, and our installation team fits it on-site exactly as designed.</p>
''',
    },
]


class Command(BaseCommand):
    help = 'Create (or with --delete remove) 10 demo blog posts based on the website content.'

    def add_arguments(self, parser):
        parser.add_argument('--delete', action='store_true', help='Remove the demo posts.')

    def handle(self, *args, **options):
        slugs = [p['slug'] for p in POSTS]
        if options['delete']:
            for blog in Blog.objects.filter(slug__in=slugs):
                blog.delete()  # also removes the image via the model's cleanup signal
            self.stdout.write(self.style.SUCCESS('Demo posts removed.'))
            return

        author = User.objects.filter(is_superuser=True).order_by('id').first() or User.objects.order_by('id').first()
        if author is None:
            self.stderr.write('No user found. Create an admin user first.')
            return

        created = 0
        now = timezone.now()
        for i, post in enumerate(POSTS):
            if Blog.objects.filter(slug=post['slug']).exists():
                continue
            src = os.path.join(IMG, post['image'])
            if not os.path.exists(src):
                self.stderr.write(f"Skipped '{post['title']}': image not found ({post['image']}).")
                continue
            category, _ = Category.objects.get_or_create(
                category_name=post['category'],
                defaults={'slug': post['category'].lower().replace(' ', '-').replace('&', 'and')},
            )
            blog = Blog(
                title=post['title'], slug=post['slug'], category=category, author=author,
                short_description=post['short'], meta_tags=post['tags'],
                blog_body=post['body'].strip(), status='Published',
            )
            with open(src, 'rb') as fh:
                blog.featured_image.save(post['image'], File(fh), save=False)
            blog.save()
            # spread publish dates so the listing looks natural (newest = first in list)
            Blog.objects.filter(pk=blog.pk).update(created_at=now - timedelta(days=4 * (len(POSTS) - i)))
            created += 1
        self.stdout.write(self.style.SUCCESS(f'Created {created} demo post(s).'))
