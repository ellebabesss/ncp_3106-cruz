// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = '0.2s';
                entry.target.style.animationDuration = '0.8s';
                entry.target.style.animationFillMode = 'both';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all section content
    const sectionContents = document.querySelectorAll('.section-content');
    sectionContents.forEach(content => {
        observer.observe(content);
    });
    
    // Add parallax effect to decorative elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.doodle, .decorative-shapes');
        
        parallaxElements.forEach(element => {
            const speed = 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Letter cutout hover effects
    const letterCutouts = document.querySelectorAll('.letter-cutout');
    
    letterCutouts.forEach((letter, index) => {
        letter.addEventListener('mouseenter', function() {
            this.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(1.1)`;
            this.style.transition = 'transform 0.3s ease';
        });
        
        letter.addEventListener('mouseleave', function() {
            const originalRotation = this.style.getPropertyValue('--rotation') || '0deg';
            this.style.transform = `rotate(${originalRotation}) scale(1)`;
        });
    });
    
    // Photo frame hover effects
    const photoFrames = document.querySelectorAll('.photo-frame');
    
    photoFrames.forEach(frame => {
        frame.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        frame.addEventListener('mouseleave', function() {
            const originalRotation = this.style.getPropertyValue('--rotation') || '0deg';
            this.style.transform = `rotate(${originalRotation}) scale(1)`;
        });
    });
    
    // Social link animations
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.1)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            const originalRotation = this.style.getPropertyValue('--rotation') || '0deg';
            this.style.transform = `rotate(${originalRotation}) scale(1)`;
            this.style.boxShadow = 'none';
        });
    });
    
    // Add random floating animation to doodles
    const doodles = document.querySelectorAll('.doodle');
    
    doodles.forEach((doodle, index) => {
        // Random delay for each doodle
        const delay = Math.random() * 2;
        doodle.style.animationDelay = `${delay}s`;
        doodle.style.animation = `float 3s ease-in-out infinite`;
    });
    
    // Typing effect for the main heading (optional enhancement)
    function typeEffect(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function typeChar() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        }
        
        typeChar();
    }
    
    // Add some CSS for the active nav link
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: #ff6b6b !important;
            font-weight: bold;
            transform: rotate(-2deg) scale(1.1);
        }
        
        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 3px;
            background: #ff6b6b;
            border-radius: 2px;
        }
    `;
    document.head.appendChild(style);
    
    // Mobile menu close on link click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Performance optimization: throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Apply throttling to scroll events
    window.removeEventListener('scroll', highlightNavigation);
    window.addEventListener('scroll', throttle(highlightNavigation, 100));
});

// Add some fun easter eggs
document.addEventListener('keydown', function(e) {
    // Konami code easter egg (up, up, down, down, left, right, left, right, b, a)
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
                konamiIndex = 0;
            }, 2000);
        }
    } else {
        konamiIndex = 0;
    }
});

// Add rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);