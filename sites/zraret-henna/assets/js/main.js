(function () {
  'use strict';
  var root = document.documentElement;
  var mobile = window.matchMedia('(max-width: 639px)');

  /* Header border once scrolled */
  var header = document.querySelector('.header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector('.header__toggle[aria-controls]');
  var menu = document.getElementById('menu');
  var closeBtn = menu.querySelector('.menu-overlay__close');
  function setMenu(open, returnFocus) {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    root.classList.toggle('menu-open', open);
    if (open) closeBtn.focus();
    else if (returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', function () { setMenu(true); });
  closeBtn.addEventListener('click', function () { setMenu(false, true); });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) setMenu(false, true);
  });

  /* Signature reveal: the rise */
  var risers = document.querySelectorAll('[data-rise]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-risen');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    risers.forEach(function (el) { io.observe(el); });
  } else {
    risers.forEach(function (el) { el.classList.add('is-risen'); });
  }

  /* Mobile sticky bar: after the hero, never over the contact section */
  var bar = document.querySelector('.sticky-bar');
  var hero = document.querySelector('.hero');
  var contact = document.getElementById('contact');
  var heroOut = false, contactIn = false;
  function updateBar() {
    var show = heroOut && !contactIn;
    bar.classList.toggle('is-shown', show);
    if (show || !mobile.matches) bar.removeAttribute('inert');
    else bar.setAttribute('inert', '');
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.target === hero) heroOut = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        else contactIn = entry.isIntersecting;
      });
      updateBar();
    }).observe(hero);
  } else {
    heroOut = true;
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      contactIn = entries[0].isIntersecting;
      updateBar();
    }).observe(contact);
  }
  updateBar();

  /* WhatsApp form */
  var form = document.getElementById('lead-form');
  var nameInput = form.elements.name;
  var nameErr = document.getElementById('f-name-err');
  function setError(on) {
    nameErr.hidden = !on;
    if (on) nameInput.setAttribute('aria-invalid', 'true');
    else nameInput.removeAttribute('aria-invalid');
  }
  nameInput.addEventListener('input', function () { if (nameInput.value.trim()) setError(false); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    if (!name) { setError(true); nameInput.focus(); return; }
    setError(false);
    var date = form.elements.date.value;
    var place = form.elements.place.value.trim();
    var guests = form.elements.guests.value;
    var clauses = [];
    if (date) {
      var p = date.split('-');
      clauses.push('בתאריך ' + p[2] + '.' + p[1] + '.' + p[0]);
    }
    if (place) clauses.push('ב' + place);
    if (guests && guests !== 'עוד לא יודעים') clauses.push(guests + ' אורחים');
    var text = 'היי רוני, כאן ' + name + '.';
    if (clauses.length) text += ' מתכננים חינה ' + clauses.join(', ') + '.';
    text += ' נשמח להצעה.';
    window.open('https://wa.me/972529282992?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });
})();
