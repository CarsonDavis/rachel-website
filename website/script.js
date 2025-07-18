document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('id');
                const currentNavLink = document.querySelector(`a[href="#${currentSection}"]`);
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current nav link
                if (currentNavLink) {
                    currentNavLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Header background on scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class for styling
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Scroll animations for cards
    const animatedElements = document.querySelectorAll('.research-card, .publication-item, .skill-category, .contact-item');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initially hide elements
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }

    // Interactive hover effects for research cards
    const researchCards = document.querySelectorAll('.research-card');
    researchCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Email copy functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(function() {
                    showNotification('Email copied to clipboard!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('Email copied to clipboard!');
            }
        });
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Form validation (if contact form is added later)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Theme toggle (could be added as an enhancement)
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Skill modal functionality
    const skillModal = document.getElementById('skillModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalLinks = document.getElementById('modalLinks');
    const modalClose = document.querySelector('.modal-close');
    const skillItems = document.querySelectorAll('.skill-item');

    // Skill data is now managed centrally in config.js

    // Add click event listeners to skill items
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            const skillKey = this.getAttribute('data-skill');
            const skillInfo = ConfigUtils.generateSkillModalContent(skillKey);
            
            if (skillInfo) {
                showSkillModal(skillInfo);
            }
        });
    });

    // Show skill modal
    function showSkillModal(skillInfo) {
        modalTitle.textContent = skillInfo.title;
        modalDescription.textContent = skillInfo.description;
        
        // Create links HTML
        let linksHTML = '<div class="skill-links">';
        skillInfo.links.forEach(link => {
            linksHTML += `
                <div class="skill-link-item">
                    <div class="skill-link-title">${link.title}</div>
                    <div class="skill-link-meta">${link.meta}</div>
                    <div class="skill-link-description">${link.description}</div>
                    <a href="${link.url}" target="_blank" class="skill-link-url">View Publication</a>
                </div>
            `;
        });
        linksHTML += '</div>';
        
        modalLinks.innerHTML = linksHTML;
        skillModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close modal
    modalClose.addEventListener('click', function() {
        skillModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === skillModal) {
            skillModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && skillModal.style.display === 'block') {
            skillModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Initialize dynamic content from config.js
    if (typeof ConfigUtils !== 'undefined') {
        ConfigUtils.initializeDynamicContent();
    }
});