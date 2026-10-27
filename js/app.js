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
    /* grouped render: one section per category, flagships pulled to the top */
    var ORDER = ["Solvent", "Textile", "UV", "Sublimation", "CNC / Laser", "Finishing", "Consumables"];
    function refOf(p) { return "REF · VKE-" + String(PRODUCTS.indexOf(p) + 1).padStart(3, "0"); }
    function imgHTML(p) {
      return p.img ? '<img class="card-img" src="' + p.img + '" alt="' + p.name + '" loading="lazy">' : "";
    }
    function cardHTML(p) {
      var m = encodeURIComponent(p.name);
      var cta = '<p class="go"><a class="arrow-link" href="machine.html?m=' + m + '">View details <span class="arr">&rarr;</span></a></p>';
      var pills = '<div class="card-pills"><span class="pill">' + (p.cat === "Consumables" ? "Original Stock" : "Industrial Grade") + '</span><span class="pill">Verified Specs</span></div>';
      if (p.flagship) {
        var specs = Object.keys(p.spec || {}).map(function (k) {
          return '<div><span>' + k + '</span>' + p.spec[k] + "</div>";
        }).join("");
        return '<article class="card flagship"><div class="inner"><div>' +
          '<div class="rowline"><span class="cat">Flagship · ' + p.cat + '</span><span class="ref">' + refOf(p) + "</span></div>" +
          "<h3>" + p.name + "</h3><p>" + p.blurb +
          '</p>' + pills + '<p class="go"><a class="arrow-link" href="machine.html?m=' + m + '">Full spec sheet &amp; enquire <span class="arr">&rarr;</span></a></p>' +
          "</div><div class='flag-right'>" + imgHTML(p) + '<div class="flag-specs">' + specs + "</div></div></div></article>";
      }
      return '<article class="card"><div class="rowline"><span class="ref">' + refOf(p) + '</span><span class="cat">' + p.cat + "</span></div>" + imgHTML(p) +
        "<h3>" + p.name + "</h3><p>" + p.blurb + pills + cta + "</article>";
    }
    function group(cat) {
      var items = P.filter(function (p) { return p.cat === cat; });
      if (!items.length) return "";
      var byId = { Solvent: "solvent", Textile: "textile", UV: "uv", Sublimation: "sublimation", "CNC / Laser": "cnc", Finishing: "finishing", Consumables: "consumables" };
      var flags = items.filter(function (p) { return p.flagship; });
      var rest = items.filter(function (p) { return !p.flagship; });
      return '<section class="p-group" id="cat-' + byId[cat] + '" data-c="' + byId[cat] + '">' +
        '<div class="p-group-head"><div class="rowline"><span class="cat" style="color:var(--ink)">' + cat + "</span>" +
        '<span class="cnt">' + items.length + " model" + (items.length > 1 ? "s" : "") + "</span></div></div>" +
        '<div class="grid">' + flags.map(cardHTML).join("") + rest.map(cardHTML).join("") + "</div></section>";
    }
    var order = ORDER.filter(function (c) { return P.some(function (p) { return p.cat === c; }); });
    grid.innerHTML = order.map(group).join("");

    /* jump-to-category bar (from home tiles / footer / hash) */
    var bar = document.getElementById("cat-jump");
    if (bar) {
      bar.innerHTML = '<span class="jump-label">Jump to</span>' + order.map(function (c) {
        var ids = { Solvent: "solvent", Textile: "textile", UV: "uv", Sublimation: "sublimation", "CNC / Laser": "cnc", Finishing: "finishing", Consumables: "consumables" };
        return '<a class="jump" data-jc="' + ids[c] + '" href="#cat-' + ids[c] + '">' + c + "</a>";
      }).join("");
    }
    /* deep link: products.html#uv -> scroll to that group */
    if (location.hash && location.hash.length > 1) {
      var el = document.querySelector(location.hash) || document.querySelector("#cat-" + location.hash.slice(1));
      if (el) setTimeout(function () { el.scrollIntoView(); }, 60);
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
