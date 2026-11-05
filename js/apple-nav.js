// Apple Navigation & Flyout Mega-Menus for Vee Kay Enterprises (Debounced & Glitch-Free)
(function () {
  const navItems = document.querySelectorAll('.apple-nav-item[data-flyout]');
  const flyouts = document.querySelectorAll('.apple-flyout-overlay');
  const dimmer = document.getElementById('apple-nav-dimmer');
  const mobileBurger = document.getElementById('apple-mobile-burger');
  let activeFlyout = null;
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
    navItems.forEach(n => n.classList.remove('active'));
    if (dimmer) dimmer.classList.remove('active');
    activeFlyout = null;
  }

  function openFlyout(item, targetFlyout) {
    clearCloseTimer();
    if (activeFlyout && activeFlyout !== targetFlyout) {
      // Switching between tabs: close others without animation flicker
      flyouts.forEach(f => {
        if (f !== targetFlyout) f.classList.remove('open');
      });
      navItems.forEach(n => {
        if (n !== item) n.classList.remove('active');
      });
    }

    item.classList.add('active');
    targetFlyout.classList.add('open');
    if (dimmer) dimmer.classList.add('active');
    activeFlyout = targetFlyout;
  }

  function queueClose() {
    clearCloseTimer();
    closeTimer = setTimeout(() => {
      closeAllFlyouts();
    }, 180); // 180ms graceful hover buffer prevents stutter across mouse transitions
  }

  navItems.forEach(item => {
    const targetId = item.getAttribute('data-flyout');
    const targetFlyout = document.getElementById(targetId);

    if (!targetFlyout) return;

    item.addEventListener('mouseenter', () => {
      openFlyout(item, targetFlyout);
    });

    item.addEventListener('mouseleave', () => {
      queueClose();
    });

    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.classList.contains('active')) {
        closeAllFlyouts();
      } else {
        openFlyout(item, targetFlyout);
      }
    });
  });

  flyouts.forEach(flyout => {
    // Keep open when mouse enters the flyout panel
    flyout.addEventListener('mouseenter', () => {
      clearCloseTimer();
    });

    // Queue close when mouse exits the flyout panel
    flyout.addEventListener('mouseleave', () => {
      queueClose();
    });
  });

  if (dimmer) {
    dimmer.addEventListener('click', closeAllFlyouts);
    dimmer.addEventListener('mouseenter', () => {
      queueClose();
    });
  }

  // Escape key closes flyout immediately
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllFlyouts();
  });

  // Mobile menu toggle
  if (mobileBurger) {
    mobileBurger.addEventListener('click', () => {
      const mobDrawer = document.getElementById('apple-mobile-drawer');
      if (mobDrawer) mobDrawer.classList.toggle('open');
    });
  }
})();
