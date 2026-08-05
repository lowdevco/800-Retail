/**
 * 800 RETAIL (AL AMEEN GROUP)
 * Shared Application Controller (assets/js/main.js)
 */

import { RetailRouter } from './router.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Resolve relative pathing for shared component navigation
  const isSubPage = window.location.pathname.includes('/pages/');
  const pathPrefix = isSubPage ? '../' : './';
  const pagePrefix = isSubPage ? './' : 'pages/';

  // 2. Inject Shared Header Navbar
  injectHeader(pathPrefix, pagePrefix);

  // 3. Inject Shared Footer
  injectFooter(pathPrefix, pagePrefix);

  // 4. Initialize Core Micro-interactions
  initMobileMenu();
  initHeaderScrollEffect();
  initScrollProgress();
  initStatsCounter();
  initMarquee();
  initScrollAnimations();
});

/**
 * Dynamically injects the premium header menu with dropdowns.
 */
function injectHeader(pathPrefix, pagePrefix) {
  const headerPlaceholder = document.getElementById("navbar-placeholder");
  if (!headerPlaceholder) return;

  const currentPath = window.location.pathname;
  const activeClass = "text-red-700 font-bold border-b-2 border-red-700 pb-1";
  const inactiveClass = "text-zinc-600 hover:text-red-600 transition-colors duration-200 pb-1";

  // Check section active states for optimized dropdown parent highlighting
  const isCompanyActive = currentPath.includes('about.html') || currentPath.includes('ceo-message.html') || currentPath.includes('global-facilities.html');
  const isCapabilitiesActive = currentPath.includes('divisions.html') || currentPath.includes('products.html');
  const isPortfolioActive = currentPath.includes('projects.html') || currentPath.includes('clientele.html');

  headerPlaceholder.innerHTML = `
    <header class="fixed top-0 left-0 w-full z-50 transition-all duration-300 glass-panel shadow-sm" id="main-header">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo (Clean Typography) -->
          <a href="${pathPrefix}index.html" class="flex flex-col justify-center select-none">
            <span class="text-2xl font-black tracking-tight text-zinc-950 font-display">800 RETAIL</span>
            <span class="text-[9px] uppercase tracking-widest text-zinc-500 font-semibold">Al Ameen Group</span>
          </a>

          <!-- Desktop Navigation Items (Optimized with Dropdowns) -->
          <nav class="hidden lg:flex space-x-8 text-sm font-medium items-center">
            <a href="${pathPrefix}index.html" class="${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? activeClass : inactiveClass}">Home</a>
            
            <!-- Dropdown: Company -->
            <div class="relative group flex items-center h-20">
              <button class="inline-flex items-center space-x-1 ${isCompanyActive ? 'text-red-700 font-bold' : 'text-zinc-600 hover:text-red-600'} transition-colors duration-200">
                <span>Company</span>
                <i class="fas fa-chevron-down text-[9px] transition-transform duration-200 group-hover:rotate-180"></i>
              </button>
              <div class="absolute top-[80px] left-0 mt-0 w-48 bg-white border border-zinc-100 rounded shadow-lg py-2 hidden group-hover:block transition-all duration-300">
                <a href="${pagePrefix}about.html" class="block px-4 py-2.5 text-xs text-zinc-650 hover:bg-zinc-50 hover:text-red-600 ${currentPath.includes('about.html') ? 'text-red-700 font-bold' : ''}">About Us</a>
                <a href="${pagePrefix}ceo-message.html" class="block px-4 py-2.5 text-xs text-zinc-650 hover:bg-zinc-50 hover:text-red-600 ${currentPath.includes('ceo-message.html') ? 'text-red-700 font-bold' : ''}">CEO Message</a>
                <a href="${pagePrefix}global-facilities.html" class="block px-4 py-2.5 text-xs text-zinc-650 hover:bg-zinc-50 hover:text-red-600 ${currentPath.includes('global-facilities.html') ? 'text-red-700 font-bold' : ''}">Global Facilities</a>
              </div>
            </div>

            <!-- Dropdown: Capabilities -->
            <div class="relative group flex items-center h-20">
              <button class="inline-flex items-center space-x-1 ${isCapabilitiesActive ? 'text-red-700 font-bold' : 'text-zinc-600 hover:text-red-600'} transition-colors duration-200">
                <span>Capabilities</span>
                <i class="fas fa-chevron-down text-[9px] transition-transform duration-200 group-hover:rotate-180"></i>
              </button>
              <div class="absolute top-[80px] left-0 mt-0 w-48 bg-white border border-zinc-100 rounded shadow-lg py-2 hidden group-hover:block transition-all duration-300">
                <a href="${pagePrefix}divisions.html" class="block px-4 py-2.5 text-xs text-zinc-650 hover:bg-zinc-50 hover:text-red-600 ${currentPath.includes('divisions.html') ? 'text-red-700 font-bold' : ''}">Production Divisions</a>
                <a href="${pagePrefix}products.html" class="block px-4 py-2.5 text-xs text-zinc-650 hover:bg-zinc-50 hover:text-red-600 ${currentPath.includes('products.html') ? 'text-red-700 font-bold' : ''}">Products Catalog</a>
              </div>
            </div>

            <!-- Dropdown: Portfolio -->
            <div class="relative group flex items-center h-20">
              <button class="inline-flex items-center space-x-1 ${isPortfolioActive ? 'text-red-700 font-bold' : 'text-zinc-600 hover:text-red-600'} transition-colors duration-200">
                <span>Portfolio</span>
                <i class="fas fa-chevron-down text-[9px] transition-transform duration-200 group-hover:rotate-180"></i>
              </button>
              <div class="absolute top-[80px] left-0 mt-0 w-48 bg-white border border-zinc-100 rounded shadow-lg py-2 hidden group-hover:block transition-all duration-300">
                <a href="${pagePrefix}projects.html" class="block px-4 py-2.5 text-xs text-zinc-650 hover:bg-zinc-50 hover:text-red-600 ${currentPath.includes('projects.html') ? 'text-red-700 font-bold' : ''}">Projects Reference</a>
                <a href="${pagePrefix}clientele.html" class="block px-4 py-2.5 text-xs text-zinc-650 hover:bg-zinc-50 hover:text-red-600 ${currentPath.includes('clientele.html') ? 'text-red-700 font-bold' : ''}">Our Clients</a>
              </div>
            </div>

            <a href="${pagePrefix}news.html" class="${currentPath.includes('news.html') ? activeClass : inactiveClass}">News</a>
            <a href="${pagePrefix}contact.html" class="${currentPath.includes('contact.html') ? activeClass : inactiveClass}">Contact</a>
          </nav>

          <!-- B2B Quote Action Button -->
          <div class="hidden lg:flex">
            <a href="${pagePrefix}contact.html?type=quote" class="px-5 py-2.5 bg-zinc-950 hover:bg-red-700 text-white rounded text-sm font-semibold transition-all duration-350 btn-red-glow flex items-center space-x-2">
              <i class="fas fa-file-invoice-dollar text-xs"></i>
              <span>Request Quote</span>
            </a>
          </div>

          <!-- Mobile Toggle Button -->
          <div class="lg:hidden flex items-center">
            <button id="mobile-menu-toggle" class="text-zinc-800 hover:text-red-700 focus:outline-none p-2" aria-label="Toggle Menu">
              <i class="fas fa-bars text-2xl"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Navigation Drawer Overlay -->
      <div id="mobile-menu-drawer" class="hidden fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between border-l border-zinc-200 transition-transform duration-300 translate-x-full">
        <div>
          <!-- Close and Logo Row -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex flex-col">
              <span class="text-xl font-black text-zinc-950 font-display">800 RETAIL</span>
              <span class="text-[8px] tracking-widest text-zinc-400 font-semibold">Al Ameen Group</span>
            </div>
            <button id="mobile-menu-close" class="text-zinc-500 hover:text-red-600 focus:outline-none p-1">
              <i class="fas fa-times text-2xl"></i>
            </button>
          </div>

          <!-- Drawer Links -->
          <nav class="flex flex-col space-y-4 text-base font-semibold">
            <a href="${pathPrefix}index.html" class="py-2 border-b border-zinc-100 ${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">Home</a>
            <a href="${pagePrefix}about.html" class="py-2 border-b border-zinc-100 ${currentPath.includes('about.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">About Us</a>
            <a href="${pagePrefix}ceo-message.html" class="py-2 border-b border-zinc-100 ${currentPath.includes('ceo-message.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">CEO Message</a>
            <a href="${pagePrefix}global-facilities.html" class="py-2 border-b border-zinc-100 ${currentPath.includes('global-facilities.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">Global Facilities</a>
            <a href="${pagePrefix}divisions.html" class="py-2 border-b border-zinc-100 ${currentPath.includes('divisions.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">Divisions</a>
            <a href="${pagePrefix}products.html" class="py-2 border-b border-zinc-100 ${currentPath.includes('products.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">Products & Solutions</a>
            <a href="${pagePrefix}projects.html" class="py-2 border-b border-zinc-100 ${currentPath.includes('projects.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">Projects Portfolio</a>
            <a href="${pagePrefix}clientele.html" class="py-2 border-b border-zinc-100 ${currentPath.includes('clientele.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">Our Clients</a>
            <a href="${pagePrefix}news.html" class="py-2 border-b border-zinc-100 ${currentPath.includes('news.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">News & R&D</a>
            <a href="${pagePrefix}contact.html" class="py-2 ${currentPath.includes('contact.html') ? 'text-red-700' : 'text-zinc-700 hover:text-red-600'}">Contact</a>
          </nav>
        </div>

        <div class="mt-8">
          <a href="${pagePrefix}contact.html?type=quote" class="w-full text-center block px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded font-bold transition duration-200">
            Request B2B Quote
          </a>
        </div>
      </div>
      
      <!-- Backdrop overlay for mobile drawer -->
      <div id="drawer-backdrop" class="hidden fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-40"></div>
    </header>
  `;
}

/**
 * Dynamically injects the enterprise footer.
 */
function injectFooter(pathPrefix, pagePrefix) {
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (!footerPlaceholder) return;

  footerPlaceholder.innerHTML = `
    <footer class="bg-zinc-950 border-t border-zinc-900 text-zinc-400 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        <!-- Corporate Info -->
        <div class="space-y-4">
          <div class="flex flex-col">
            <span class="text-xl font-black text-white font-display">800 RETAIL</span>
            <span class="text-[8px] uppercase tracking-widest text-zinc-500 font-semibold">Al Ameen Group</span>
          </div>
          <p class="text-xs leading-relaxed text-zinc-400">
            Establishing standards in commercial interior fitouts and high-volume fixture manufacturing since 2004. Serving global retail brands with certified in-house capabilities.
          </p>
          <div class="flex space-x-4 pt-2">
            <a href="#" class="text-zinc-400 hover:text-red-500 transition-colors"><i class="fab fa-linkedin-in text-base"></i></a>
            <a href="#" class="text-zinc-400 hover:text-red-500 transition-colors"><i class="fab fa-instagram text-base"></i></a>
            <a href="#" class="text-zinc-400 hover:text-red-500 transition-colors"><i class="fab fa-facebook-f text-base"></i></a>
            <a href="#" class="text-zinc-400 hover:text-red-500 transition-colors"><i class="fab fa-youtube text-base"></i></a>
          </div>
        </div>

        <!-- Key Operations -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold text-white uppercase tracking-wider font-display">Core Divisions</h3>
          <ul class="space-y-2.5 text-xs">
            <li><a href="${pagePrefix}divisions.html#joinery" class="hover:text-red-500 transition-colors">Joinery & Carpenter Works</a></li>
            <li><a href="${pagePrefix}divisions.html#metalwork" class="hover:text-red-500 transition-colors">Metal Fabrication</a></li>
            <li><a href="${pagePrefix}divisions.html#led" class="hover:text-red-500 transition-colors">LED Screens & Displays</a></li>
            <li><a href="${pagePrefix}divisions.html#fitout" class="hover:text-red-500 transition-colors">Turnkey Interior Fitout</a></li>
            <li><a href="${pagePrefix}divisions.html#lighting" class="hover:text-red-500 transition-colors">Architectural Lighting</a></li>
          </ul>
        </div>

        <!-- Quick Links -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold text-white uppercase tracking-wider font-display">Company Links</h3>
          <ul class="space-y-2.5 text-xs">
            <li><a href="${pagePrefix}about.html" class="hover:text-red-500 transition-colors">Corporate Timeline</a></li>
            <li><a href="${pagePrefix}global-facilities.html" class="hover:text-red-500 transition-colors">Global Production Facilities</a></li>
            <li><a href="${pagePrefix}products.html" class="hover:text-red-500 transition-colors">Solutions Catalog</a></li>
            <li><a href="${pagePrefix}projects.html" class="hover:text-red-500 transition-colors">Projects Reference</a></li>
            <li><a href="${pagePrefix}news.html" class="hover:text-red-500 transition-colors">Corporate News & R&D</a></li>
          </ul>
        </div>

        <!-- Contact details -->
        <div class="space-y-4">
          <h3 class="text-xs font-bold text-white uppercase tracking-wider font-display">Global Headquarters</h3>
          <p class="text-xs"><i class="fas fa-map-marker-alt text-red-650 mr-2"></i> Umm Al Quwain, United Arab Emirates</p>
          <p class="text-xs"><i class="fas fa-phone-alt text-red-650 mr-2"></i> +971 (6) 766-8800</p>
          <p class="text-xs"><i class="fas fa-envelope text-red-650 mr-2"></i> projects@800retail.com</p>
          <p class="text-xs border-t border-zinc-800 pt-3 mt-3 text-zinc-500">
            Certified ISO 9001:2015 Facility. <br>
            "Made in UAE" Certified Manufacturer.
          </p>
        </div>

      </div>

      <!-- Copyright Bottom Bar -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-500">
        <p>&copy; 2026 800 Retail (Al Ameen Group). All rights reserved.</p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="hover:text-red-500">Privacy Policy</a>
          <a href="#" class="hover:text-red-500">Terms of Service</a>
          <a href="#" class="hover:text-red-500">Sitemap</a>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Setup mobile drawer events.
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mobile-menu-close");
  const drawer = document.getElementById("mobile-menu-drawer");
  const backdrop = document.getElementById("drawer-backdrop");

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.remove("hidden");
    backdrop.classList.remove("hidden");
    setTimeout(() => {
      drawer.classList.remove("translate-x-full");
    }, 10);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.add("translate-x-full");
    backdrop.classList.add("hidden");
    setTimeout(() => {
      drawer.classList.add("hidden");
    }, 300);
    document.body.style.overflow = "";
  };

  toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
}

/**
 * Header scroll effect with smooth transition.
 */
function initHeaderScrollEffect() {
  const header = document.getElementById("main-header");
  if (!header) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          header.classList.remove("h-20");
          header.classList.add("bg-white/95", "shadow-md");
        } else {
          header.classList.add("h-20");
          header.classList.remove("bg-white/95", "shadow-md");
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Animated counting with ease-out curve (decelerating).
 * Numbers speed up at start and slow down near target — feels organic.
 */
function initStatsCounter() {
  const counters = document.querySelectorAll(".stat-counter");
  if (counters.length === 0) return;

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetNumber = parseInt(el.getAttribute("data-target"), 10);
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 2200;
        let startTime = null;

        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeOutQuart(progress);
          const currentNum = Math.floor(easedProgress * targetNumber);

          el.textContent = prefix + currentNum.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = prefix + targetNumber.toLocaleString() + suffix;
          }
        };

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Marquee duplicator for infinite scroll.
 */
function initMarquee() {
  const marquee = document.querySelector(".marquee-content");
  if (!marquee) return;
  const content = marquee.innerHTML;
  marquee.innerHTML = content + content;
}

/**
 * Scroll Progress Bar — red gradient line at very top of viewport.
 */
function initScrollProgress() {
  // Create the progress bar element
  const bar = document.createElement("div");
  bar.id = "scroll-progress";
  document.body.prepend(bar);

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = scrollPercent + "%";
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Auto-detects and animates elements on scroll.
 * This is the "soul" — without this, the page loads completely static.
 *
 * Strategy:
 * 1. Every <section> gets scroll-reveal (fade up on enter).
 * 2. Grid children of sections get staggered reveals.
 * 3. Images get scale-up reveals.
 * 4. The hero section is excluded (it's already visible).
 */
function initScrollAnimations() {
  // --- Auto-tag sections for reveal ---
  const allSections = document.querySelectorAll("section");
  allSections.forEach((section, i) => {
    // Skip the hero (first section or sections with h-screen)
    if (i === 0 || section.classList.contains("h-screen")) return;

    // Tag the section heading area
    const headingArea = section.querySelector(".text-center.max-w-3xl, .text-center.max-w-4xl");
    if (headingArea && !headingArea.classList.contains("scroll-reveal")) {
      headingArea.classList.add("scroll-reveal");
    }

    // Tag grid containers for staggered children
    const grids = section.querySelectorAll(".grid");
    grids.forEach(grid => {
      // Only tag grids that have card-like children
      if (grid.children.length >= 2 && grid.children.length <= 8) {
        if (!grid.classList.contains("scroll-reveal-stagger")) {
          grid.classList.add("scroll-reveal-stagger");
        }
      }
    });

    // Tag split-layout image containers
    const images = section.querySelectorAll("img");
    images.forEach(img => {
      const parent = img.parentElement;
      if (parent && parent.classList.contains("relative") && !parent.classList.contains("scroll-reveal-scale")) {
        parent.classList.add("scroll-reveal-scale");
      }
    });

    // Tag text blocks in split layouts (left/right)
    const splitText = section.querySelectorAll(".lg\\:col-span-6.space-y-8");
    splitText.forEach(block => {
      if (!block.classList.contains("scroll-reveal")) {
        block.classList.add("scroll-reveal");
      }
    });
  });

  // --- Also tag standalone elements with scroll-reveal ---
  document.querySelectorAll(".card-industrial").forEach(card => {
    // Cards already handled by stagger, but ensure they have base styles
  });

  // --- Create a single IntersectionObserver for all reveal types ---
  const revealClasses = [
    "scroll-reveal",
    "scroll-reveal-stagger",
    "scroll-reveal-left",
    "scroll-reveal-right",
    "scroll-reveal-scale"
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

  revealClasses.forEach(cls => {
    document.querySelectorAll("." + cls).forEach(el => {
      observer.observe(el);
    });
  });
}

