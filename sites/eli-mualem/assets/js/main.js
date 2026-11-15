(function () {
  'use strict';
  var doc = document.documentElement;

  /* Header hairline after 8px of scroll */
  var header = document.querySelector('.site-header');
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Signature reveal: the wipe.
     A fully clipped element never reports as intersecting, so each .wipe is
     watched through its parent; .dim lines are watched directly. */
  var targets = new Set();
  document.querySelectorAll('.wipe').forEach(function (el) { targets.add(el.parentElement); });
  document.querySelectorAll('.dim').forEach(function (el) { targets.add(el); });
  function reveal(target) {
    if (target.classList.contains('dim')) target.classList.add('is-in');
    target.querySelectorAll(':scope > .wipe').forEach(function (w) { w.classList.add('is-in'); });
  }
  if ('IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          reveal(entry.target);
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    targets.forEach(function (el) { revealer.observe(el); });
  } else {
    targets.forEach(reveal);
  }

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  function setMenu(open, returnFocus) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'סגירה' : 'תפריט';
    menu.hidden = !open;
    doc.classList.toggle('menu-open', open);
    if (!open && returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true', false);
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false, false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', function (mq) {
    if (mq.matches) setMenu(false, false);
  });

  /* Mobile sticky bar: after the hero, never over the contact section */
  var bar = document.getElementById('sticky-bar');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');
  var heroVisible = true;
  var contactVisible = false;
  if ('IntersectionObserver' in window) {
    var barWatch = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) heroVisible = entry.isIntersecting;
        if (entry.target === contact) contactVisible = entry.isIntersecting;
      });
      bar.classList.toggle('is-visible', !heroVisible && !contactVisible);
    });
    barWatch.observe(hero);
    barWatch.observe(contact);
  } else {
    bar.classList.add('is-visible');
  }

  /* WhatsApp quick form */
  var form = document.getElementById('quick-form');
  var nameInput = document.getElementById('f-name');
  var nameError = document.getElementById('f-name-error');
  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim()) {
      nameInput.removeAttribute('aria-invalid');
      nameError.textContent = '';
    }
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    var type = form.elements.type.value;
    var city = form.elements.city.value.trim();
    if (!name) {
      nameInput.setAttribute('aria-invalid', 'true');
      nameError.textContent = 'נשמח לדעת איך קוראים לכם';
      nameInput.focus();
      return;
    }
    var text = 'היי אלי, כאן ' + name + '. צריך: ' + type + '.' +
      (city ? ' עיר: ' + city + '.' : '') + ' הגעתי מהאתר.';
    window.open('https://wa.me/972547749280?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
})();
