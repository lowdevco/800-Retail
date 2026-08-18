// Interactive Map and Form Script

document.addEventListener("DOMContentLoaded", () => {
  // 1. Store Data Definition
  const storeData = {
    uae: {
      geodata: am5geodata_uaeLow,
      zoomLevel: 1.5,
      zoomPoint: { longitude: 55.4, latitude: 25.1 },
      stores: [
        {
          id: "uae-1",
          title: "Al Ameen Industries LLC",
          desc: "New Industrial Area 87807 Umm Al Quwain, UAE",
          phone: "+971 4 266 0666",
          email: "ask@800retail.com",
          lat: 25.5647,
          long: 55.5552,
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4456.96234607936!2d55.71455977608346!3d25.561233216858483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef5e5302dd84bc5%3A0xd8012bb2003b321a!2sAl%20Ameen%20Industries%20llc%20middle%20east!5e1!3m2!1sen!2sjp!4v1786098555926!5m2!1sen!2sjp",
        },
        {
          id: "uae-2",
          title: "Al Ameen Trading LLC Deira",
          desc: "Near Abuhail Metro Station 92669, Dubai, UAE",
          phone: "+971 4 266 0666",
          email: "ask@800retail.com",
          lat: 25.276,
          long: 55.334,
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4448.181263449842!2d55.412297230517154!3d25.28725566843382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ef6713bbec4923b%3A0x6658ec1ffd29476!2sAl%20Ameen%20Trading!5e1!3m2!1sen!2sjp!4v1786098825059!5m2!1sen!2sjp",
        },
      ],
    },
    ksa: {
      geodata: am5geodata_saudiArabiaLow,
      zoomLevel: 1.2,
      zoomPoint: { longitude: 45.0, latitude: 24.0 },
      stores: [
        {
          id: "ksa-1",
          title: "Al Ameen Industrial Company",
          desc: "Al Fauzan industrial city Riyadh",
          phone: "+966 568 974 293",
          email: "ask@800retail.com",
          lat: 25.3136, // offset north
          long: 46.2753, // offset west
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115982.72120015507!2d46.7385806!3d24.6877309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d48939b%3A0x608c02f1a6ec711a!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sae!4v1700000000002",
        },
        {
          id: "ksa-2",
          title: "Al Ameen Industrial Company",
          desc: "Olaya street Riyadh",
          phone: "+966 568 974 293",
          email: "ask@800retail.com",
          lat: 24.1946, // offset south
          long: 47.1853, // offset east
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115982.72120015507!2d46.7385806!3d24.6877309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d48939b%3A0x608c02f1a6ec711a!2sOlaya%2C%20Riyadh!5e0!3m2!1sen!2sae!4v1700000000003",
        },
        {
          id: "ksa-3",
          title: "Al Ameen Industrial Company",
          desc: "Al Makarona street Jeddah",
          phone: "+966 568 974 293",
          email: "ask@800retail.com",
          lat: 21.4858,
          long: 39.1925,
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237684.582845689!2d39.0205842858888!3d21.45012224716186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118ab!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2sae!4v1700000000004",
        },
      ],
    },
    china: {
      geodata: am5geodata_chinaLow,
      zoomLevel: 1.2,
      zoomPoint: { longitude: 104.0, latitude: 35.0 },
      stores: [
        {
          id: "china-1",
          title: "Guangdong Sourcing Hub",
          desc: "Room 1F-103, Building 1, Runzhi Science Park, Taishan Road, Guicheng Street, Nanhai District, Foshan City, Guangdong Province, China",
          phone: "+86 138 0888 3853",
          email: "ask@800retail.com",
          lat: 23.0215,
          long: 113.1214,
          iframeSrc:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d72767.31136862183!2d113.03260551856475!3d22.994448585785936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34025bf66dc0a79f%3A0x5b8dd10132b4c4da!2sChancheng%20District%2C%20Foshan!5e1!3m2!1sen!2sae!4v1786087661978!5m2!1sen!2sae",
        },
      ],
    },
  };

  // 2. Setup Address Cards
  const addressListContainer = document.getElementById(
    "address-list-container",
  );

  function renderAddressCards(regionKey) {
    const stores = storeData[regionKey].stores;
    addressListContainer.innerHTML = "";

    stores.forEach((store) => {
      const card = document.createElement("div");
      card.className = "global_office_card";
      card.style.cursor = "pointer";
      card.style.display = "flex";
      card.style.flexDirection = "row";
      card.style.alignItems = "flex-start";
      card.style.gap = "1rem";
      card.style.marginBottom = "1rem";
      card.style.border = "1px solid rgba(255,255,255,0.15)";
      
      card.style.background = "transparent";
      card.style.padding = "1.5rem";
      card.style.transition = "all 0.3s ease";
      card.onmouseover = () => { card.style.borderColor = "rgba(255,255,255,0.5)"; card.style.background = "rgba(255,255,255,0.03)"; };
      card.onmouseout = () => { card.style.borderColor = "rgba(255,255,255,0.15)"; card.style.background = "transparent"; };
      
      card.innerHTML = `
        <div class="icon-wrap is-light" style="flex-shrink:0;">
          <img loading="lazy" src="../../assets/images/Building-office-4.svg" alt="" class="icon-height-medium" />
        </div>
        <div style="flex:1;">
          <div class="text-size-small text-weight-light text-color-primary" style="font-weight:600; color: #ffffff;">
            ${store.title}
          </div>
          <div class="spacer-tiny"></div>
          <div class="text-size-small text-weight-light text-style-muted60" style="color: #e4e4e7; font-size: 0.95rem; line-height: 1.5;">
            ${store.desc}
          </div>
          <div class="spacer-tiny"></div>
          <div class="text-size-small text-weight-light text-style-muted60" style="color: #e4e4e7; font-size: 0.95rem;">
            ${store.phone} <br/> ${store.email}
          </div>
        </div>
      `;
      // Clicking a card triggers the iframe view
      card.addEventListener("click", () => {
        showIframe(store);
      });
      addressListContainer.appendChild(card);
    });
  }

  // 3. Setup amCharts
  let root;
  let mapChart;
  let polygonSeries;
  let pointSeries;

  function initMap(regionKey = "uae") {
    if (!am5) return;

    // Clean up previous instance if it exists
    if (root) {
      root.dispose();
    }

    root = am5.Root.new("chartdiv");
    root.setThemes([am5themes_Animated.new(root)]);

    mapChart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        projection: am5map.geoMercator(),
        minZoomLevel: 1,
        maxZoomLevel: 1,
        wheelY: "none",
        wheelX: "none",
      }),
    );

    // Create polygon series for the specific country
    polygonSeries = mapChart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: storeData[regionKey].geodata,
        fill: am5.color(0x2a2a2a), // subtle dark (darker grey)
        stroke: am5.color(0x555555),
        strokeWidth: 1.5,
      }),
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x3a3a3a), // hover dark
    });

    // Create point series for the store markers
    pointSeries = mapChart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(function () {
      const circle = am5.Circle.new(root, {
        radius: 7,
        fill: am5.color(0xff6118),
        stroke: am5.color(0x555555),
        strokeWidth: 2,
        tooltipText: "{title}",
        cursorOverStyle: "pointer",
      });

      circle.events.on("click", function (ev) {
        const dataContext = ev.target.dataItem.dataContext;
        showIframe(dataContext);
      });

      circle.states.create("hover", { scale: 1.3 });
      return am5.Bullet.new(root, { sprite: circle });
    });

    // Populate points
    const data = storeData[regionKey];
    pointSeries.data.setAll(
      data.stores.map((s) => ({
        geometry: { type: "Point", coordinates: [s.long, s.lat] },
        title: s.title,
        ...s,
      })),
    );
  }

  function loadRegionMap(regionKey) {
    initMap(regionKey);
  }

  // 4. Iframe Interactivity
  const chartDiv = document.getElementById("chartdiv");
  const iframeLayer = document.getElementById("iframe-layer");
  const storeIframe = document.getElementById("store-iframe");
  const iframeTitle = document.getElementById("iframe-title");
  const backToMapBtn = document.getElementById("back-to-map-btn");

  function showIframe(store) {
    storeIframe.src = store.iframeSrc;
    iframeTitle.textContent = store.title;

    chartDiv.style.opacity = "0";
    chartDiv.style.pointerEvents = "none";

    iframeLayer.style.opacity = "1";
    iframeLayer.style.pointerEvents = "auto";
  }

  function hideIframe() {
    storeIframe.src = "";

    iframeLayer.style.opacity = "0";
    iframeLayer.style.pointerEvents = "none";

    chartDiv.style.opacity = "1";
    chartDiv.style.pointerEvents = "auto";
  }

  if (backToMapBtn) backToMapBtn.addEventListener("click", hideIframe);

  // 5. Region Toggles
  const tabs = document.querySelectorAll(".region-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((t) => {
        t.classList.remove("is-active");
      });
      const target = e.target;
      target.classList.add("is-active");

      const region = target.getAttribute("data-region");

      renderAddressCards(region);
      loadRegionMap(region);
      hideIframe();
    });
  });

  // 6. Initialize on Load
  if (typeof am5 !== "undefined") {
    am5.ready(function () {
      initMap("uae");
      renderAddressCards("uae");
    });
  } else {
    console.error("amCharts library not loaded properly via CDN.");
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
        btn.classList.replace("bg-red-700", "bg-green-600");
        btn.classList.replace("hover:bg-red-800", "hover:bg-green-700");
        contactForm.reset();
        setTimeout(() => {
          btn.innerText = originalText;
          btn.classList.replace("bg-green-600", "bg-red-700");
          btn.classList.replace("hover:bg-green-700", "hover:bg-red-800");
        }, 4000);
      }, 1500);
    });
  }
});
