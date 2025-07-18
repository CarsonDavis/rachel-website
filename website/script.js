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

    // Skill data with papers and references
    const skillData = {
        'mars-simulation': {
            title: 'Mars Simulation Chamber Experiments',
            description: 'Experimental work using specialized chambers to simulate Martian atmospheric conditions, temperature, and pressure for studying salt deliquescence and brine formation.',
            links: [
                {
                    title: 'Experimental constraints on deliquescence of calcium perchlorate mixed with a Mars regolith analog',
                    meta: 'The Planetary Science Journal, 2022 • 9 citations',
                    description: 'Laboratory experiments using Mars simulation chamber to study calcium perchlorate deliquescence in regolith analogs.',
                    url: 'https://iopscience.iop.org/article/10.3847/PSJ/ac75c4'
                },
                {
                    title: 'Experimental Investigation of Deliquescence-Driven Liquid Brine Formation',
                    meta: 'LPSC 2021 Conference Abstract',
                    description: 'Investigation of brine formation processes using controlled Mars-like environmental conditions.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                }
            ]
        },
        'field-analog': {
            title: 'Field Analog Studies',
            description: 'Field research in Earth locations that mimic extraterrestrial environments, providing ground-truth data for understanding planetary processes.',
            links: [
                {
                    title: 'Study of Salt Deliquescence/Efflorescence Cycles in the Atacama Desert',
                    meta: 'AbSciCon 2024 Conference',
                    description: 'Eight-month field study examining real-time salt behavior in Mars analog environment.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                },
                {
                    title: 'Colorado Plateau Mars Analog Investigation',
                    meta: 'Current LPI Research Project',
                    description: 'Multidisciplinary study of igneous intrusions in sulfur-rich sediments as Mars analogs.',
                    url: 'https://www.lpi.usra.edu/features/2023/021423/slank/'
                }
            ]
        },
        'geochemical-modeling': {
            title: 'Geochemical Modeling',
            description: 'Computer modeling of chemical processes and thermodynamic systems to predict salt behavior and brine stability under various planetary conditions.',
            links: [
                {
                    title: 'Thermodynamic modeling of calcium or magnesium chloride, chlorate, and perchlorate ternary mixtures',
                    meta: 'Icarus, 2024 • 3 citations',
                    description: 'Advanced thermodynamic modeling of ternary salt systems at Mars-relevant temperatures.',
                    url: 'https://www.sciencedirect.com/science/article/pii/S0019103523004109'
                },
                {
                    title: 'Chloride, Chlorate, and Perchlorate Ternary Thermodynamic Modeling',
                    meta: 'Brines Workshop 2023',
                    description: 'Modeling work to determine eutonic and deliquescence relative humidities.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                }
            ]
        },
        'deliquescence-analysis': {
            title: 'Deliquescence/Efflorescence Analysis',
            description: 'Specialized analysis of salt water absorption (deliquescence) and crystallization (efflorescence) processes critical for understanding water availability on Mars.',
            links: [
                {
                    title: 'Experimental constraints on deliquescence of calcium perchlorate mixed with a Mars regolith analog',
                    meta: 'The Planetary Science Journal, 2022 • 9 citations',
                    description: 'Primary research on calcium perchlorate deliquescence behavior in Martian conditions.',
                    url: 'https://iopscience.iop.org/article/10.3847/PSJ/ac75c4'
                },
                {
                    title: 'The elusive nature of Martian liquid brines',
                    meta: 'PNAS, 2024 • 4 citations',
                    description: 'High-impact publication on Mars brine formation and stability.',
                    url: 'https://www.pnas.org/doi/10.1073/pnas.2321067121'
                }
            ]
        },
        'thermal-inertia': {
            title: 'Thermal Inertia Analysis',
            description: 'Analysis of thermal properties of planetary surfaces using spacecraft data to identify subsurface features and cavities.',
            links: [
                {
                    title: 'Investigation of lunar subsurface cavities using thermal inertia',
                    meta: 'Master\'s Thesis, UT El Paso, 2016 • 2 citations',
                    description: 'Used Lunar Reconnaissance Orbiter thermal data to identify potential lava tubes.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                },
                {
                    title: 'Investigating Lunar Subsurface Cavities Using Thermal Inertia and Temperature Ratios',
                    meta: 'LPSC 2024 Conference',
                    description: 'Continued work on lunar thermal analysis with improved methodologies.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                }
            ]
        },
        'vnir-spectroscopy': {
            title: 'VNIR Spectroscopy',
            description: 'Visible and Near-Infrared spectroscopy for mineral identification and characterization of geological samples.',
            links: [
                {
                    title: 'Colorado Plateau Research Methodology',
                    meta: 'STI/USRA Profile',
                    description: 'VNIR spectroscopy used for bulk mineralogy analysis in current postdoctoral research.',
                    url: 'https://sti.usra.edu/personnel/rachel-slank-phd/'
                }
            ]
        },
        'xrd': {
            title: 'X-Ray Diffraction (XRD)',
            description: 'X-ray diffraction analysis for precise mineral identification and crystallographic characterization.',
            links: [
                {
                    title: 'Colorado Plateau Research Methodology',
                    meta: 'STI/USRA Profile',
                    description: 'XRD analysis used for detailed mineralogical characterization in hydrothermal dike systems.',
                    url: 'https://sti.usra.edu/personnel/rachel-slank-phd/'
                }
            ]
        },
        'petrographic': {
            title: 'Petrographic Analysis',
            description: 'Microscopic analysis of rock and mineral samples to understand formation processes and alteration histories.',
            links: [
                {
                    title: 'Colorado Plateau Research Methodology',
                    meta: 'STI/USRA Profile',
                    description: 'Petrographic analysis of alteration processes in igneous intrusions and metamorphosed sediments.',
                    url: 'https://sti.usra.edu/personnel/rachel-slank-phd/'
                }
            ]
        },
        'ares-chamber': {
            title: 'Ares Mars Simulation Chamber',
            description: 'Expert operation of the Ares Mars simulation chamber at the University of Arkansas for experimental planetary science research.',
            links: [
                {
                    title: 'Experimental constraints on deliquescence of calcium perchlorate',
                    meta: 'The Planetary Science Journal, 2022',
                    description: 'Primary experimental work conducted using the Ares chamber for Mars simulation studies.',
                    url: 'https://iopscience.iop.org/article/10.3847/PSJ/ac75c4'
                },
                {
                    title: 'LPI Feature Article',
                    meta: 'February 2023',
                    description: 'Detailed description of Rachel\'s use of the Ares Mars simulation chamber for her research.',
                    url: 'https://www.lpi.usra.edu/features/2023/021423/slank/'
                }
            ]
        },
        'modeling-software': {
            title: 'Geochemical Modeling Software',
            description: 'Specialized software tools for thermodynamic and geochemical modeling of planetary environments and processes.',
            links: [
                {
                    title: 'Thermodynamic modeling of ternary salt mixtures',
                    meta: 'Icarus, 2024',
                    description: 'Advanced geochemical modeling to determine salt behavior at Mars-relevant conditions.',
                    url: 'https://www.sciencedirect.com/science/article/pii/S0019103523004109'
                }
            ]
        },
        'atacama-field': {
            title: 'Atacama Desert Field Studies',
            description: 'Extensive field research in the Atacama Desert, one of Earth\'s most Mars-like environments, studying salt deliquescence and efflorescence cycles.',
            links: [
                {
                    title: 'Study of Salt Deliquescence/Efflorescence Cycles in the Atacama Desert',
                    meta: 'AbSciCon 2024 • LPSC 2024',
                    description: 'Eight-month field campaign examining real-time salt behavior in extreme arid conditions.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                },
                {
                    title: 'PhD Dissertation Research',
                    meta: 'University of Arkansas, 2022',
                    description: 'Atacama Desert field studies formed a major component of doctoral research on Martian salts.',
                    url: 'https://sti.usra.edu/personnel/rachel-slank-phd/'
                }
            ]
        },
        'colorado-plateau': {
            title: 'Colorado Plateau Geological Surveys',
            description: 'Current postdoctoral research investigating igneous intrusions and metamorphosed sediments as Mars analogs.',
            links: [
                {
                    title: 'Investigation of a Magma-Sediment Hydrothermal Dike System in Utah',
                    meta: 'LPSC 2024 Conference',
                    description: 'Ongoing research on hydrothermal systems in the Colorado Plateau as Mars analogs.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                },
                {
                    title: 'Early Mars habitability as constrained by sediment-magma interactions',
                    meta: 'Conference Abstract 2025',
                    description: 'Latest research findings on habitability potential of Martian hydrothermal systems.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                }
            ]
        },
        'regolith-analog': {
            title: 'Mars Regolith Analog Preparation',
            description: 'Preparation and characterization of Earth materials that simulate Martian regolith for experimental studies.',
            links: [
                {
                    title: 'Experimental constraints on deliquescence of calcium perchlorate',
                    meta: 'The Planetary Science Journal, 2022',
                    description: 'Detailed methodology for preparing and using Mars regolith analogs in deliquescence experiments.',
                    url: 'https://iopscience.iop.org/article/10.3847/PSJ/ac75c4'
                }
            ]
        },
        'bulk-mineralogy': {
            title: 'Bulk Mineralogy Analysis',
            description: 'Comprehensive analysis of mineral composition and abundance in geological samples using multiple analytical techniques.',
            links: [
                {
                    title: 'Colorado Plateau Research Methods',
                    meta: 'STI/USRA Profile',
                    description: 'Bulk mineralogy analysis using VNIR and XRD for characterizing hydrothermal alteration.',
                    url: 'https://sti.usra.edu/personnel/rachel-slank-phd/'
                }
            ]
        },
        'hydrothermal': {
            title: 'Hydrothermal System Characterization',
            description: 'Study of hydrothermal processes and their products, particularly in the context of potential habitability on Mars.',
            links: [
                {
                    title: 'Early Mars habitability as constrained by sediment-magma interactions',
                    meta: 'Conference Abstract 2025',
                    description: 'Investigation of hydrothermal environments that may have supported life on early Mars.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                },
                {
                    title: 'Habitability Potential of Martian Hydrothermal Systems',
                    meta: 'AGU Fall Meeting 2023',
                    description: 'Research constraining habitability of Martian hydrothermal systems from Earth analog studies.',
                    url: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en'
                }
            ]
        }
    };

    // Add click event listeners to skill items
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            const skillKey = this.getAttribute('data-skill');
            const skillInfo = skillData[skillKey];
            
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
});