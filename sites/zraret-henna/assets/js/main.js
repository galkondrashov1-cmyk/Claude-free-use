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

  /* Arch rims: redraw each rim as a true 10px offset of the photo's arch,
     so the gap stays even at the shoulders at every size (fallback: the static path) */
  function bez(a, b, c, d, t) { var u = 1 - t; return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d; }
  function fitRim(arch) {
    var r = arch.getBoundingClientRect(), W = r.width, H = r.height, o = 10;
    if (!W) return;
    var snap = function (v, base) { return Math.floor(base + v) + 0.5 - base; };
    var xl = snap(-o, r.left), xr = snap(W + o, r.left), yb = snap(H + o, r.top), ly = snap(0.46 * H - o, r.top);
    var X = [0.07 * W, 0, 0.02 * W, 0.5 * W], Y = [0.46 * H, 0.37 * H, 0.15 * H, 0], pts = [], prev = null;
    for (var i = 0; i <= 64; i++) {
      var t = i / 64, e = 1e-3, t0 = Math.max(0, t - e), t1 = Math.min(1, t + e);
      var dx = bez(X[0], X[1], X[2], X[3], t1) - bez(X[0], X[1], X[2], X[3], t0);
      var dy = bez(Y[0], Y[1], Y[2], Y[3], t1) - bez(Y[0], Y[1], Y[2], Y[3], t0), len = Math.hypot(dx, dy);
      var q = [bez(X[0], X[1], X[2], X[3], t) + o * dy / len, bez(Y[0], Y[1], Y[2], Y[3], t) - o * dx / len];
      if (q[1] <= ly) {
        if (!pts.length && prev) { var k = (ly - prev[1]) / (q[1] - prev[1]); pts.push([prev[0] + k * (q[0] - prev[0]), ly]); }
        pts.push(q);
      }
      prev = q;
      if (t === 1) { var s = (W / 2 - q[0]) / dx; pts.push([W / 2, q[1] + s * dy]); }
    }
    var f = function (p) { return p[0].toFixed(2) + ',' + p[1].toFixed(2); };
    var left = pts.map(f), right = pts.slice(0, -1).reverse().map(function (p) { return f([W - p[0], p[1]]); });
    var d = 'M' + [f([xl, yb]), f([xl, ly])].concat(left, right, [f([xr, ly]), f([xr, yb])]).join(' L') + ' Z';
    arch.querySelectorAll(':scope > svg').forEach(function (svg) {
      svg.setAttribute('viewBox', (-o) + ' ' + (-o) + ' ' + (W + 2 * o) + ' ' + (H + 2 * o));
      svg.querySelector('path').setAttribute('d', d);
    });
  }
  var arches = document.querySelectorAll('.arch');
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (entries) { entries.forEach(function (en) { fitRim(en.target); }); });
    arches.forEach(function (a) { ro.observe(a); });
  }

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
