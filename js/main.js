// Correzioni per main.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    // Aggiungiamo il pulsante hamburger se non esiste
    if (!mobileMenuBtn) {
        const header = document.querySelector('header .container');
        const hamburgerBtn = document.createElement('div');
        hamburgerBtn.className = 'mobile-menu-btn';
        hamburgerBtn.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(hamburgerBtn);
        
        hamburgerBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    } else {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) {
                mobileBtn.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });
    
    // FAQ Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        // Aggiungiamo l'icona se non esiste
        if (!question.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-chevron-down';
            question.appendChild(icon);
        }
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
    
    // Reviews Slider - Versione semplificata
    const reviewCards = document.querySelectorAll('.review-card');
    
    if (reviewCards.length > 0) {
        // Mostriamo tutte le recensioni invece di usare uno slider
        reviewCards.forEach(card => {
            card.style.display = 'block';
        });
    }
    
    // Video Play Button
    const video = document.querySelector('.video-container video');
    
    if (video) {
        // Aggiungiamo un pulsante play se non esiste
        const videoContainer = document.querySelector('.video-container');
        if (!videoContainer.querySelector('.play-button')) {
            const playButton = document.createElement('div');
            playButton.className = 'play-button';
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            playButton.style.position = 'absolute';
            playButton.style.top = '50%';
            playButton.style.left = '50%';
            playButton.style.transform = 'translate(-50%, -50%)';
            playButton.style.width = '80px';
            playButton.style.height = '80px';
            playButton.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            playButton.style.borderRadius = '50%';
            playButton.style.display = 'flex';
            playButton.style.justifyContent = 'center';
            playButton.style.alignItems = 'center';
            playButton.style.color = 'white';
            playButton.style.fontSize = '2rem';
            playButton.style.cursor = 'pointer';
            playButton.style.zIndex = '10';
            
            videoContainer.appendChild(playButton);
            
            playButton.addEventListener('click', function() {
                video.play();
                playButton.style.display = 'none';
            });
            
            video.addEventListener('pause', function() {
                playButton.style.display = 'flex';
            });
            
            video.addEventListener('ended', function() {
                playButton.style.display = 'flex';
            });
        }
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
    
    // Countdown Timer
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        const popupCountdownElement = document.getElementById('popup-countdown');
        const countdownTimerElement = document.getElementById('countdown-timer');
        
        if (countdownElement || popupCountdownElement || countdownTimerElement) {
            // Impostiamo un countdown di 6 ore
            const hours = 5;
            const minutes = 59;
            const seconds = 59;
            
            const countdownStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (countdownElement) countdownElement.textContent = countdownStr;
            if (popupCountdownElement) popupCountdownElement.textContent = countdownStr;
            if (countdownTimerElement) countdownTimerElement.textContent = countdownStr;
            
            // In una versione reale, qui implementeremmo un vero countdown
            // Per ora lo lasciamo statico per semplicità
        }
    }
    
    updateCountdown();
    
    // Notification Popup
    const notificationPopup = document.getElementById('notification-popup');
    if (notificationPopup) {
        // Mostriamo la notifica dopo 5 secondi
        setTimeout(function() {
            notificationPopup.style.display = 'flex';
            
            // Nascondiamo la notifica dopo 5 secondi
            setTimeout(function() {
                notificationPopup.style.display = 'none';
            }, 5000);
        }, 5000);
    }
    
    // Popup Offerta
    const offerPopup = document.getElementById('offer-popup');
    if (offerPopup) {
        // Mostriamo il popup dopo 30 secondi
        setTimeout(function() {
            offerPopup.style.display = 'flex';
        }, 30000);
        
        // Chiudiamo il popup quando si clicca sulla X
        const closePopup = offerPopup.querySelector('.close-popup');
        if (closePopup) {
            closePopup.addEventListener('click', function() {
                offerPopup.style.display = 'none';
            });
        }
        
        // Chiudiamo il popup quando si clicca fuori dal contenuto
        offerPopup.addEventListener('click', function(e) {
            if (e.target === offerPopup) {
                offerPopup.style.display = 'none';
            }
        });
    }
    
    // Exit Intent Popup
    const exitPopup = document.getElementById('exit-popup');
    if (exitPopup) {
        let showOnce = false;
        
        document.addEventListener('mouseleave', function(e) {
            if (e.clientY < 0 && !showOnce) {
                exitPopup.style.display = 'flex';
                showOnce = true;
            }
        });
        
        // Chiudiamo il popup quando si clicca sulla X
        const closeExitPopup = exitPopup.querySelector('.close-popup');
        if (closeExitPopup) {
            closeExitPopup.addEventListener('click', function() {
                exitPopup.style.display = 'none';
            });
        }
        
        // Chiudiamo il popup quando si clicca fuori dal contenuto
        exitPopup.addEventListener('click', function(e) {
            if (e.target === exitPopup) {
                exitPopup.style.display = 'none';
            }
        });
    }
    
    // Aggiungiamo la classe "active" al primo pacchetto popolare
    const popularPackage = document.querySelector('.package.popular');
    if (popularPackage) {
        popularPackage.classList.add('active');
    }
});
