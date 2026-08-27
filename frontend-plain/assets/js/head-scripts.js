// Inject common tags
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
    <link rel="shortcut icon" href="https://800retail.com/wp-content/themes/800retailsolutions/assets/images/800.ico" type="image/x-icon">
`,
);

// Webflow feature detection
!(function (o, c) {
  var n = c.documentElement,
    t = " w-mod-";
  ((n.className += t + "js"),
    ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) &&
      (n.className += t + "touch"));
})(window, document);

// Load WebFontLoader
var wfScript = document.createElement("script");
wfScript.src =
  "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
wfScript.type = "text/javascript";
wfScript.onload = function () {
  WebFont.load({
    google: {
      families: [
        "DM Sans:300,400,500,600,700",
        "Inter:300,400,500,600,700",
        "Roboto Mono:300,400,500,600,700",
      ],
    },
  });
};
document.head.appendChild(wfScript);
