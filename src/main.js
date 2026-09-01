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

  // Booking Submission handler
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const gender = document.getElementById('booking-gender').value;
      const doctor = document.getElementById('booking-doctor').value;
      const department = document.getElementById('booking-department').value;
      const name = document.getElementById('booking-name').value;
      const phone = document.getElementById('booking-phone').value;
      const email = document.getElementById('booking-email').value;
      const date = document.getElementById('booking-date').value;

      if (!name || !phone || !email || !date) {
        alert('Please fill in all required fields.');
        return;
      }

      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Submitting Request...';
      submitBtn.disabled = true;

      const messageContent = `Appointment Request Details:
- Selected Department: ${department}
- Selected Specialist: ${doctor}
- Patient Gender: ${gender}
- Preferred Appointment Date: ${date}
- Contact Phone: ${phone}
- Patient Email: ${email}`;

      fetch('https://bloggfeature.certifyied.workers.dev/adminApiBlog/api/contact?projectId=4d6b3045-f228-4ed2-b400-6496d0095dcd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sender_name: name,
          sender_email: email,
          phone_number: phone,
          subject: `Dental Hub Appointment - ${name}`,
          message: messageContent
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit');
        }
        return response.json();
      })
      .then(data => {
        alert(`Thank you, ${name}. Your appointment request for ${date} has been submitted successfully. Our team will contact you soon.`);
        bookingForm.reset();
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('There was a problem submitting your request. Please try again or call us directly.');
      })
      .finally(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
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

  // Screen-Filling Scroll Expansion Section
  const expandSection = document.getElementById('experience-showcase');
  const expandCard = document.getElementById('scroll-expand-card');
  const expandImg = document.getElementById('scroll-expand-img');
  const expandOverlay = document.getElementById('scroll-expand-overlay');
  const expandContent = document.getElementById('scroll-expand-content');

  if (expandSection && expandCard) {
    const handleScrollExpand = () => {
      const rect = expandSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollDistance = rect.height - windowHeight;
      
      if (totalScrollDistance <= 0) return;

      // Progress from 0 (when top hits top of viewport) to 1 (when scrolled through)
      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollDistance, 0), 1);

      // Interpolate width (88% -> 100%), height (65vh -> 100vh), border-radius (28px -> 0px)
      const width = 88 + (progress * 12);
      const height = 65 + (progress * 35);
      const radius = 28 * (1 - progress);
      const imgScale = 1.15 - (progress * 0.15);
      const textTranslateY = (1 - progress) * 15;

      expandCard.style.width = `${width}%`;
      expandCard.style.maxWidth = progress > 0.92 ? '100vw' : '80rem';
      expandCard.style.height = `${height}vh`;
      expandCard.style.borderRadius = `${radius}px`;
      
      if (expandImg) {
        expandImg.style.transform = `scale(${imgScale})`;
      }
      if (expandOverlay) {
        expandOverlay.style.opacity = `${0.5 + (progress * 0.3)}`;
      }
      if (expandContent) {
        expandContent.style.transform = `translateY(${textTranslateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScrollExpand, { passive: true });
    window.addEventListener('resize', handleScrollExpand);
    handleScrollExpand();
  }
});
