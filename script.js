// script.js

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('fa-bars');
    hamburger.classList.toggle('fa-times');
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    darkModeIcon.classList.toggle('fa-moon', !isDark);
    darkModeIcon.classList.toggle('fa-sun', isDark);
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    document.body.style.transition = 'background 0.8s ease, color 0.8s ease';
});

// Efek Tilt pada Kartu Portofolio
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 25,
    speed: 400,
    glare: true,
    'max-glare': 0.5,
    scale: 1.05,
    perspective: 1000
});

// Scroll Halus dan Highlight Nav Aktif
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

navItems.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const offsetTop = targetSection.offsetTop - 100;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('fa-times');
            hamburger.classList.add('fa-bars');
        }
    });
});

const highlightNav = () => {
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navItems.forEach(link => link.classList.remove('active-nav'));
            navLink.classList.add('active-nav');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Animasi Muncul saat Scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('h2, p, .portfolio-card, .contact-form').forEach((el, index) => {
                el.style.animation = `fadeInUp 0.8s ease forwards ${index * 0.2}s`;
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Efek Parallax pada Hero
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    heroSection.style.backgroundPositionY = `${scrollPos * 0.3}px`;
});

// Interaksi Gambar Hero
const imageWrapper = document.querySelector('.image-wrapper');
imageWrapper.addEventListener('mousemove', (e) => {
    const rect = imageWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    imageWrapper.style.transform = `scale(1.08) rotate(6deg) translate(${x * 0.05}px, ${y * 0.05}px)`;
});

imageWrapper.addEventListener('mouseleave', () => {
    imageWrapper.style.transform = 'scale(1.08) rotate(6deg)';
});

// Tombol Scroll to Top
const scrollBtn = document.querySelector('.scroll-to-top-btn');
const scrollPercentage = document.querySelector('.scroll-percentage');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    scrollPercentage.textContent = `${scrollPercent}%`;
    if (scrollTop > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Flip Kartu Portofolio
const portfolioCards = document.querySelectorAll('.portfolio-card');
portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });
});

// Efek Partikel di Hero
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `hsl(${Math.random() * 60 + 20}, 100%, 70%)`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Formulir Kontak
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    console.log('Pesan dikirim:', data);
    alert('Pesan Anda telah dikirim! Terima kasih.');
    contactForm.reset();
});