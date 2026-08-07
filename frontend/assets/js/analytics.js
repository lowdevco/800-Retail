/**
 * Vercel Web Analytics Integration
 * This file initializes Vercel Analytics for the static site
 * 
 * According to Vercel documentation for vanilla/static sites:
 * https://vercel.com/docs/analytics/quickstart
 */

(function() {
  // Initialize the analytics queue
  window.va = window.va || function () { 
    (window.vaq = window.vaq || []).push(arguments); 
  };
  
  // Load the analytics script
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/insights/script.js';
  document.head.appendChild(script);
})();
