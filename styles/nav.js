/* Accessible site navigation (no dependencies).
   - Menu button toggles the mobile menu (aria-expanded / aria-controls)
   - Chevron buttons toggle subnavs using the "disclosure" pattern
   - Escape closes an open submenu/menu and returns focus to its button
   - Tapping outside, or tabbing out of, an open menu closes it (the header is
     sticky, so a forgotten open menu would otherwise cover the page)
   - Opening the mobile menu also opens the section you're in (e.g. About)
   - Home page: the site name in the bar stays hidden while the big logo is on
     screen, then fades in once you scroll past it
   - Without JS, every link is simply visible (see .js rules in pitches.css) */
(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('primary-menu');
  if (!menu) { return; }
  var nav = menu.closest('nav') || menu.parentNode;
  var desktop = window.matchMedia('(min-width: 48em)');

  function setOpen(button, panel, open) {
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.classList.toggle('is-open', open);
  }

  function menuIsOpen() {
    return !!toggle && toggle.getAttribute('aria-expanded') === 'true';
  }

  /* Submenus */
  var subToggles = menu.querySelectorAll('.subnav-toggle');

  function closeAllSubmenus(except) {
    Array.prototype.forEach.call(subToggles, function (btn) {
      if (btn === except) { return; }
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      if (panel) { setOpen(btn, panel, false); }
    });
  }

  function closeMenu() {
    closeAllSubmenus(null);
    if (menuIsOpen()) { setOpen(toggle, menu, false); }
  }

  /* Mobile menu */
  if (toggle) {
    toggle.addEventListener('click', function () {
      var willOpen = !menuIsOpen();
      setOpen(toggle, menu, willOpen);
      if (willOpen) {
        /* Show the current section's pages straight away */
        var current = menu.querySelector('.subnav [aria-current="page"]');
        var sub = current && current.closest('.subnav');
        var btn = sub && menu.querySelector('.subnav-toggle[aria-controls="' + sub.id + '"]');
        if (btn) { setOpen(btn, sub, true); }
      } else {
        closeAllSubmenus(null);
      }
    });
  }

  Array.prototype.forEach.call(subToggles, function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) { return; }
    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      closeAllSubmenus(btn);
      setOpen(btn, panel, willOpen);
    });
    /* Desktop dropdown: close when keyboard focus leaves the submenu's list item.
       (On phones the submenu is part of the open menu, so leave it alone.) */
    btn.parentNode.addEventListener('focusout', function (e) {
      if (desktop.matches && !btn.parentNode.contains(e.relatedTarget)) { setOpen(btn, panel, false); }
    });
  });

  /* Tabbing past the end of the open mobile menu closes it */
  nav.addEventListener('focusout', function (e) {
    if (menuIsOpen() && e.relatedTarget && !nav.contains(e.relatedTarget)) { closeMenu(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') { return; }
    var openSub = menu.querySelector('.subnav-toggle[aria-expanded="true"]');
    if (openSub && (desktop.matches || !menuIsOpen())) {
      closeAllSubmenus(null);
      openSub.focus();
    } else if (menuIsOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  /* Click/tap outside closes subnavs and the mobile menu */
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) { closeMenu(); }
  });

  /* Home page: show the bar's site name only once the logo has scrolled away */
  var logo = document.querySelector('.site-logo');
  var brand = document.querySelector('.site-nav__brand');
  if (logo && brand && 'IntersectionObserver' in window) {
    var root = document.documentElement;
    root.classList.add('brand-auto');
    new IntersectionObserver(function (entries) {
      root.classList.toggle('brand-shown', !entries[0].isIntersecting);
    }, { rootMargin: '-56px 0px 0px 0px' }).observe(logo);   /* 56px = height of the sticky bar */
  }

  /* Rotating a tablet or resizing past the breakpoint resets the menu */
  var reset = function () { closeMenu(); };
  if (desktop.addEventListener) { desktop.addEventListener('change', reset); }
  else if (desktop.addListener) { desktop.addListener(reset); }
})();
