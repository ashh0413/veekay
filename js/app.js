/* shared behavior: burger, product grid + filter tabs, scroll reveals */
(function () {
  var burger = document.querySelector(".burger");
  if (burger) burger.addEventListener("click", function () {
    document.querySelector("nav .links").classList.toggle("open");
  });

  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); en.target.classList.remove("arm"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (r) {
      if (r.getBoundingClientRect().top > innerHeight) r.classList.add("arm");
      io.observe(r);
    });
    /* safety: never leave content hidden if IO misbehaves */
    setTimeout(function () {
      reveals.forEach(function (r) { r.classList.add("in"); r.classList.remove("arm"); });
    }, 2500);
  }

  var grid = document.getElementById("product-grid");
  var P = typeof PRODUCTS !== "undefined" ? PRODUCTS : null;
  if (grid && P) {
    var searchInput = document.getElementById("catalog-search");
    var sortSelect = document.getElementById("catalog-sort");
    var statusEl = document.getElementById("catalog-status");
    var pillsContainer = document.getElementById("cat-pills");

    var activeCat = "all";
    var activeQuery = "";
    var activeSort = "featured";

    var CATEGORIES = [
      { key: "all", label: "All Platforms" },
      { key: "Solvent", label: "Roll-to-Roll" },
      { key: "UV", label: "Flatbed UV" },
      { key: "Textile", label: "Digital Textile" },
      { key: "Sublimation", label: "Sublimation" },
      { key: "CNC / Laser", label: "CNC & Laser" },
      { key: "Consumables", label: "Heads & Inks" }
    ];

    function refOf(p) {
      return "REF · VKE-" + String(PRODUCTS.indexOf(p) + 1).padStart(3, "0");
    }

    function renderFilterPills() {
      if (!pillsContainer) return;
      pillsContainer.innerHTML = CATEGORIES.map(function (c) {
        var count = c.key === "all" ? P.length : P.filter(function (x) { return x.cat === c.key; }).length;
        var activeClass = activeCat === c.key ? " active" : "";
        return '<button class="apple-cat-filter-btn' + activeClass + '" data-cat="' + c.key + '">' +
          c.label + ' <span class="badge-count">' + count + '</span></button>';
      }).join("");

      pillsContainer.querySelectorAll(".apple-cat-filter-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          activeCat = btn.getAttribute("data-cat");
          pillsContainer.querySelectorAll(".apple-cat-filter-btn").forEach(function (b) {
            b.classList.toggle("active", b === btn);
          });
          renderCatalog();
        });
      });
    }

    function cardHTML(p) {
      var m = encodeURIComponent(p.name);
      var img = p.img
        ? '<div class="apple-product-img-wrap"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy" class="apple-product-img"></div>'
        : '<div class="apple-product-img-wrap placeholder"><span>IMAGE PENDING</span></div>';

      var flagshipPill = p.flagship ? '<span class="apple-card-flagship-pill">Flagship Model</span>' : '';
      var specBadges = '';
      if (p.spec) {
        var specKeys = Object.keys(p.spec).slice(0, 3);
        specBadges = '<div class="apple-product-specs-chips">' +
          specKeys.map(function (k) {
            return '<div class="spec-chip"><strong>' + k + ':</strong> ' + p.spec[k] + '</div>';
          }).join("") + '</div>';
      }

      return '<article class="apple-product-card' + (p.flagship ? ' is-flagship' : '') + '">' +
        img +
        '<div class="apple-product-body">' +
          '<div class="apple-product-meta-row">' +
            '<span class="apple-product-cat-tag">' + p.cat + '</span>' +
            '<span class="apple-product-ref-tag">' + refOf(p) + '</span>' +
            flagshipPill +
          '</div>' +
          '<h3 class="apple-product-title">' + p.name + '</h3>' +
          '<p class="apple-product-blurb">' + p.blurb + '</p>' +
          specBadges +
          '<div class="apple-product-actions">' +
            '<a href="machine.html?m=' + m + '" class="apple-btn-pill-secondary apple-product-specs-btn">View Specifications &rarr;</a>' +
            '<a href="enquiry.html?machine=' + m + '" class="apple-btn-pill-primary apple-product-quote-btn">Get Factory Quote</a>' +
          '</div>' +
        '</div>' +
      '</article>';
    }

    function renderCatalog() {
      var q = activeQuery.toLowerCase().trim();
      var filtered = P.filter(function (p) {
        var matchCat = (activeCat === "all" || p.cat === activeCat);
        var matchQuery = !q ||
          p.name.toLowerCase().indexOf(q) >= 0 ||
          p.cat.toLowerCase().indexOf(q) >= 0 ||
          (p.blurb && p.blurb.toLowerCase().indexOf(q) >= 0) ||
          (p.spec && JSON.stringify(p.spec).toLowerCase().indexOf(q) >= 0);
        return matchCat && matchQuery;
      });

      if (activeSort === "featured") {
        filtered.sort(function (a, b) {
          if (a.flagship && !b.flagship) return -1;
          if (!a.flagship && b.flagship) return 1;
          return 0;
        });
      } else if (activeSort === "name-asc") {
        filtered.sort(function (a, b) { return a.name.localeCompare(b.name); });
      } else if (activeSort === "cat") {
        filtered.sort(function (a, b) { return a.cat.localeCompare(b.cat); });
      }

      if (statusEl) {
        statusEl.textContent = 'Showing ' + filtered.length + ' of ' + P.length + ' industrial platforms';
      }

      if (!filtered.length) {
        grid.innerHTML = '<div class="apple-catalog-empty">' +
          '<h3>No matching industrial platforms found</h3>' +
          '<p>Try adjusting your search terms or clearing the category filter.</p>' +
          '<button class="apple-btn-pill-secondary" id="reset-catalog-btn">Clear All Filters</button>' +
        '</div>';
        var resetBtn = document.getElementById("reset-catalog-btn");
        if (resetBtn) {
          resetBtn.addEventListener("click", function () {
            activeCat = "all";
            activeQuery = "";
            if (searchInput) searchInput.value = "";
            renderFilterPills();
            renderCatalog();
          });
        }
        return;
      }

      grid.innerHTML = filtered.map(cardHTML).join("");
    }

    renderFilterPills();
    renderCatalog();

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        activeQuery = searchInput.value;
        renderCatalog();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        activeSort = sortSelect.value;
        renderCatalog();
      });
    }

    /* deep link mapping: products.html#uv -> activate UV filter pill */
    var hash = location.hash.replace("#", "").toLowerCase();
    if (hash) {
      var map = {
        "uv": "UV",
        "solvent": "Solvent",
        "textile": "Textile",
        "sublimation": "Sublimation",
        "cnc": "CNC / Laser",
        "consumables": "Consumables"
      };
      if (map[hash]) {
        activeCat = map[hash];
        renderFilterPills();
        renderCatalog();
      }
    }
  }

  /* enquiry form: populate machine dropdown + preselect from ?machine= */
  var form = document.getElementById("enquiry-form");
  if (form && P) {
    var sel = document.getElementById("machine");
    if (sel) {
      sel.innerHTML = '<option value="">No machine in mind — advise</option>' +
        P.map(function (p) { return '<option>' + p.name + "</option>"; }).join("");
      var m = new URLSearchParams(location.search).get("machine");
      if (m && Array.from(sel.options).some(function (o) { return o.text === m; })) sel.value = m;
    }

    /* submit: Formspree endpoint when configured, else mailto. See FORM_ID below. */
    var FORM_ID = "YOUR_FORMSPREE_ID"; /* paste the id from formspree.com/f/<id> */
    form.addEventListener("submit", function (e) {
      var status = document.getElementById("form-status");
      if (FORM_ID === "YOUR_FORMSPREE_ID") {
        e.preventDefault();
        var d = new FormData(form);
        var subject = "Enquiry — " + (d.get("machine") || "Vee Kay");
        var body = "Name: " + (d.get("name") || "") + "\nCompany: " + (d.get("company") || "") +
          "\nPhone: " + (d.get("phone") || "") + "\nEmail: " + (d.get("email") || "") +
          "\nCity: " + (d.get("city") || "") + "\nMachine: " + (d.get("machine") || "") +
          "\n\n" + (d.get("message") || "");
        window.location.href = "mailto:sales@veekayent.com?subject=" +
          encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        if (status) status.textContent = "Opening your email app to send this to sales@veekayent.com…";
        return;
      }
      if (status) status.textContent = "Sending…";
      fetch("https://formspree.io/f/" + FORM_ID, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) { if (status) status.textContent = r.ok ? "Enquiry sent — we'll reply within one working day." : "Send failed, try again or call 1800-2000-964."; })
        .catch(function () { if (status) status.textContent = "Network error, call 1800-2000-964."; });
    });
  }

  /* tactile click micro-animation */
  document.addEventListener("pointerdown", function (e) {
    var el = e.target.closest(".btn, .ah-btn, .tile, .card, .cat-jump .jump, .arrow-link, button, .link");
    if (!el) return;
    el.style.transition = "transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "scale(0.96) translateY(1px)";
    var reset = function () {
      el.style.transform = "";
      setTimeout(function () { el.style.transition = ""; }, 180);
      window.removeEventListener("pointerup", reset);
      window.removeEventListener("pointercancel", reset);
    };
    window.addEventListener("pointerup", reset);
    window.addEventListener("pointercancel", reset);
  }, { passive: true });
})();
