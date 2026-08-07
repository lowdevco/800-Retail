document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initHeaderScrollEffect();
  initScrollProgress();
  initStatsCounter();
  initMarquee();
  initScrollAnimations();
});

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
    if (backdrop) backdrop.classList.remove("hidden");
    setTimeout(() => {
      drawer.classList.remove("translate-x-full");
    }, 10);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer.classList.add("translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
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
  const logo1 = document.getElementById("logo-change-1");
  const logo2 = document.getElementById("logo-change-2");
  const texts = document.getElementsByName("text-change");
  if (!header) return;

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 150) {
          header.classList.remove("h-20");
          header.classList.add("bg-white/95", "shadow-md");


          logo1.classList.remove("hidden");
          logo2.classList.add("hidden");

          texts.forEach(el => {
                    el.classList.remove("text-white");
                    el.classList.add("text-zinc-600");
                });

        } else {
          header.classList.add("h-20");
          header.classList.remove("bg-white/95", "shadow-md");
          
          // logo swap

          logo1.classList.add("hidden");
          logo2.classList.remove("hidden");

          texts.forEach(el => {
                    el.classList.add("text-white");
                    el.classList.remove("text-zinc-600");
                });

        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Animated counting with ease-out curve (decelerating).
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
 */
function initScrollAnimations() {
  const allSections = document.querySelectorAll("section");
  allSections.forEach((section, i) => {
    if (i === 0 || section.classList.contains("h-screen") || section.classList.contains("min-h-screen")) return;

    const headingArea = section.querySelector(".text-center.max-w-3xl, .text-center.max-w-4xl");
    if (headingArea && !headingArea.classList.contains("scroll-reveal")) {
      headingArea.classList.add("scroll-reveal");
    }

    const grids = section.querySelectorAll(".grid");
    grids.forEach(grid => {
      if (grid.children.length >= 2 && grid.children.length <= 8) {
        if (!grid.classList.contains("scroll-reveal-stagger")) {
          grid.classList.add("scroll-reveal-stagger");
        }
      }
    });

    const images = section.querySelectorAll("img");
    images.forEach(img => {
      const parent = img.parentElement;
      if (parent && parent.classList.contains("relative") && !parent.classList.contains("scroll-reveal-scale")) {
        parent.classList.add("scroll-reveal-scale");
      }
    });

    const splitText = section.querySelectorAll(".lg\\:col-span-6.space-y-8");
    splitText.forEach(block => {
      if (!block.classList.contains("scroll-reveal")) {
        block.classList.add("scroll-reveal");
      }
    });
  });

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