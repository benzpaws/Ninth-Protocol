/* ═══════════════════════════════════════════════════════════════════════
   NINTH PROTOCOL — Interactions & Form Handling
   ═══════════════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ─── Set current year in footer ───
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ─── Smooth scroll for in-page anchors ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const topBarHeight = 60;
        const top = target.getBoundingClientRect().top + window.pageYOffset - topBarHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─── Reveal-on-scroll for sections ───
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.section, .pullquote, .definition, .closing, .form-section')
      .forEach(el => observer.observe(el));
  }

  // ─── Form submission handler ───
  const form = document.getElementById('inquiry-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      // Basic native validation
      if (!form.checkValidity()) {
        status.textContent = 'Please complete the required fields.';
        status.className = 'form__status error';
        form.reportValidity();
        return;
      }

      const submitButton = form.querySelector('.form__submit');
      const originalLabel = submitButton.querySelector('span:first-child').textContent;

      submitButton.disabled = true;
      submitButton.querySelector('span:first-child').textContent = 'Sending';
      status.textContent = '';
      status.className = 'form__status';

      const formData = new FormData(form);
      const accessKey = formData.get('access_key');

      // Compose a structured message for the email body
      const firstName = formData.get('firstName') || '';
      const lastName = formData.get('lastName') || '';
      const fullName = `${firstName} ${lastName}`.trim();
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '(not provided)';
      const nature = formData.get('nature') || '';
      const context = formData.get('context') || '';

      const message =
        `New inquiry received via ninthprotocol.eu\n\n` +
        `─────────────────────────────────────────\n` +
        `Name:      ${fullName}\n` +
        `Email:     ${email}\n` +
        `Phone:     ${phone}\n` +
        `Category:  ${nature}\n` +
        `─────────────────────────────────────────\n\n` +
        `BRIEF CONTEXT\n\n${context}\n\n` +
        `─────────────────────────────────────────\n` +
        `Submitted: ${new Date().toLocaleString('en-GB', { timeZone: 'UTC', timeZoneName: 'short' })}`;

      formData.set('message', message);
      formData.set('replyto', email);

      // ─── If no access key is configured, use mailto: fallback ───
      if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const subject = encodeURIComponent(`New Inquiry — ${nature} — ${fullName}`);
        const body = encodeURIComponent(message);
        window.location.href = `mailto:JRughooputh@ninthprotocol.eu?subject=${subject}&body=${body}`;

        status.textContent = 'Opening your email client. Please send the message to complete your inquiry.';
        status.className = 'form__status success';
        submitButton.disabled = false;
        submitButton.querySelector('span:first-child').textContent = originalLabel;
        return;
      }

      // ─── Send via Web3Forms ───
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          status.textContent = 'Inquiry received. We will respond within 24 hours.';
          status.className = 'form__status success';
          form.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.error('Form error:', err);
        status.textContent = 'Submission failed. Please email JRughooputh@ninthprotocol.eu directly.';
        status.className = 'form__status error';
      } finally {
        submitButton.disabled = false;
        submitButton.querySelector('span:first-child').textContent = originalLabel;
      }
    });
  }
})();
