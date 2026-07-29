// Loading screen removed

// Particle Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(18, 247, 255, ${Math.random() * 0.5 + 0.2})`;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Connect particles
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                ctx.strokeStyle = `rgba(18, 247, 255, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// Menu Toggle
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Active Navigation Link on Scroll
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () =>{
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
    
    // Scroll to Top Button
    let scrollTop = document.querySelector('.scroll-top');
    if(window.scrollY > 300){
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
    
    // Active Nav Link
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        
        if(top >= offset && top < offset + height){
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
        }
    });
}

// Typed JS for Multiple Text Animation
const typed = new Typed( '.multiple-text',{
    strings: ['Web Developer', 'Willing to Learn', 'Creative Thinker'],
    typeSpeed:80,
    backSpeed:80,
    backDelay: 1200,
    loop: true,
});

// Smooth Scroll for All Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if(contactForm){
    contactForm.addEventListener('submit', function(e){
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            fullname: formData.get('fullname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitBtn = this.querySelector('input[type="submit"]');
        const originalBtnValue = submitBtn.value;
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate sending (you can integrate with EmailJS or backend here)
        setTimeout(() => {
            // Show success message with better styling
            showNotification(`Thank you, ${data.fullname}! 🎉\n\nYour message has been received.\nWe'll get back to you at ${data.email} soon!`, 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.value = originalBtnValue;
            submitBtn.disabled = false;
            
            // Log to console for development
            console.log('Form submitted:', data);
        }, 1500);
    });
}

// Custom Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}'></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Skills Animation on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const skillsObserver = new IntersectionObserver(function(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const skillBars = entry.target.querySelectorAll('.skills-bar span');
            skillBars.forEach(bar => {
                bar.style.animation = 'skills-bar 1.5s ease-in-out forwards';
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if(skillsSection){
    skillsObserver.observe(skillsSection);
}

// Initialize on page load
window.addEventListener('load', function(){
    // Remove any loading classes
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const homeSection = document.querySelector('.home');
    if(homeSection){
        homeSection.style.opacity = '1';
    }
    
    // Initialize skill bars animation
    animateSkillBars();
    
    // Add cursor trail effect
    initCursorTrail();
});

// Cursor Trail Effect
function initCursorTrail() {
    let cursorTrail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        
        cursorTrail.push(trail);
        
        if (cursorTrail.length > trailLength) {
            const oldTrail = cursorTrail.shift();
            oldTrail.remove();
        }
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    });
}

// Enhanced Skill Bars Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skills-bar span');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s ease-in-out';
            }, 100);
        }, index * 100);
    });
}

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.home-img, .about-img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to project cards
document.querySelectorAll('.portfolio-box').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing sound effect (optional - can be enabled)
function typeWithSound(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Image lazy loading with fade-in effect
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.src = img.dataset.src || img.src;
                img.style.transition = 'opacity 0.5s ease';
                img.onload = () => {
                    img.style.opacity = '1';
                };
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active class to current page navigation
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.navbar a');
menuItems.forEach(item => {
    if(item.href === currentLocation){
        item.classList.add('active');
    }
});

// Back to Top Button Enhanced
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => ripple.remove(), 600);
    });
});
// Download CV Button - Download Existing File
const downloadCVBtn = document.getElementById('downloadCVBtn');

if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        // Show loading notification
        showNotification('Preparing your CV... ⏳', 'success');

        // Path to your uploaded CV file
        const cvFilePath = 'Lapaz CV.pdf';

        // Keep the same function structure
        downloadCV(cvFilePath);
    });
}

function downloadCV(filePath) {
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = filePath;

    // Optional: set the downloaded filename
    link.download = 'Lapaz CV.pdf';

    // Append, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show success notification
    showNotification(' downloaded successfully! ✅', 'success');
}