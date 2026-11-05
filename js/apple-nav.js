// Apple Navigation & Mega-Menu Flyout Controller for Vee Kay Enterprises
// Robust, debounced, zero-jitter hover architecture matching apple.com
(function () {
  const globalNav = document.querySelector('.apple-global-nav');
  const navItemsWithFlyout = document.querySelectorAll('.apple-nav-item[data-flyout]');
  const nonFlyoutItems = document.querySelectorAll('.apple-logo-link, .apple-nav-actions, .apple-nav-item:not([data-flyout])');
  const flyouts = document.querySelectorAll('.apple-flyout-overlay');
  const dimmer = document.getElementById('apple-nav-dimmer');
  const mobileBurger = document.getElementById('apple-mobile-burger');

  let activeFlyout = null;
  let activeNavItem = null;
  let closeTimer = null;

  function clearCloseTimer() {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  function closeAllFlyouts() {
    clearCloseTimer();
    flyouts.forEach(f => f.classList.remove('open'));
    navItemsWithFlyout.forEach(n => n.classList.remove('active'));
    if (dimmer) dimmer.classList.remove('active');
    activeFlyout = null;
    activeNavItem = null;
  }

  function queueClose(delay = 250) {
    clearCloseTimer();
    closeTimer = setTimeout(() => {
      closeAllFlyouts();
    }, delay);
  }

  function switchFlyout(navItem, targetFlyout) {
    clearCloseTimer();

    // If another flyout is open, swap instantly without closing the overlay container
    if (activeFlyout && activeFlyout !== targetFlyout) {
      flyouts.forEach(f => {
        if (f !== targetFlyout) f.classList.remove('open');
      });
      navItemsWithFlyout.forEach(n => {
        if (n !== navItem) n.classList.remove('active');
      });
    }

    navItem.classList.add('active');
    targetFlyout.classList.add('open');
    if (dimmer) dimmer.classList.add('active');

    activeFlyout = targetFlyout;
    activeNavItem = navItem;
  }

  // 1. Navigation items with mega-menus
  navItemsWithFlyout.forEach(item => {
    const targetId = item.getAttribute('data-flyout');
    const targetFlyout = document.getElementById(targetId);
    if (!targetFlyout) return;

    item.addEventListener('mouseenter', () => {
      switchFlyout(item, targetFlyout);
    });

    item.addEventListener('click', (e) => {
      // Allow toggle on mobile/touch, link navigation on desktop if already active
      if (item.classList.contains('active')) {
        // Allow default link navigation if clicked while already open
      } else {
        e.preventDefault();
        switchFlyout(item, targetFlyout);
      }
    });
  });

  // 2. Non-flyout items inside navbar (Logo, 3D Showroom, Search, Cart)
  // When cursor moves to items without menus, gracefully close open flyouts
  nonFlyoutItems.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (activeFlyout) {
        queueClose(150);
      }
    });
  });

  // 3. Keep flyout open while cursor is inside ANY open flyout panel
  flyouts.forEach(flyout => {
    flyout.addEventListener('mouseenter', () => {
      clearCloseTimer();
    });
    flyout.addEventListener('mouseleave', () => {
      queueClose(250);
    });
  });

  // 4. Global nav mouse leave: start graceful close countdown
  if (globalNav) {
    globalNav.addEventListener('mouseenter', () => {
      clearCloseTimer();
    });
    globalNav.addEventListener('mouseleave', (e) => {
      // If moving downwards into the flyout overlay, do NOT close
      const toEl = e.relatedTarget;
      if (toEl && (toEl.closest('.apple-flyout-overlay') || toEl.classList?.contains('apple-flyout-overlay'))) {
        return;
      }
      queueClose(250);
    });
  }

  // 5. Dimmer click closes immediately
  if (dimmer) {
    dimmer.addEventListener('click', closeAllFlyouts);
  }

  // 6. Escape key dismisses
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllFlyouts();
  });

  // 7. Mobile hamburger toggle & drawer management
  if (mobileBurger) {
    const mobDrawer = document.getElementById('apple-mobile-drawer');
    mobileBurger.addEventListener('click', () => {
      if (!mobDrawer) return;
      const isOpen = mobDrawer.classList.toggle('open');
      mobileBurger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (mobDrawer) {
      // Close drawer when any mobile nav link is clicked
      mobDrawer.querySelectorAll('.apple-mob-link, .apple-btn-pill-primary').forEach(link => {
        link.addEventListener('click', () => {
          mobDrawer.classList.remove('open');
          mobileBurger.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }
  }
})();
