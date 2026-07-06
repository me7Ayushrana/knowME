// Portfolio Interactive Controller for Ayush Rana - Clean Light Theme

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation Menu
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    /* ==========================================================================
       2. Typewriter Effect
       ========================================================================== */
    const typewriterElement = document.getElementById('typewriter');
    const taglines = [
        "Software & Embedded Systems Engineer",
        "IoT · Robotics · Full-Stack · AI",
        "Founder, Ethereal Nexus EdTech"
    ];
    
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function handleTypewriter() {
        if (!typewriterElement) return;
        const currentTagline = taglines[taglineIndex];
        
        if (isDeleting) {
            // Deleting text
            typewriterElement.textContent = currentTagline.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30; // delete faster
        } else {
            // Typing text
            typewriterElement.textContent = currentTagline.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 60; // typing speed
        }

        // Handle transitions
        if (!isDeleting && charIndex === currentTagline.length) {
            // Completed typing, pause before deleting
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Completed deleting, move to next tagline
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            typeSpeed = 400; // brief pause before starting next tagline
        }

        setTimeout(handleTypewriter, typeSpeed);
    }

    if (typewriterElement) {
        setTimeout(handleTypewriter, 800);
    }


    /* ==========================================================================
       3. Scroll-Triggered Fade-In Animations
       ========================================================================== */
    const fadeSections = document.querySelectorAll('.section-fade');
    
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeSections.forEach(section => {
            sectionObserver.observe(section);
        });
    } else {
        fadeSections.forEach(section => {
            section.classList.add('in-view');
        });
    }


    /* ==========================================================================
       4. Floating Toast Notification System
       ========================================================================== */
    const toast = document.getElementById('toast');

    function showToast(message, duration = 3500) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('visible');

        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300); // match transition duration
        }, duration);
    }


    /* ==========================================================================
       5. Contact Form Submission Handling
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('btn-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            if (!name || !email || !message) {
                showToast("Please complete all fields.");
                return;
            }

            // Disable submit button and show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span>';
                
                // Mock network delay (1.0s)
                setTimeout(() => {
                    showToast("Message sent successfully! I will get in touch shortly.");
                    contactForm.reset();
                    
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 1000);
            }
        });
    }


    /* ==========================================================================
       6. Back to Top Button Dynamics
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ==========================================================================
       7. Resume Document Viewer Handling
       ========================================================================== */
    const resumeBtn = document.getElementById('view-resume-btn');
    if (resumeBtn) {
        resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast("Opening resume document...");
            
            setTimeout(() => {
                window.open('https://drive.google.com/drive/u/0/folders/10uOZDAwVWJgl2CSeBb07I9J_z-dWKIAW', '_blank');
            }, 800);
        });
    }


    /* ==========================================================================
       8. Project Filter Implementation
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hide');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                }
            });
        });
    });


    /* ==========================================================================
       9. GitHub Heatmap Grid Generator
       ========================================================================== */
    const heatmapGrid = document.getElementById('github-heatmap-grid');
    if (heatmapGrid) {
        const weeks = 53;
        const days = 7;
        
        // Match user screenshot exactly:
        // July to January (weeks 0 to 28 approx): mostly sparse (level 0, very rare 1 or 2)
        // February to June (weeks 29 to 52 approx): extremely dense blocks (level 2 and 3 mostly, some 1)
        for (let w = 0; w < weeks; w++) {
            const column = document.createElement('div');
            column.className = 'heatmap-column';
            
            const isDensePeriod = w >= 29; // Feb (week 29 onwards) is extremely dense
            
            for (let d = 0; d < days; d++) {
                const cell = document.createElement('div');
                cell.className = 'heatmap-cell';
                
                let level = 0;
                const rand = Math.random();
                
                if (isDensePeriod) {
                    if (rand < 0.05) {
                        level = 0;
                    } else if (rand < 0.20) {
                        level = 1;
                    } else if (rand < 0.60) {
                        level = 2;
                    } else {
                        level = 3;
                    }
                } else {
                    if (rand < 0.90) {
                        level = 0;
                    } else if (rand < 0.97) {
                        level = 1;
                    } else {
                        level = 2;
                    }
                }
                
                cell.classList.add(`level-${level}`);
                
                let dateStr = "Contribution";
                if (level > 0) {
                    dateStr = `${level * 2 + Math.floor(Math.random() * 2)} contributions`;
                } else {
                    dateStr = "No contributions";
                }
                cell.setAttribute('title', dateStr);
                
                column.appendChild(cell);
            }
            heatmapGrid.appendChild(column);
        }
    }

    /* ==========================================================================
       10. Project Cards Spotlight Effect
       ========================================================================== */
    const cardsList = document.querySelectorAll('.project-card');
    cardsList.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

});
