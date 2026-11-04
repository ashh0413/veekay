// Apple Navigation & Flyout Mega-Menus for Vee Kay Enterprises
(function () {
  const navItems = document.querySelectorAll('.apple-nav-item[data-flyout]');
  const flyouts = document.querySelectorAll('.apple-flyout-overlay');
  const dimmer = document.getElementById('apple-nav-dimmer');
  const mobileBurger = document.getElementById('apple-mobile-burger');
  let activeFlyout = null;

  function closeAllFlyouts() {
    flyouts.forEach(f => f.classList.remove('open'));
    navItems.forEach(n => n.classList.remove('active'));
    if (dimmer) dimmer.classList.remove('active');
    activeFlyout = null;
  }

  navItems.forEach(item => {
    const targetId = item.getAttribute('data-flyout');
    const targetFlyout = document.getElementById(targetId);

    if (!targetFlyout) return;

    item.addEventListener('mouseenter', () => {
      closeAllFlyouts();
      item.classList.add('active');
      targetFlyout.classList.add('open');
      if (dimmer) dimmer.classList.add('active');
      activeFlyout = targetFlyout;
    });

    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (item.classList.contains('active')) {
        closeAllFlyouts();
      } else {
        closeAllFlyouts();
        item.classList.add('active');
        targetFlyout.classList.add('open');
        if (dimmer) dimmer.classList.add('active');
        activeFlyout = targetFlyout;
      }
    });
  });

  // Close when leaving flyout or clicking dimmer
  flyouts.forEach(flyout => {
    flyout.addEventListener('mouseleave', () => {
      closeAllFlyouts();
    });
  });

  if (dimmer) {
    dimmer.addEventListener('click', closeAllFlyouts);
    dimmer.addEventListener('mouseenter', closeAllFlyouts);
  }

  // Escape key closes flyout
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
