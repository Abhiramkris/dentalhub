import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Active Navigation Highlight on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-brand-accent', 'border-b-2', 'border-brand-accent');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-brand-accent', 'border-b-2', 'border-brand-accent');
      }
    });
  });

  // Simple Booking Submission handler
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const gender = document.getElementById('booking-gender').value;
      const doctor = document.getElementById('booking-doctor').value;
      const department = document.getElementById('booking-department').value;
      const name = document.getElementById('booking-name').value;
      const phone = document.getElementById('booking-phone').value;
      const date = document.getElementById('booking-date').value;

      if (!name || !phone || !date) {
        alert('Please fill in your name, phone number, and preferred date.');
        return;
      }

      alert(`Thank you, ${name}. Your appointment request for ${date} with ${doctor} (${department}) has been submitted. Our team will call you at ${phone} to confirm.`);
      bookingForm.reset();
    });
  }

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
