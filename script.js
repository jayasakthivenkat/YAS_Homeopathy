const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const tsliderTrack = document.getElementById('tsliderTrack');
const tPrev = document.getElementById('tPrev');
const tNext = document.getElementById('tNext');
const tDots = document.getElementById('tDots');
const faqItems = document.querySelectorAll('.faq-item');
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .animate-fadein, .animate-slideup');
const counters = document.querySelectorAll('[data-target]');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const navLinksList = document.querySelectorAll('.nav-link');

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.tcard');
const testimonialCount = testimonialCards.length;

function toggleMenu() {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
}

hamburger.addEventListener('click', toggleMenu);
navLinksList.forEach(link => link.addEventListener('click', () => {
  if (navLinks.classList.contains('open')) {
    toggleMenu();
  }
}));

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  navbar.classList.toggle('active', scrolled > 20);
  scrollTopBtn.style.display = scrolled > 520 ? 'grid' : 'none';
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleFormSubmit(event) {
  event.preventDefault();
  formSuccess.style.display = 'block';
  contactForm.reset();
  contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

if (contactForm) {
  contactForm.addEventListener('submit', handleFormSubmit);
}

function activateRevealOnScroll() {
  const revealPoint = window.innerHeight * 0.85;
  revealElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < revealPoint) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('load', () => {
  activateRevealOnScroll();
  createTestimonialDots();
  updateTestimonial();
  animateCounters();
});

window.addEventListener('scroll', activateRevealOnScroll);

function animateCounters() {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.dataset.target;
      const value = +counter.innerText;
      const speed = 45;
      const increment = Math.ceil(target / speed);
      if (value < target) {
        counter.innerText = value + increment;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(counter);
  });
}

function createTestimonialDots() {
  for (let i = 0; i < testimonialCount; i += 1) {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.classList.add('tdot');
    dot.addEventListener('click', () => {
      currentTestimonial = i;
      updateTestimonial();
    });
    tDots.appendChild(dot);
  }
}

function updateTestimonial() {
  const trackWidth = testimonialCards[0].offsetWidth + 24;
  tsliderTrack.style.transform = `translateX(-${currentTestimonial * trackWidth}px)`;
  const dots = tDots.querySelectorAll('button');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentTestimonial);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialCount;
  updateTestimonial();
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonialCount) % testimonialCount;
  updateTestimonial();
}

if (tNext && tPrev) {
  tNext.addEventListener('click', nextTestimonial);
  tPrev.addEventListener('click', prevTestimonial);
}

setInterval(() => {
  nextTestimonial();
}, 7000);

function toggleFaq(id) {
  const faq = document.getElementById(id);
  if (!faq) return;
  const isOpen = faq.classList.contains('open');
  faqItems.forEach(item => item.classList.remove('open'));
  if (!isOpen) {
    faq.classList.add('open');
    faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'true');
  } else {
    faq.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
  }
}

window.toggleFaq = toggleFaq;
