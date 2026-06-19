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

});
