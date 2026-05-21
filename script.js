/* ═══════════════════════════════════════════════════════════════════════
   NINTH PROTOCOL — Interaction Engine
   The Dossier · Animations · Live Time · Reference Generation
   ═══════════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────
  // Session reference — generate a unique NP-XXXXXX code for this visit
  // ─────────────────────────────────────────────────────────────────────
  function generateReference() {
    // Format: NP-9XXXXX where X is alphanumeric. The leading 9 is the brand motif.
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let ref = 'NP-9';
    for (let i = 0; i < 5; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  }

  const sessionRef = generateReference();

  // Place the reference into every relevant element
  document.querySelectorAll('#sessionRef, #drawerRef, #footerRef, #preloader-ref, #formRefDisplay')
    .forEach(el => { if (el) el.textContent = sessionRef; });

  const formRefInput = document.getElementById('formReference');
  if (formRefInput) formRefInput.value = sessionRef;

  // ─────────────────────────────────────────────────────────────────────
  // Live UTC clock — placed in topbar, drawer, and footer
  // ─────────────────────────────────────────────────────────────────────
  function tickClock() {
    const now = new Date();
    const hh = String(now.getUTCHours()).padStart(2, '0');
    const mm = String(now.getUTCMinutes()).padStart(2, '0');
    const ss = String(now.getUTCSeconds()).padStart(2, '0');
    const time = `${hh}:${mm}:${ss}`;
    const tcEl = document.getElementById('utcClock');
    const dcEl = document.getElementById('drawerClock');
    const fcEl = document.getElementById('footerClock');
    if (tcEl) tcEl.textContent = time;
    if (dcEl) dcEl.textContent = time;
    if (fcEl) fcEl.textContent = `UTC ${time}`;
  }
  tickClock();
  setInterval(tickClock, 1000);

  // ─────────────────────────────────────────────────────────────────────
  // Current year in footer
  // ─────────────────────────────────────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─────────────────────────────────────────────────────────────────────
  // Preloader — show for ~1.8s then dismiss with smooth handoff
  // ─────────────────────────────────────────────────────────────────────
  function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    const statEl = document.getElementById('preloader-stat');
    if (statEl) statEl.textContent = 'READY';
    setTimeout(() => {
      if (preloader) preloader.classList.add('is-done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
      // reveal side index slightly after content begins to appear
      setTimeout(() => {
        const idx = document.getElementById('sideIndex');
        if (idx) idx.classList.add('is-ready');
      }, 400);
    }, 250);
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // skip preloader for reduced motion
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-loaded');
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.classList.add('is-done');
  } else {
    if (document.readyState === 'complete') {
      setTimeout(dismissPreloader, 1800);
    } else {
      window.addEventListener('load', () => setTimeout(dismissPreloader, 1800));
    }
  }

  // ─────────────────────────────────────────────────────────────────────
  // Smooth-scroll anchor handling
  // ─────────────────────────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      // close the mobile drawer if it's open
      const drawer = document.getElementById('drawer');
      if (drawer && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        document.getElementById('menuToggle').classList.remove('is-open');
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
        const offset = 60;
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────────
  // Mobile drawer toggle
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
  // Scroll progress bar
  // ─────────────────────────────────────────────────────────────────────
  const scrollProgress = document.getElementById('scrollProgress');
  let ticking = false;
  function updateProgress() {
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / docHeight;
      scrollProgress.style.transform = `scaleX(${scrolled})`;
    }
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });

  // ─────────────────────────────────────────────────────────────────────
  // Hide top bar on scroll-down, show on scroll-up
  // ─────────────────────────────────────────────────────────────────────
  const topbar = document.querySelector('.topbar');
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
  // Intersection-observer reveals
  // ─────────────────────────────────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal-on-scroll, .tenet, .rule-draw, .closing__rule')
      .forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal-on-scroll, .tenet, .rule-draw, .closing__rule')
      .forEach(el => el.classList.add('is-visible'));
  }

  // ─────────────────────────────────────────────────────────────────────
  // Side-index highlighter (desktop)
  // ─────────────────────────────────────────────────────────────────────
  const sideIndex = document.getElementById('sideIndex');
  if (sideIndex && 'IntersectionObserver' in window) {
    const sections = document.querySelectorAll('[data-section]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.section;
          sideIndex.querySelectorAll('li').forEach(li => {
            li.classList.toggle('is-active', li.dataset.target === id);
          });
        }
      });
    }, { threshold: 0, rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => sectionObserver.observe(s));
  }

  // ─────────────────────────────────────────────────────────────────────
  // Subtle parallax on the hero monogram
  // ─────────────────────────────────────────────────────────────────────
  const heroMonogram = document.querySelector('.hero__bg-monogram');
  if (heroMonogram && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let parallaxTicking = false;
    function updateParallax() {
      const y = window.scrollY;
      const heroHeight = window.innerHeight;
      if (y < heroHeight) {
        const translate = y * 0.25;
        const scale = 1 + y * 0.0003;
        heroMonogram.style.transform = `translateY(${translate}px) scale(${scale})`;
      }
      parallaxTicking = false;
    }
    window.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        requestAnimationFrame(updateParallax);
        parallaxTicking = true;
      }
    }, { passive: true });
  }

  // ─────────────────────────────────────────────────────────────────────
  // Custom cursor + magnetic effect (desktop only)
  // ─────────────────────────────────────────────────────────────────────
  const cursor = document.getElementById('cursor');
  const isDesktop = window.matchMedia('(hover: hover) and (min-width: 1025px)').matches;

  if (cursor && isDesktop) {
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let ringX = cursorX;
    let ringY = cursorY;
    let dotX = cursorX;
    let dotY = cursorY;
    let cursorVisible = false;
    let hoveredMagnetic = null;
    let magneticX = 0, magneticY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      if (!cursorVisible) {
        cursor.classList.add('is-visible');
        cursorVisible = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-visible');
      cursorVisible = false;
    });

    // Magnetic effect: any element with data-magnetic gets pulled
    const magneticEls = document.querySelectorAll('[data-magnetic]');
    magneticEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        hoveredMagnetic = el;
        cursor.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', () => {
        hoveredMagnetic = null;
        cursor.classList.remove('is-hovering');
        el.style.transform = '';
      });
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.18;
        const dy = (e.clientY - cy) * 0.18;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    });

    // Hover state on any interactive element (links, buttons, inputs)
    document.querySelectorAll('a, button, input, select, textarea').forEach(el => {
      if (!el.hasAttribute('data-magnetic')) {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
      }
    });

    function animateCursor() {
      // Dot follows the actual cursor closely
      dotX += (cursorX - dotX) * 0.6;
      dotY += (cursorY - dotY) * 0.6;
      // Ring trails slightly behind
      ringX += (cursorX - ringX) * 0.18;
      ringY += (cursorY - ringY) * 0.18;
      const dot = cursor.querySelector('.cursor__dot');
      const ring = cursor.querySelector('.cursor__ring');
      if (dot) dot.style.transform = `translate(${dotX}px, ${dotY}px)`;
      if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);
  }

  // ─────────────────────────────────────────────────────────────────────
  // Form handling — Web3Forms primary, mailto fallback
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
      submitText.textContent = 'Transmitting';
      status.textContent = '';
      status.className = 'form__status';

      const data = new FormData(form);
      const firstName = data.get('firstName') || '';
      const lastName = data.get('lastName') || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const email = data.get('email') || '';
      const phone = data.get('phone') || '(not provided)';
      const nature = data.get('nature') || '';
      const context = data.get('context') || '';
      const ref = data.get('reference') || sessionRef;

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

      // mailto fallback if no Web3Forms key configured
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

      // Web3Forms submission
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
          // Refresh the form reference for the next submission
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

  // ─────────────────────────────────────────────────────────────────────
  // Defensive: if the user lands deep on a fragment, ensure preloader still dismisses
  // ─────────────────────────────────────────────────────────────────────
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('is-done')) {
      preloader.classList.add('is-done');
      document.body.classList.remove('is-loading');
      document.body.classList.add('is-loaded');
    }
  }, 4000);

})();
