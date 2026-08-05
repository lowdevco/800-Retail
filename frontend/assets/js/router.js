/**
 * 800 RETAIL SOLUTIONS (AL AMEEN GROUP)
 * Client-Side Router / Navigation Helper (assets/js/router.js)
 */

export class RetailRouter {
  constructor() {
    this.currentPath = window.location.pathname;
    this.initTransitionHandlers();
  }

  /**
   * Performs smooth fade page transitions when navigating internal links
   */
  initTransitionHandlers() {
    document.addEventListener("click", (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      
      // Only handle internal HTML page links, bypass external/hash elements
      if (href && href.endsWith(".html") && !href.startsWith("http") && !href.startsWith("mailto") && !href.startsWith("tel")) {
        e.preventDefault();
        
        // Add a smooth page exit animation
        document.body.style.transition = "opacity 0.2s ease";
        document.body.style.opacity = "0";
        
        setTimeout(() => {
          window.location.href = href;
        }, 200);
      }
    });

    // Handle initial entry page fade-in
    document.addEventListener("DOMContentLoaded", () => {
      document.body.style.opacity = "0";
      setTimeout(() => {
        document.body.style.transition = "opacity 0.3s ease";
        document.body.style.opacity = "1";
      }, 50);
    });
  }

  /**
   * Utility to parse search parameters from URLs
   */
  static getQueryParam(key) {
    const params = new URLSearchParams(window.location.search);
    return params.get(key);
  }
}

// Instantiate transition helper globally if loaded as script
new RetailRouter();
