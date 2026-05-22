/* ═══════════════════════════════════════════════════════════════════════
   NINTH PROTOCOL  ·  Interaction Engine
   Bidirectional reveal animations · Parallax · Form handler
   ═══════════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─────────────────────────────────────────────────────────────────────
  // Session reference  ·  NP-9XXXXX
  // ─────────────────────────────────────────────────────────────────────
  function generateReference() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ref = 'NP-9';
    for (let i = 0; i < 5; i++) ref += chars[Math.floor(Math.random() * chars.length)];
    return ref;
  }

  const sessionRef = generateReference();
  ['formRefDisplay'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = sessionRef;
  });
  const formRefInput = document.getElementById('formReference');
  if (formRefInput) formRefInput.value = sessionRef;

  // ─────────────────────────────────────────────────────────────────────
  // Year in footer
  // ─────────────────────────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─────────────────────────────────────────────────────────────────────
  // Preloader
  // ─────────────────────────────────────────────────────────────────────
  function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
  }

  if (reducedMotion) {
    dismissPreloader();
  } else if (document.readyState === 'complete') {
    setTimeout(dismissPreloader, 1900);
  } else {
    window.addEventListener('load', () => setTimeout(dismissPreloader, 1900));
  }
  setTimeout(dismissPreloader, 4000);  // defensive

  // ─────────────────────────────────────────────────────────────────────
  // Smooth anchor scroll
  // ─────────────────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;

      const drawer = document.getElementById('drawer');
      if (drawer && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        document.getElementById('menuToggle').classList.remove('is-open');
        document.body.classList.remove('menu-open');
      }

      if (id === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.pageYOffset - 70;
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

  function updateScroll() {
    const y = window.scrollY;

    if (scrollProgress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.transform = `scaleX(${y / Math.max(max, 1)})`;
    }

    // Topbar hide/show
    if (topbar) {
      if (y > 200 && y > lastY + 8) {
        topbar.classList.add('is-hidden');
      } else if (y < lastY - 8 || y < 100) {
        topbar.classList.remove('is-hidden');
      }
    }

    // Parallax for background marks
    parallaxEls.forEach(({ el, factor, baseTop }) => {
      const rect = el.parentElement.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * factor * -1;
      el.style.setProperty('--parallax-y', offset.toFixed(1));
    });

    lastY = y;
    scrollTicking = false;
  }

  let lastY = window.scrollY;
  const topbar = document.getElementById('topbar');
  const parallaxEls = [
    ...document.querySelectorAll('.hero__bg-mark, .contact__bg-mark')
  ].map(el => ({ el, factor: 0.15, baseTop: 0 }));

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateScroll);
      scrollTicking = true;
    }
  }, { passive: true });

  // ─────────────────────────────────────────────────────────────────────
  // BIDIRECTIONAL REVEAL ENGINE
  // ─────────────────────────────────────────────────────────────────────
  // Each [data-anim] element gets one of three states based on its
  // position relative to the viewport:
  //   .is-in        — element is currently visible
  //   .is-out-down  — element is below the viewport (waiting to enter)
  //   .is-out-up    — element has been scrolled past going up
  //
  // The transitions look right both when scrolling DOWN AND scrolling UP.
  // ─────────────────────────────────────────────────────────────────────

  const animEls = Array.from(document.querySelectorAll('[data-anim]'));

  if (!reducedMotion && 'IntersectionObserver' in window) {

    // Initial state — everything not in view is "out-down"
    animEls.forEach(el => el.classList.add('is-out-down'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        const rect = entry.boundingClientRect;

        if (entry.isIntersecting) {
          // Element is in view — mark in
          el.classList.remove('is-out-up', 'is-out-down');
          el.classList.add('is-in');
        } else {
          // Element has left the viewport — figure out which way
          el.classList.remove('is-in');
          if (rect.top < 0) {
            // exited above
            el.classList.add('is-out-up');
            el.classList.remove('is-out-down');
          } else {
            // exited below
            el.classList.add('is-out-down');
            el.classList.remove('is-out-up');
          }
        }
      });
    }, {
      threshold: [0, 0.05, 0.1],
      rootMargin: '-5% 0px -5% 0px'
    });

    animEls.forEach(el => observer.observe(el));

  } else {
    // Reduced motion or no IO support — show everything immediately
    animEls.forEach(el => el.classList.add('is-in'));
  }

  // ─────────────────────────────────────────────────────────────────────
  // FORM HANDLER  ·  Web3Forms + mailto fallback
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
      const submitText = submitBtn.querySelector('.btn__text');
      const originalText = submitText.textContent;

      submitBtn.disabled = true;
      submitText.textContent = 'Sending';
      status.textContent = '';
      status.className = 'form__status';

      const data = new FormData(form);
      const firstName = data.get('firstName') || '';
      const lastName = data.get('lastName') || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const email = data.get('email') || '';
      const nature = data.get('nature') || '';
      const context = data.get('context') || '';
      const ref = data.get('reference') || sessionRef;

      const message =
        `NEW INQUIRY  ·  ${ref}\n` +
        `Source: ninthprotocol.eu\n\n` +
        `─────────────────────────────────────────\n` +
        `Name:      ${fullName}\n` +
        `Email:     ${email}\n` +
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
