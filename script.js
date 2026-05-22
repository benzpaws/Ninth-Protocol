/* ═══════════════════════════════════════════════════════════════════════
   NINTH PROTOCOL  ·  Interaction Engine
   Information-led · Type-driven · Adaptive responsive
   ═══════════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────
  // SVG monogram — inlined so it inherits currentColor and has no PNG bg
  // ─────────────────────────────────────────────────────────────────────
  const SVG_MARK = `
<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="11" stroke-linecap="square" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <line x1="22" y1="16" x2="22" y2="104"/>
  <line x1="22" y1="16" x2="72" y2="104"/>
  <line x1="72" y1="16" x2="72" y2="104"/>
  <path d="M 72 16 L 86 16 A 25 25 0 0 1 86 66 L 72 66" stroke-linejoin="round"/>
</svg>`.trim();

  function injectMark(el) { if (el) el.innerHTML = SVG_MARK; }
  ['preloaderMark', 'topbarMark', 'footerMark'].forEach(id => injectMark(document.getElementById(id)));

  // ─────────────────────────────────────────────────────────────────────
  // Session reference  ·  NP-9XXXXX  ·  the leading 9 is the brand motif
  // ─────────────────────────────────────────────────────────────────────
  function generateReference() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ref = 'NP-9';
    for (let i = 0; i < 5; i++) ref += chars[Math.floor(Math.random() * chars.length)];
    return ref;
  }

  const sessionRef = generateReference();
  ['sessionRef', 'drawerRef', 'footerRef', 'preloader-ref', 'formRefDisplay']
    .forEach(id => { const el = document.getElementById(id); if (el) el.textContent = sessionRef; });

  const formRefInput = document.getElementById('formReference');
  if (formRefInput) formRefInput.value = sessionRef;

  // ─────────────────────────────────────────────────────────────────────
  // Live UTC clock  ·  central to the "Time is money" motto
  // ─────────────────────────────────────────────────────────────────────
  function tickClock() {
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const mm = String(now.getUTCMinutes()).padStart(2, '0');
    const ss = String(now.getUTCSeconds()).padStart(2, '0');
    const time = `${hh}:${mm}:${ss}`;
    const timeBig = `UTC ${time}`;

    const top = document.getElementById('utcClock');
    if (top) top.textContent = time;

    const big = document.getElementById('utcClockBig');
    if (big) big.textContent = timeBig;

    const drawer = document.getElementById('drawerClock');
    if (drawer) drawer.textContent = time;

    const footer = document.getElementById('footerClock');
    if (footer) footer.textContent = timeBig;
  }
  tickClock();
  setInterval(tickClock, 1000);

  // ─────────────────────────────────────────────────────────────────────
  // Current year in footer
  // ─────────────────────────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─────────────────────────────────────────────────────────────────────
  // Preloader  ·  show ~1.6s, dismiss cleanly
  // ─────────────────────────────────────────────────────────────────────
  function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    dismissPreloader();
  } else if (document.readyState === 'complete') {
    setTimeout(dismissPreloader, 1600);
  } else {
    window.addEventListener('load', () => setTimeout(dismissPreloader, 1600));
  }

  // Defensive: ensure preloader never lingers
  setTimeout(dismissPreloader, 4000);

  // ─────────────────────────────────────────────────────────────────────
  // Smooth anchor scroll
  // ─────────────────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      // Close drawer if open
      const drawer = document.getElementById('drawer');
      if (drawer && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        const toggle = document.getElementById('menuToggle');
        if (toggle) toggle.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      }

      if (targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 70;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Mobile drawer
  // ─────────────────────────────────────────────────────────────────────
  const menuToggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('drawer');
  if (menuToggle && drawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
    });
  }

  // ─────────────────────────────────────────────────────────────────────
  // Scroll progress
  // ─────────────────────────────────────────────────────────────────────
  const scrollProgress = document.getElementById('scrollProgress');
  let scrollTicking = false;
  function updateProgress() {
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / Math.max(docHeight, 1);
      scrollProgress.style.transform = `scaleX(${scrolled})`;
    }
    scrollTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateProgress);
      scrollTicking = true;
    }
  }, { passive: true });

  // ─────────────────────────────────────────────────────────────────────
  // Auto-hide top bar on scroll down, show on scroll up
  // ─────────────────────────────────────────────────────────────────────
  const topbar = document.getElementById('topbar');
  let lastY = window.scrollY;
  let topbarTicking = false;
  function handleTopbar() {
    const y = window.scrollY;
    if (topbar) {
      if (y > 200 && y > lastY + 8) {
        topbar.classList.add('is-hidden');
      } else if (y < lastY - 8 || y < 100) {
        topbar.classList.remove('is-hidden');
      }
    }
    lastY = y;
    topbarTicking = false;
  }
  window.addEventListener('scroll', () => {
    if (!topbarTicking) {
      requestAnimationFrame(handleTopbar);
      topbarTicking = true;
    }
  }, { passive: true });

  // ─────────────────────────────────────────────────────────────────────
  // Reveal on scroll  ·  slow, deliberate
  // ─────────────────────────────────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('[data-reveal], [data-reveal-stagger], [data-reveal-line], [data-reveal-rule], .standard__rule')
      .forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('[data-reveal], [data-reveal-stagger], [data-reveal-line], [data-reveal-rule], .standard__rule')
      .forEach(el => el.classList.add('is-visible'));
  }

  // ─────────────────────────────────────────────────────────────────────
  // Form handler  ·  Web3Forms + mailto fallback
  // ─────────────────────────────────────────────────────────────────────
  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = 'Please complete the required fields.';
        status.className = 'form__status error';
        form.reportValidity();
        return;
      }

      const submitBtn = document.getElementById('submitBtn');
      const submitText = submitBtn.querySelector('span:first-child');
      const originalText = submitText.textContent;

      submitBtn.disabled = true;
      submitText.textContent = 'Transmitting';
      status.textContent = '';
      status.className = 'form__status';

      const data = new FormData(form);
      const firstName = data.get('firstName') || '';
      const lastName  = data.get('lastName') || '';
      const fullName  = `${firstName} ${lastName}`.trim();
      const email     = data.get('email') || '';
      const phone     = data.get('phone') || '(not provided)';
      const nature    = data.get('nature') || '';
      const context   = data.get('context') || '';
      const ref       = data.get('reference') || sessionRef;

      const message =
        `NEW INQUIRY  ·  ${ref}\n` +
        `Source: ninthprotocol.eu\n\n` +
        `─────────────────────────────────────────\n` +
        `Name:      ${fullName}\n` +
        `Email:     ${email}\n` +
        `Phone:     ${phone}\n` +
        `Category:  ${nature}\n` +
        `Reference: ${ref}\n` +
        `─────────────────────────────────────────\n\n` +
        `BRIEF CONTEXT\n\n${context}\n\n` +
        `─────────────────────────────────────────\n` +
        `Submitted: ${new Date().toUTCString()}\n`;

      data.set('message', message);
      data.set('replyto', email);
      data.set('subject', `New Inquiry — ${nature} — ${fullName} — ${ref}`);

      const accessKey = data.get('access_key');

      // mailto fallback
      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const subject = encodeURIComponent(`New Inquiry — ${nature} — ${fullName} — ${ref}`);
        const body = encodeURIComponent(message);
        window.location.href = `mailto:JRughooputh@ninthprotocol.eu?subject=${subject}&body=${body}`;

        status.textContent = `Opening your email client. Reference: ${ref}`;
        status.className = 'form__status success';
        submitBtn.disabled = false;
        submitText.textContent = originalText;
        return;
      }

      // Web3Forms
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });
        const result = await response.json();

        if (result.success) {
          status.textContent = `Inquiry received. Reference ${ref}. We will respond within 24 hours.`;
          status.className = 'form__status success';
          form.reset();
          const newRef = generateReference();
          if (formRefInput) formRefInput.value = newRef;
          const refDisplay = document.getElementById('formRefDisplay');
          if (refDisplay) refDisplay.textContent = newRef;
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        console.error('Form error:', err);
        status.textContent = 'Submission failed. Please email JRughooputh@ninthprotocol.eu directly.';
        status.className = 'form__status error';
      } finally {
        submitBtn.disabled = false;
        submitText.textContent = originalText;
      }
    });
  }

})();
