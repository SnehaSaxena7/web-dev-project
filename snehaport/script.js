/* ============================================================
   script.js — Portfolio Website JavaScript
   Sneha Saxena | MCA I Year | COER University | 2025–2027
   ============================================================ */

// ===== 1. NAVIGATION: scroll spy + navbar shrink =====
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');
const backTopBtn = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Shrink navbar on scroll
  navbar.classList.toggle('scrolled', scrollY > 60);

  // Back-to-top visibility
  backTopBtn.classList.toggle('visible', scrollY > 400);

  // Scroll spy — highlight active nav link
  let currentSection = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 100) {
      currentSection = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

// ===== 2. HAMBURGER MENU =====
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksMenu.classList.toggle('open');
});

// Close menu on link click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksMenu.classList.remove('open');
  });
});

// ===== 3. BACK TO TOP =====
backTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 4. TYPING EFFECT =====
const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'MCA Student', 'Problem Solver'];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex--);
  } else {
    typingEl.textContent = current.substring(0, charIndex++);
  }

  let delay = isDeleting ? 60 : 120;

  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    delay = 1500; // pause before deleting
  } else if (isDeleting && charIndex < 0) {
    isDeleting = false;
    charIndex = 0;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

// ===== 5. SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.about-grid, .skills-grid, .project-card, .contact-grid, .section-header'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== 6. SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== 7. PROJECTS DATA & DYNAMIC RENDER =====
const projects = [
  {
    emoji: '☁️',
    bg: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    title: 'Weather Website',
    description: 'A real-time weather forecast application using OpenWeatherMap API with a clean, beautiful UI showing temperature, humidity, and wind data.',
    tags: [{ label: 'HTML', bg: '#e8f4fd', color: '#1976d2' }, { label: 'CSS', bg: '#fce4ec', color: '#c62828' }, { label: 'JS', bg: '#fff8e1', color: '#f57f17' }, { label: 'API', bg: '#f3e5f5', color: '#7b1fa2' }],
    live: '#', code: 'https://github.com/SnehaSaxena7'
  },
  {
    emoji: '💰',
    bg: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    title: 'Expense Tracker',
    description: 'A personal finance management tool to track income and expenses with category-wise summaries, charts, and local storage persistence.',
    tags: [{ label: 'HTML', bg: '#e8f4fd', color: '#1976d2' }, { label: 'CSS', bg: '#fce4ec', color: '#c62828' }, { label: 'JS', bg: '#fff8e1', color: '#f57f17' }],
    live: '#', code: 'https://github.com/SnehaSaxena7'
  },
  {
    emoji: '☕',
    bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
    title: 'Café Website',
    description: 'A fully dynamic café website with menu management, online reservations, and an admin panel — built with PHP and MySQL database integration.',
    tags: [{ label: 'PHP', bg: '#e8f4fd', color: '#1565c0' }, { label: 'MySQL', bg: '#fce4ec', color: '#b71c1c' }, { label: 'HTML', bg: '#e8f5e9', color: '#2e7d32' }, { label: 'CSS', bg: '#fff8e1', color: '#f57f17' }],
    live: '#', code: 'https://github.com/SnehaSaxena7'
  }
];

const grid = document.getElementById('projectsGrid');
projects.forEach((proj, i) => {
  const card = document.createElement('div');
  card.classList.add('project-card', 'reveal');
  card.style.animationDelay = `${i * 0.1}s`;

  const tagsHTML = proj.tags.map(t =>
    `<span class="project-tag-item" style="background:${t.bg};color:${t.color}">${t.label}</span>`
  ).join('');

  card.innerHTML = `
    <div class="project-thumb" style="background:${proj.bg}">
      <span>${proj.emoji}</span>
    </div>
    <div class="project-body">
      <div class="project-tags">${tagsHTML}</div>
      <h3>${proj.title}</h3>
      <p>${proj.description}</p>
      <div class="project-links">
        <a href="${proj.live}" class="proj-link">🔗 Live Demo</a>
        <a href="${proj.code}" class="proj-link" target="_blank">💻 Source</a>
      </div>
    </div>
  `;
  grid.appendChild(card);
  revealObserver.observe(card);
});

// ===== 8. CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

/**
 * Validate a single field
 * @param {string} fieldId - Input element ID
 * @param {string} errorId  - Error span ID
 * @param {RegExp|null} pattern - Optional regex pattern
 * @param {string} errorMsg - Error message to show
 * @returns {boolean}
 */
function validateField(fieldId, errorId, pattern, errorMsg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  const value = field.value.trim();

  if (!value) {
    field.classList.add('invalid');
    error.textContent = 'This field is required.';
    return false;
  }
  if (pattern && !pattern.test(value)) {
    field.classList.add('invalid');
    error.textContent = errorMsg;
    return false;
  }
  field.classList.remove('invalid');
  error.textContent = '';
  return true;
}

// Clear invalid state on input
['cf-name', 'cf-email', 'cf-subject', 'cf-message'].forEach(id => {
  document.getElementById(id).addEventListener('input', () => {
    document.getElementById(id).classList.remove('invalid');
  });
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  // Validate all fields
  const nameOk    = validateField('cf-name', 'err-name', null, '');
  const emailOk   = validateField('cf-email', 'err-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.');
  const subjectOk = validateField('cf-subject', 'err-subject', null, '');
  const msgOk     = validateField('cf-message', 'err-message', null, '');

  if (nameOk && emailOk && subjectOk && msgOk) {
    // Show success message
    formSuccess.classList.add('show');
    contactForm.reset();
    // Hide success message after 5 seconds
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }
});

// ===== 9. SMOOTH SCROLL for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('Portfolio JS loaded ✅ | Sneha Saxena | COER University | MCA 2025–2027');
