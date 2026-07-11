/* ============================================================
   Salary Negotiation Script — page behaviour
   Vanilla JS, no dependencies. Everything degrades gracefully:
   with JS disabled the page is fully readable and FAQ answers
   are reachable via anchor links.
   ============================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     0. Configuration
     Set PDF_URL to the hosted PDF / lead-capture link. While it
     is empty, every download button scrolls to the final CTA
     section instead of navigating nowhere.
     ------------------------------------------------------------ */
  var PDF_URL = ''; // e.g. 'https://your-site.com/salary-negotiation-script.pdf'

  var downloadButtons = document.querySelectorAll('.js-download');
  if (PDF_URL) {
    downloadButtons.forEach(function (btn) {
      btn.setAttribute('href', PDF_URL);
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener');
    });
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------
     1. Header — hairline border appears once the page scrolls
     ------------------------------------------------------------ */
  var header = document.getElementById('site-header');

  function onScrollHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* ------------------------------------------------------------
     2. Scroll-reveal — IntersectionObserver adds .is-visible once
     ------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // No observer support or reduced motion: show everything immediately
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------
     3. FAQ accordion — one open at a time, ARIA kept in sync
     ------------------------------------------------------------ */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq-question');

    button.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------
     4. Sticky mobile CTA — slides in after the hero scrolls away,
     hides again while the final CTA section is on screen
     ------------------------------------------------------------ */
  var stickyCta = document.getElementById('sticky-cta');
  var hero = document.querySelector('.hero');
  var finalCta = document.getElementById('get-script');

  if (stickyCta && hero && finalCta && 'IntersectionObserver' in window) {
    var heroVisible = true;
    var finalVisible = false;

    function updateSticky() {
      var show = !heroVisible && !finalVisible;
      stickyCta.classList.toggle('is-visible', show);
      stickyCta.setAttribute('aria-hidden', String(!show));
      stickyCta.querySelector('.btn').setAttribute('tabindex', show ? '0' : '-1');
    }

    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
      updateSticky();
    }).observe(hero);

    new IntersectionObserver(function (entries) {
      finalVisible = entries[0].isIntersecting;
      updateSticky();
    }).observe(finalCta);
  }
})();
