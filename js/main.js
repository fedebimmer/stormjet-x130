// Main JavaScript for StormJet X130 Website

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    // FAQ Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            item.classList.toggle('active');
            const toggle = item.querySelector('.faq-toggle i');
            toggle.classList.toggle('fa-plus');
            toggle.classList.toggle('fa-minus');
        });
    });
    
    // Reviews Slider
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(index) {
        reviewCards.forEach(card => {
            card.style.display = 'none';
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        reviewCards[index].style.display = 'block';
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    if (reviewCards.length > 0 && dots.length > 0) {
        showSlide(0);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) {
                    newIndex = reviewCards.length - 1;
                }
                showSlide(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let newIndex = currentSlide + 1;
                if (newIndex >= reviewCards.length) {
                    newIndex = 0;
                }
                showSlide(newIndex);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }
    
    // Video Play Button
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.video-container video');
    
    if (playButton && video) {
        playButton.addEventListener('click', function() {
            video.play();
            playButton.style.display = 'none';
        });
        
        video.addEventListener('pause', function() {
            playButton.style.display = 'flex';
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form Submission
    const orderForm = document.getElementById('order-form');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            
            if (!name || !email || !phone || !address) {
                alert('Per favore, compila tutti i campi obbligatori.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Per favore, inserisci un indirizzo email valido.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[0-9]{9,10}$/;
            if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
                alert('Per favore, inserisci un numero di telefono valido.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = orderForm.querySelector('.btn-order');
            submitBtn.innerHTML = 'Elaborazione...';
            submitBtn.disabled = true;
            
            setTimeout(function() {
                alert('Grazie per il tuo ordine! Riceverai una conferma via email a breve.');
                orderForm.reset();
                submitBtn.innerHTML = 'ACQUISTA ORA';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Bundle Selection
    const bundleOptions = document.querySelectorAll('.bundle-option input[type="radio"]');
    
    if (bundleOptions.length > 0) {
        bundleOptions.forEach(option => {
            option.addEventListener('change', function() {
                document.querySelectorAll('.bundle-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                this.closest('.bundle-option').classList.add('selected');
            });
        });
    }
});
