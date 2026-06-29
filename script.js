document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // ==========================================
    // MOBILE NAVIGATION MENU
    // ==========================================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            // Toggle hamburger icon between menu and close
            const icon = navToggle.querySelector('i');
            if (icon) {
                const currentIcon = icon.getAttribute('data-feather');
                if (currentIcon === 'menu') {
                    icon.setAttribute('data-feather', 'x');
                } else {
                    icon.setAttribute('data-feather', 'menu');
                }
                feather.replace();
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('show-menu');
            }
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-feather', 'menu');
                    feather.replace();
                }
            }
        });
    });

    // ==========================================
    // LIGHT/DARK THEME TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check saved theme or fallback to user preference
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
        body.classList.add('light-theme');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
        });
    }

    // ==========================================
    // TYPEWRITER ANIMATION
    // ==========================================
    const typewriterText = document.getElementById('typewriter');
    const roles = [
        'Embedded Systems',
        'IoT Applications',
        'Smart Automation',
        'Electronics Engineering'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        if (!typewriterText) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // speed up when deleting
        } else {
            typewriterText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // regular typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing, pause
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next word
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // brief pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typewriter
    if (typewriterText) {
        setTimeout(type, 1000);
    }

    // ==========================================
    // ACTIVE NAVIGATION LINKS ON SCROLL
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // accounting for header height
            const sectionId = current.getAttribute('id');
            const navActiveLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navActiveLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navActiveLink.classList.add('active');
                } else {
                    navActiveLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // ==========================================
    // PROJECTS FILTER
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ==========================================
    // CERTIFICATIONS SEARCH
    // ==========================================
    const certSearch = document.getElementById('cert-search');
    const certCards = document.querySelectorAll('.cert-card');

    if (certSearch) {
        certSearch.addEventListener('input', (e) => {
            const searchValue = e.target.value.toLowerCase().trim();

            certCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                if (title.includes(searchValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // ==========================================
    // CONTACT FORM SUBMISSION (MOCK)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Form Status: In Progress
            formStatus.className = 'form-status-box success';
            formStatus.textContent = 'Sending your message...';
            formStatus.classList.remove('hidden');

            // Simulate server network delay
            setTimeout(() => {
                formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                contactForm.reset();
                
                // Hide confirmation after 5 seconds
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }
});
