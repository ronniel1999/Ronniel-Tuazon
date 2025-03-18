// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', () => {
        header.classList.toggle('nav-open');
    });
    
    // Close menu when clicking outside or on a link
    document.addEventListener('click', (event) => {
        if (header.classList.contains('nav-open') && 
            !event.target.closest('header') && 
            !event.target.closest('.hamburger')) {
            header.classList.remove('nav-open');
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
        });
    });
    
    // Typewriter effect
    const typedTextSpan = document.querySelector('.typed-text');
    const cursorSpan = document.querySelector('.cursor');
    const textArray = [ 'COMPUTER SCIENCE GRADUATE','DESIGNER', 'FUTURE DATA ANALYST', 'PROBLEM SOLVER'];
    let textArrayIndex = 0, charIndex = 0;
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            cursorSpan.classList.add('typing');
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 200);
        } else {
            cursorSpan.classList.remove('typing');
            setTimeout(erase, 2000);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            cursorSpan.classList.add('typing');
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, 100);
        } else {
            cursorSpan.classList.remove('typing');
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, 1100);
        }
    }
    
    if(textArray.length) setTimeout(type, 2250);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations for sections
    const revealElements = document.querySelectorAll('.reveal');
    function checkReveal() {
        revealElements.forEach(element => {
            if (element.getBoundingClientRect().top < window.innerHeight - 150) {
                element.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal();
    
    // Contact form validation
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            let isValid = true;
            
            ['name', 'email', 'message'].forEach(field => {
                const input = document.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                document.querySelector('.form-success')?.classList.add('show');
                contactForm.reset();
                setTimeout(() => {
                    document.querySelector('.form-success')?.classList.remove('show');
                }, 5000);
            }
        });
    }
});
