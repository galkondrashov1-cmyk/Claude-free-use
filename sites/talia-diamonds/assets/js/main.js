(function () {
  'use strict';

  var body = document.body;

  /* Header: hairline once scrolled 8px */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'סגירה' : 'תפריט';
    menu.hidden = !open;
    body.classList.toggle('menu-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false);
  });

  /* Signature motion: the unveil */
  var unveils = document.querySelectorAll('.unveil');
  if ('IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    unveils.forEach(function (el) { revealer.observe(el); });
  } else {
    unveils.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Mobile sticky bar: after the hero, hidden while #contact is in view */
  var bar = document.getElementById('sticky-bar');
  var hero = document.getElementById('hero');
  var contact = document.getElementById('contact');
  var heroOut = false;
  var contactIn = false;

  function updateBar() {
    bar.classList.toggle('is-visible', heroOut && !contactIn);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var e = entries[0];
      heroOut = !e.isIntersecting && e.boundingClientRect.top < 0;
      updateBar();
    }).observe(hero);

    new IntersectionObserver(function (entries) {
      contactIn = entries[0].isIntersecting;
      updateBar();
    }).observe(contact);
  }

})();
