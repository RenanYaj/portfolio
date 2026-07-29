// Loading screen removed

// Menu Toggle
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Close menu when clicking on links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
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
const typed = new Typed('.multiple-text', {
    strings: ['Web Developer', 'UI/UX Designer', 'Frontend Developer', 'Creative Thinker'],
    typeSpeed: 80,
    backSpeed: 80,
    backDelay: 1200,
    loop: true,
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
        
        // Simulate sending
        setTimeout(() => {
            showNotification(`Thank you, ${data.fullname}! Your message has been received. We'll get back to you soon!`);
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.value = originalBtnValue;
            submitBtn.disabled = false;
            
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

// Skill bars animation on scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const skillBars = entry.target.querySelectorAll('.skill-bar span');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if(skillsSection){
    skillsObserver.observe(skillsSection);
}

// Download CV Button - Generate PDF
const downloadCVBtn = document.getElementById('downloadCVBtn');
if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Show loading notification
        showNotification('Preparing your CV... ⏳', 'success');
        
        // Use jsPDF library to create PDF
        if (typeof window.jspdf === 'undefined') {
            // Load jsPDF library
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            document.head.appendChild(script);
            
            script.onload = () => {
                generatePDF();
            };
        } else {
            generatePDF();
        }
    });
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let yPos = 20;
    
    // Add profile image
    const img = new Image();
    img.src = 'pic/jani.jpg';
    img.crossOrigin = 'Anonymous';
    
    img.onload = function() {
        // Draw rounded square background
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(155, 15, 35, 35, 3, 3, 'F');
        
        // Add image
        doc.addImage(img, 'JPEG', 157, 17, 31, 31, '', 'FAST');
        
        // Draw border
        doc.setDrawColor(18, 247, 255);
        doc.setLineWidth(1.5);
        doc.roundedRect(155, 15, 35, 35, 3, 3, 'S');
        
        // Continue with rest of PDF
        continuePDF();
    };
    
    img.onerror = function() {
        // If image fails to load, continue without it
        continuePDF();
    };
    
    function continuePDF() {
        // Header
        doc.setFontSize(28);
        doc.setTextColor(18, 247, 255);
        doc.text('JHANYN CONCEPCION', 20, yPos);
        
        yPos += 8;
        doc.setLineWidth(0.5);
        doc.setDrawColor(18, 247, 255);
        doc.line(20, yPos, 140, yPos);
        
        yPos += 10;
        
        // Contact Info
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text('Age: 21 years old | Gender: Female', 20, yPos);
        yPos += 6;
        doc.text('Email: jhanynbivasconcepcion@gmail.com', 20, yPos);
        yPos += 6;
        doc.text('Location: Tulunan, North Cotabato', 20, yPos);
        
        yPos += 12;
        
        // Objective
        doc.setFontSize(14);
        doc.setTextColor(18, 247, 255);
        doc.text('OBJECTIVE', 20, yPos);
        yPos += 2;
        doc.setLineWidth(0.3);
        doc.setDrawColor(18, 247, 255);
        doc.line(20, yPos, 60, yPos);
        yPos += 6;
        
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const objectiveText = 'Diploma in Information Technology student passionate about crafting creative and functional websites that bring ideas to life. Motivated to grow my career as a front-end developer while continuously learning modern web technologies.';
        const objectiveLines = doc.splitTextToSize(objectiveText, 170);
        doc.text(objectiveLines, 20, yPos);
        yPos += objectiveLines.length * 5 + 8;
        
        // Education
        doc.setFontSize(14);
        doc.setTextColor(18, 247, 255);
        doc.text('EDUCATION', 20, yPos);
        yPos += 2;
        doc.line(20, yPos, 60, yPos);
        yPos += 6;
        
        // College Education Entry
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text('Davao Del Sur State College', 20, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text('Diploma in Information Technology', 20, yPos);
        yPos += 5;
        doc.text('2023 - Present', 20, yPos);
        yPos += 6;
        const collegeText = 'Currently pursuing a diploma in Information Technology, expanding knowledge in advanced web development, database management, and software engineering principles.';
        const collegeLines = doc.splitTextToSize(collegeText, 170);
        doc.text(collegeLines, 20, yPos);
        yPos += collegeLines.length * 5 + 10;
        
        // Technical Skills
        doc.setFontSize(14);
        doc.setTextColor(18, 247, 255);
        doc.text('TECHNICAL SKILLS', 20, yPos);
        yPos += 2;
        doc.line(20, yPos, 70, yPos);
        yPos += 8;
        
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        const skills = [
            ['HTML5 - 90%', 'MySQL - 78%'],
            ['CSS3 - 85%', 'Responsive Design - 85%'],
            ['JavaScript - 80%', 'Creativity - 88%'],
            ['PHP - 75%', 'UI/UX Design - 82%']
        ];
        
        skills.forEach(skillPair => {
            doc.text('• ' + skillPair[0], 25, yPos);
            if (skillPair[1]) doc.text('• ' + skillPair[1], 110, yPos);
            yPos += 6;
        });
        
        yPos += 6;
        
        // Experience
        doc.setFontSize(14);
        doc.setTextColor(18, 247, 255);
        doc.text('EXPERIENCE', 20, yPos);
        yPos += 2;
        doc.line(20, yPos, 60, yPos);
        yPos += 6;
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text('Freelance Web Designer', 20, yPos);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('(2024 - Present)', 75, yPos);
        yPos += 6;
        
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text('• Designed and developed creative websites for personal and school projects', 25, yPos);
        yPos += 5;
        doc.text('• Focused on responsive layouts and smooth user experiences', 25, yPos);
        yPos += 5;
        doc.text('• Implemented modern design principles with clean, maintainable code', 25, yPos);
        yPos += 8;
        
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text('IT Student Projects', 20, yPos);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(100, 100, 100);
        doc.text('(2023 - Present)', 62, yPos);
        yPos += 6;
        
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text('• Created multiple web development projects showcasing technical skills', 25, yPos);
        yPos += 5;
        doc.text('• Collaborated on team projects and participated in coding challenges', 25, yPos);
        yPos += 10;
        
        // Projects Highlight
        doc.setFontSize(14);
        doc.setTextColor(18, 247, 255);
        doc.text('PROJECTS', 20, yPos);
        yPos += 2;
        doc.line(20, yPos, 55, yPos);
        yPos += 6;
        
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text('• Personal Portfolio Website - Modern, responsive showcase of skills and projects', 25, yPos);
        yPos += 5;
        doc.text('• Interactive Web Applications - Dynamic features using JavaScript and CSS', 25, yPos);
        yPos += 5;
        doc.text('• UI/UX Design Projects - Creative layouts with focus on user experience', 25, yPos);
        
        // Footer
        yPos = 280;
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Generated on ' + new Date().toLocaleDateString(), 20, yPos);
        doc.text('© 2025 Jhanyn Concepcion - Portfolio CV', 105, yPos, { align: 'center' });
        
        // Save the PDF
        doc.save('Jhanyn_Concepcion_CV.pdf');
        
        // Show success notification
        showNotification('CV downloaded successfully! ✅', 'success');
    }
}

// Smooth scroll for all links
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
