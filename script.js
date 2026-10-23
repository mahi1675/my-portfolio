/**
 * script.js — Mahlet Getnet Portfolio
 *
 * Features:
 *  1. Sticky nav shadow on scroll
 *  2. Active nav link highlight based on current section
 *  3. Mobile hamburger menu toggle
 *  4. Scroll-reveal animation for sections
 *  5. Back-to-top button
 *  6. Contact form — client-side validation + friendly feedback
 */

/* ── 1. STICKY HEADER SHADOW ── */
const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ── 2. ACTIVE NAV LINK ── */
const sections  = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

// Highlight the nav link whose section is currently in view
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' } // trigger when section is roughly in the middle
);

sections.forEach((section) => sectionObserver.observe(section));

/* ── 3. HAMBURGER MENU ── */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when a nav link is clicked (nice on mobile)
navMenu.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ── 4. SCROLL-REVEAL ANIMATION ── */
// Add the 'reveal' class to anything we want to animate in
const revealTargets = [
  '.section-label',
  '.section-title',
  '.section-subtitle',
  '.about-text',
  '.about-cards',
  '.skill-card',
  '.project-card',
  '.contact-info',
  '.contact-form',
  '.hero-content',
  '.hero-visual',
];

revealTargets.forEach((selector) => {
  document.querySelectorAll(selector).forEach((el) => {
    el.classList.add('reveal');
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ── 5. BACK-TO-TOP BUTTON ── */
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── 6. CONTACT FORM — CLIENT-SIDE VALIDATION ── */
const contactForm = document.getElementById('contact-form');
const formStatus  = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent actual submission (no backend yet)

  const name    = document.getElementById('contact-name').value.trim();
  const email   = document.getElementById('contact-email-field').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  // Simple validation
  if (!name || !email || !message) {
    formStatus.textContent = '⚠️ Please fill in all fields.';
    formStatus.style.color = '#f87171';
    return;
  }

  // Basic email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    formStatus.textContent = '⚠️ Please enter a valid email address.';
    formStatus.style.color = '#f87171';
    return;
  }

  // Success feedback (no real email is sent — add a backend or Formspree later)
  formStatus.textContent = '✅ Message received! (Note: add a backend or Formspree to actually send emails.)';
  formStatus.style.color = '#34d399';
  contactForm.reset();
});
