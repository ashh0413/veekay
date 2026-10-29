/* Motion engine — Lenis inertia scroll + GSAP scroll reveals + SplitText hero
   Produx-style motion, dependency-free page logic, CDN libraries only. */
(function () {
  "use strict";

  var forceMotion = /[?&]motion=1(&|$)/.test(location.search);
  var reduced = !forceMotion && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Page transition fade (native View Transitions) ---- */
  if (!reduced && document.startViewTransition) {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank") return;
      var href = a.getAttribute("href");
      if (href.charAt(0) === "#" || href.indexOf("javascript:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("mailto:") === 0) return;
      var url;
      try { url = new URL(href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      document.startViewTransition(function () { location.assign(a.href); });
    }, true);
  }

  if (reduced) return;

  var attempts = 0;
  function tryBoot() {
    if (window.gsap && window.Lenis) { boot(); return; }
    if (++attempts < 60) setTimeout(tryBoot, 60); /* ponytail: retries ~3.6s, then native scroll remains */
  }

  function boot() {
    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger, window.SplitText);

    /* Lenis inertia scroll */
    var lenis = new window.Lenis({ duration: 1.15, smoothWheel: true });
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    lenis.on("scroll", function () { window.ScrollTrigger.update(); });

    /* Hero headline character reveal */
    var h1 = document.querySelector(".hero-axis h1");
    if (h1 && window.SplitText) {
      var st = new window.SplitText(h1, { type: "chars", lineClassName: "sl-line", charClassName: "sl-char" });
      gsap.fromTo(st.chars, { yPercent: 115, opacity: 0 }, {
        yPercent: 0, opacity: 1, duration: 0.85, ease: "power4.out", stagger: 0.028, delay: 0.12
      });
      /* Safety net: guarantee the headline is visible even if rAF is throttled (backgrounded tab). */
      setTimeout(function () { gsap.set(st.chars, { opacity: 1, yPercent: 0, clearProps: "all" }); }, 2200);
    }

    /* Section reveals */
    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      gsap.from(el, {
        y: 44, autoAlpha: 0, duration: 0.9, ease: "power3.out", clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 87%", once: true }
      });
    });

    /* Card grids (staggered) */
    document.querySelectorAll(".cap-card, .card, .facility-card, .pedestal-block, .why-card, .brand-card, .p-group").forEach(function (el, i) {
      gsap.from(el, {
        y: 36, autoAlpha: 0, duration: 0.75, ease: "power2.out", delay: (i % 4) * 0.07, clearProps: "transform",
        scrollTrigger: { trigger: el, start: "top 90%", once: true }
      });
    });

    /* Hero machine parallax */
    var vis = document.querySelector(".hero-axis-visual img");
    if (vis) {
      gsap.to(vis, { y: 90, ease: "none", scrollTrigger: { trigger: ".hero-axis", start: "top top", end: "bottom top", scrub: true } });
    }

    /* Smooth in-page anchor scroll */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (!id || !document.getElementById(id)) return;
      a.addEventListener("click", function (e) { e.preventDefault(); lenis.scrollTo("#" + id, { offset: -76, duration: 1.2 }); });
    });

    /* Modal scroll lock hooks (Infinity quick-spec dialog) */
    document.addEventListener("site:lock-scroll", function () { lenis.stop(); });
    document.addEventListener("site:unlock-scroll", function () { lenis.start(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", tryBoot);
  else tryBoot();
})();
