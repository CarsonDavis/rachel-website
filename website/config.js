// Centralized configuration for Rachel Slank's portfolio website
// This file contains all URLs, publication data, and profile information
// to eliminate duplication and provide a single source of truth

const CONFIG = {
    // Profile URLs - single source of truth for all external links
    profileUrls: {
        googleScholar: 'https://scholar.google.com/citations?user=isL-R9wAAAAJ&hl=en',
        stiProfile: 'https://sti.usra.edu/personnel/rachel-slank-phd/',
        lpiFeature: 'https://www.lpi.usra.edu/features/2023/021423/slank/',
        linkedin: 'https://www.linkedin.com/in/rachel-slank-6230249b/',
        email: 'rachel.slank@lpi.usra.edu'
    },

    // Publication data with DOI links and metadata
    publications: [
        {
            id: 'calcium-perchlorate-2022',
            title: 'Experimental constraints on deliquescence of calcium perchlorate mixed with a Mars regolith analog',
            authors: 'R.A. Slank, E.G. Rivera-Valentín, V.F. Chevrier',
            journal: 'The Planetary Science Journal, 3(7), 154 (2022)',
            citations: 9,
            doi: 'https://iopscience.iop.org/article/10.3847/PSJ/ac75c4'
        },
        {
            id: 'martian-brines-2024',
            title: 'The elusive nature of Martian liquid brines',
            authors: 'V.F. Chevrier, R.A. Slank',
            journal: 'Proceedings of the National Academy of Sciences, 121(52), e2321067121 (2024)',
            citations: 4,
            doi: 'https://www.pnas.org/doi/10.1073/pnas.2321067121'
        },
        {
            id: 'thermodynamic-modeling-2024',
            title: 'Thermodynamic modeling of calcium or magnesium chloride, chlorate, and perchlorate ternary mixtures deliquescence at Mars-relevant temperatures',
            authors: 'R.A. Slank, V.F. Chevrier',
            journal: 'Icarus, 410, 115914 (2024)',
            citations: 3,
            doi: 'https://www.sciencedirect.com/science/article/am/pii/S0019103523004931'
        },
        {
            id: 'lunar-subsurface-2016',
            title: 'Investigation of lunar subsurface cavities using thermal inertia and temperature maximum to minimum ratios',
            authors: 'R.A. Slank',
            journal: 'University of Texas at El Paso Master\'s Thesis (2016)',
            citations: 2,
            doi: '#' // placeholder for thesis link
        }
    ],

    // Research projects data
    researchProjects: [
        {
            id: 'colorado-plateau',
            title: 'Colorado Plateau Mars Analog Study',
            status: 'Ongoing',
            dateRange: '2022-Present',
            description: 'Multidisciplinary investigation of igneous intrusions and metamorphosed sediments in the San Rafael Swell. These sulfur-rich sediment intrusions may serve as ideal Earth analogs to Mars and help constrain potential habitability of ancient Martian igneous environments.',
            learnMoreUrl: 'stiProfile' // reference to profileUrls key
        },
        {
            id: 'martian-deliquescence',
            title: 'Martian Surface Deliquescence Modeling',
            status: 'Ongoing',
            dateRange: '2023-Present',
            description: 'Geochemical modeling of deliquescence constraints on the Martian surface, considering mixed salt types and ice layers to determine brine stability duration. This work helps understand water availability for potential microbial life.',
            learnMoreUrl: 'lpiFeature'
        },
        {
            id: 'atacama-study',
            title: 'Atacama Desert Salt Cycle Study',
            status: 'Published',
            dateRange: '2021-2024',
            description: 'Eight-month field analog study in the Atacama Desert examining real-time deliquescence and efflorescence cycles of various salts. This work provides ground-truth data for understanding water-salt interactions in extreme environments.',
            learnMoreUrl: 'googleScholar'
        }
    ],

    // Skills data with supporting publications
    skillsData: {
        'mars-simulation': {
            title: 'Mars Simulation Chamber Experiments',
            description: 'Experimental work using specialized chambers to simulate Martian atmospheric conditions, temperature, and pressure for studying salt deliquescence and brine formation.',
            supportingPublications: ['calcium-perchlorate-2022'],
            additionalReferences: [
                {
                    title: 'Experimental Investigation of Deliquescence-Driven Liquid Brine Formation',
                    meta: 'LPSC 2021 Conference Abstract',
                    description: 'Investigation of brine formation processes using controlled Mars-like environmental conditions.',
                    url: 'googleScholar'
                }
            ]
        },
        'field-analog': {
            title: 'Field Analog Studies',
            description: 'Field research in Earth locations that mimic extraterrestrial environments, providing ground-truth data for understanding planetary processes.',
            supportingPublications: [],
            additionalReferences: [
                {
                    title: 'Study of Salt Deliquescence/Efflorescence Cycles in the Atacama Desert',
                    meta: 'AbSciCon 2024 Conference',
                    description: 'Eight-month field study examining real-time salt behavior in Mars analog environment.',
                    url: 'googleScholar'
                },
                {
                    title: 'Colorado Plateau Mars Analog Investigation',
                    meta: 'Current LPI Research Project',
                    description: 'Multidisciplinary study of igneous intrusions in sulfur-rich sediments as Mars analogs.',
                    url: 'lpiFeature'
                }
            ]
        },
        'geochemical-modeling': {
            title: 'Geochemical Modeling',
            description: 'Computer modeling of chemical processes and thermodynamic systems to predict salt behavior and brine stability under various planetary conditions.',
            supportingPublications: ['thermodynamic-modeling-2024'],
            additionalReferences: [
                {
                    title: 'Chloride, Chlorate, and Perchlorate Ternary Thermodynamic Modeling',
                    meta: 'Brines Workshop 2023',
                    description: 'Modeling work to determine eutonic and deliquescence relative humidities.',
                    url: 'googleScholar'
                }
            ]
        },
        'deliquescence-analysis': {
            title: 'Deliquescence/Efflorescence Analysis',
            description: 'Specialized analysis of salt water absorption (deliquescence) and crystallization (efflorescence) processes critical for understanding water availability on Mars.',
            supportingPublications: ['calcium-perchlorate-2022', 'martian-brines-2024'],
            additionalReferences: []
        },
        'thermal-inertia': {
            title: 'Thermal Inertia Analysis',
            description: 'Analysis of thermal properties of planetary surfaces using spacecraft data to identify subsurface features and cavities.',
            supportingPublications: ['lunar-subsurface-2016'],
            additionalReferences: [
                {
                    title: 'Investigating Lunar Subsurface Cavities Using Thermal Inertia and Temperature Ratios',
                    meta: 'LPSC 2024 Conference',
                    description: 'Continued work on lunar thermal analysis with improved methodologies.',
                    url: 'googleScholar'
                }
            ]
        },
        'vnir-spectroscopy': {
            title: 'VNIR Spectroscopy',
            description: 'Visible and Near-Infrared spectroscopy for mineral identification and characterization of geological samples.',
            supportingPublications: [],
            additionalReferences: [
                {
                    title: 'Colorado Plateau Research Methodology',
                    meta: 'STI/USRA Profile',
                    description: 'VNIR spectroscopy used for bulk mineralogy analysis in current postdoctoral research.',
                    url: 'stiProfile'
                }
            ]
        },
        'xrd': {
            title: 'X-Ray Diffraction (XRD)',
            description: 'X-ray diffraction analysis for precise mineral identification and crystallographic characterization.',
            supportingPublications: [],
            additionalReferences: [
                {
                    title: 'Colorado Plateau Research Methodology',
                    meta: 'STI/USRA Profile',
                    description: 'XRD analysis used for detailed mineralogical characterization in hydrothermal dike systems.',
                    url: 'stiProfile'
                }
            ]
        },
        'petrographic': {
            title: 'Petrographic Analysis',
            description: 'Microscopic analysis of rock and mineral samples to understand formation processes and alteration histories.',
            supportingPublications: [],
            additionalReferences: [
                {
                    title: 'Colorado Plateau Research Methodology',
                    meta: 'STI/USRA Profile',
                    description: 'Petrographic analysis of alteration processes in igneous intrusions and metamorphosed sediments.',
                    url: 'stiProfile'
                }
            ]
        },
        'ares-chamber': {
            title: 'Ares Mars Simulation Chamber',
            description: 'Expert operation of the Ares Mars simulation chamber at the University of Arkansas for experimental planetary science research.',
            supportingPublications: ['calcium-perchlorate-2022'],
            additionalReferences: [
                {
                    title: 'LPI Feature Article',
                    meta: 'February 2023',
                    description: 'Detailed description of Rachel\'s use of the Ares Mars simulation chamber for her research.',
                    url: 'lpiFeature'
                }
            ]
        },
        'modeling-software': {
            title: 'Geochemical Modeling Software',
            description: 'Specialized software tools for thermodynamic and geochemical modeling of planetary environments and processes.',
            supportingPublications: ['thermodynamic-modeling-2024'],
            additionalReferences: []
        },
        'atacama-field': {
            title: 'Atacama Desert Field Studies',
            description: 'Extensive field research in the Atacama Desert, one of Earth\'s most Mars-like environments, studying salt deliquescence and efflorescence cycles.',
            supportingPublications: [],
            additionalReferences: [
                {
                    title: 'Study of Salt Deliquescence/Efflorescence Cycles in the Atacama Desert',
                    meta: 'AbSciCon 2024 • LPSC 2024',
                    description: 'Eight-month field campaign examining real-time salt behavior in extreme arid conditions.',
                    url: 'googleScholar'
                },
                {
                    title: 'PhD Dissertation Research',
                    meta: 'University of Arkansas, 2022',
                    description: 'Atacama Desert field studies formed a major component of doctoral research on Martian salts.',
                    url: 'stiProfile'
                }
            ]
        },
        'colorado-plateau': {
            title: 'Colorado Plateau Geological Surveys',
            description: 'Current postdoctoral research investigating igneous intrusions and metamorphosed sediments as Mars analogs.',
            supportingPublications: [],
            additionalReferences: [
                {
                    title: 'Investigation of a Magma-Sediment Hydrothermal Dike System in Utah',
                    meta: 'LPSC 2024 Conference',
                    description: 'Ongoing research on hydrothermal systems in the Colorado Plateau as Mars analogs.',
                    url: 'googleScholar'
                },
                {
                    title: 'Early Mars habitability as constrained by sediment-magma interactions',
                    meta: 'Conference Abstract 2025',
                    description: 'Latest research findings on habitability potential of Martian hydrothermal systems.',
                    url: 'googleScholar'
                }
            ]
        },
        'regolith-analog': {
            title: 'Mars Regolith Analog Preparation',
            description: 'Preparation and characterization of Earth materials that simulate Martian regolith for experimental studies.',
            supportingPublications: ['calcium-perchlorate-2022'],
            additionalReferences: []
        },
        'bulk-mineralogy': {
            title: 'Bulk Mineralogy Analysis',
            description: 'Comprehensive analysis of mineral composition and abundance in geological samples using multiple analytical techniques.',
            supportingPublications: [],
            additionalReferences: [
                {
                    title: 'Colorado Plateau Research Methods',
                    meta: 'STI/USRA Profile',
                    description: 'Bulk mineralogy analysis using VNIR and XRD for characterizing hydrothermal alteration.',
                    url: 'stiProfile'
                }
            ]
        },
        'hydrothermal': {
            title: 'Hydrothermal System Characterization',
            description: 'Study of hydrothermal processes and their products, particularly in the context of potential habitability on Mars.',
            supportingPublications: [],
            additionalReferences: [
                {
                    title: 'Early Mars habitability as constrained by sediment-magma interactions',
                    meta: 'Conference Abstract 2025',
                    description: 'Investigation of hydrothermal environments that may have supported life on early Mars.',
                    url: 'googleScholar'
                },
                {
                    title: 'Habitability Potential of Martian Hydrothermal Systems',
                    meta: 'AGU Fall Meeting 2023',
                    description: 'Research constraining habitability of Martian hydrothermal systems from Earth analog studies.',
                    url: 'googleScholar'
                }
            ]
        }
    }
};

// Utility functions for working with the configuration
const ConfigUtils = {
    // Get a URL by reference key
    getUrl: function(urlKey) {
        return CONFIG.profileUrls[urlKey] || '#';
    },

    // Get publication by ID
    getPublication: function(pubId) {
        return CONFIG.publications.find(pub => pub.id === pubId);
    },

    // Get research project by ID
    getResearchProject: function(projectId) {
        return CONFIG.researchProjects.find(project => project.id === projectId);
    },

    // Get skill data by key
    getSkillData: function(skillKey) {
        return CONFIG.skillsData[skillKey];
    },

    // Generate publication HTML with proper links
    generatePublicationHtml: function(pubId) {
        const pub = this.getPublication(pubId);
        if (!pub) return '';
        
        return `
            <div class="publication-item">
                <h3 class="publication-title">${pub.title}</h3>
                <p class="publication-authors">${pub.authors}</p>
                <p class="publication-journal">${pub.journal} • ${pub.citations} citations</p>
                <div class="publication-links">
                    <a href="${CONFIG.profileUrls.googleScholar}" class="publication-link">Scholar</a>
                    <a href="${pub.doi}" class="publication-link">DOI</a>
                </div>
            </div>
        `;
    },

    // Generate research card HTML
    generateResearchCardHtml: function(projectId) {
        const project = this.getResearchProject(projectId);
        if (!project) return '';

        const learnMoreUrl = this.getUrl(project.learnMoreUrl);
        
        return `
            <div class="research-card">
                <div class="card-header">
                    <h3 class="card-title">${project.title}</h3>
                    <span class="card-tag">${project.status}</span>
                </div>
                <p class="card-description">${project.description}</p>
                <div class="card-footer">
                    <span class="card-date">${project.dateRange}</span>
                    <a href="${learnMoreUrl}" class="card-link">Learn More</a>
                </div>
            </div>
        `;
    },

    // Generate modal content for skills
    generateSkillModalContent: function(skillKey) {
        const skillInfo = this.getSkillData(skillKey);
        if (!skillInfo) return null;

        const links = [];
        
        // Add supporting publications
        skillInfo.supportingPublications.forEach(pubId => {
            const pub = this.getPublication(pubId);
            if (pub) {
                links.push({
                    title: pub.title,
                    meta: `${pub.journal} • ${pub.citations} citations`,
                    description: `Primary research on ${skillInfo.title.toLowerCase()}.`,
                    url: pub.doi
                });
            }
        });

        // Add additional references
        skillInfo.additionalReferences.forEach(ref => {
            links.push({
                title: ref.title,
                meta: ref.meta,
                description: ref.description,
                url: this.getUrl(ref.url)
            });
        });

        return {
            title: skillInfo.title,
            description: skillInfo.description,
            links: links
        };
    },

    // Generate contact link HTML
    generateContactLink: function(type, label) {
        const urls = {
            email: `mailto:${CONFIG.profileUrls.email}`,
            linkedin: CONFIG.profileUrls.linkedin,
            scholar: CONFIG.profileUrls.googleScholar,
            sti: CONFIG.profileUrls.stiProfile
        };

        const url = urls[type] || '#';
        const target = type === 'email' ? '' : 'target="_blank"';
        
        return `<a href="${url}" ${target}>${label || url.replace('mailto:', '')}</a>`;
    },

    // Initialize all dynamic content
    initializeDynamicContent: function() {
        // Update research cards
        this.updateResearchCards();
        
        // Update publications
        this.updatePublications();
        
        // Update contact links
        this.updateContactLinks();
    },

    // Update research cards with centralized data
    updateResearchCards: function() {
        const researchGrid = document.querySelector('.research-grid');
        if (researchGrid) {
            researchGrid.innerHTML = CONFIG.researchProjects.map(project => 
                this.generateResearchCardHtml(project.id)
            ).join('');
        }
    },

    // Update publications with centralized data
    updatePublications: function() {
        const publicationsList = document.querySelector('.publications-list');
        if (publicationsList) {
            publicationsList.innerHTML = CONFIG.publications.map(pub => 
                this.generatePublicationHtml(pub.id)
            ).join('');
        }
    },

    // Update contact links with centralized data
    updateContactLinks: function() {
        // Update contact section links
        const contactItems = document.querySelectorAll('.contact-item a');
        contactItems.forEach(link => {
            const href = link.getAttribute('href');
            if (href.includes('scholar.google.com')) {
                link.href = CONFIG.profileUrls.googleScholar;
            } else if (href.includes('linkedin.com')) {
                link.href = CONFIG.profileUrls.linkedin;
            } else if (href.includes('sti.usra.edu')) {
                link.href = CONFIG.profileUrls.stiProfile;
            } else if (href.includes('mailto:')) {
                link.href = `mailto:${CONFIG.profileUrls.email}`;
                link.textContent = CONFIG.profileUrls.email;
            }
        });
    }
};

// Make CONFIG and utilities globally available
window.CONFIG = CONFIG;
window.ConfigUtils = ConfigUtils;