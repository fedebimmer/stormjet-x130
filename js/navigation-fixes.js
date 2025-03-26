// Correzioni per problemi di navigazione
document.addEventListener('DOMContentLoaded', function() {
    // Correzione per il menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Correzione per la chiusura del menu quando si clicca su un link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            
            // Smooth scroll migliorato
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                event.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Correzione per le FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Imposta l'altezza iniziale a 0
        answer.style.maxHeight = '0';
        
        question.addEventListener('click', function() {
            // Toggle della classe active
            item.classList.toggle('active');
            
            // Animazione dell'apertura/chiusura
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 20px 20px';
            } else {
                answer.style.maxHeight = '0';
                answer.style.padding = '0 20px';
            }
            
            // Rotazione dell'icona
            const icon = question.querySelector('i');
            if (icon) {
                icon.style.transform = item.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    });
    
    // Correzione per il video
    const video = document.querySelector('.video-container video');
    const videoContainer = document.querySelector('.video-container');
    
    if (video && videoContainer) {
        // Crea il pulsante play se non esiste
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
            
            // Inizialmente nascondi il pulsante play se il video è in autoplay
            if (video.autoplay) {
                playButton.style.display = 'none';
            }
            
            // Gestisci il click sul pulsante play
            playButton.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    playButton.style.display = 'none';
                } else {
                    video.pause();
                    playButton.style.display = 'flex';
                }
            });
            
            // Mostra il pulsante play quando il video è in pausa o finisce
            video.addEventListener('pause', function() {
                playButton.style.display = 'flex';
            });
            
            video.addEventListener('ended', function() {
                playButton.style.display = 'flex';
            });
            
            // Nascondi il pulsante play quando il video è in riproduzione
            video.addEventListener('play', function() {
                playButton.style.display = 'none';
            });
        }
    }
    
    // Correzione per i popup
    const offerPopup = document.getElementById('offer-popup');
    const exitPopup = document.getElementById('exit-popup');
    const closeButtons = document.querySelectorAll('.close-popup');
    
    // Gestisci la chiusura dei popup
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.popup');
            if (popup) {
                popup.style.display = 'none';
            }
        });
    });
    
    // Mostra il popup dell'offerta dopo 30 secondi
    if (offerPopup) {
        setTimeout(function() {
            offerPopup.style.display = 'flex';
        }, 30000);
    }
    
    // Gestisci l'exit intent popup
    if (exitPopup) {
        let showOnce = false;
        
        document.addEventListener('mouseleave', function(e) {
            if (e.clientY < 0 && !showOnce) {
                exitPopup.style.display = 'flex';
                showOnce = true;
            }
        });
    }
    
    // Chiudi i popup quando si clicca fuori dal contenuto
    document.querySelectorAll('.popup').forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // Correzione per il countdown
    function updateCountdown() {
        const countdownElements = [
            document.getElementById('countdown'),
            document.getElementById('countdown-timer'),
            document.getElementById('popup-countdown')
        ];
        
        // Imposta un countdown di 6 ore
        const hours = 5;
        const minutes = 59;
        const seconds = 59;
        
        const countdownStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        countdownElements.forEach(element => {
            if (element) {
                element.textContent = countdownStr;
            }
        });
    }
    
    updateCountdown();
    
    // Correzione per la notifica
    const notificationPopup = document.getElementById('notification-popup');
    if (notificationPopup) {
        // Mostra la notifica dopo 5 secondi
        setTimeout(function() {
            notificationPopup.style.display = 'flex';
            
            // Nascondi la notifica dopo 5 secondi
            setTimeout(function() {
                notificationPopup.style.display = 'none';
            }, 5000);
        }, 5000);
    }
    
    // Aggiungi un pulsante "Torna su"
    const backToTopButton = document.createElement('div');
    backToTopButton.id = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '30px';
    backToTopButton.style.right = '30px';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.backgroundColor = '#0066ff';
    backToTopButton.style.color = '#fff';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.display = 'flex';
    backToTopButton.style.justifyContent = 'center';
    backToTopButton.style.alignItems = 'center';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.opacity = '0';
    backToTopButton.style.visibility = 'hidden';
    backToTopButton.style.transition = 'all 0.3s';
    backToTopButton.style.zIndex = '999';
    backToTopButton.style.boxShadow = '0 5px 15px rgba(0, 102, 255, 0.3)';
    
    document.body.appendChild(backToTopButton);
    
    // Mostra/nascondi il pulsante "Torna su" in base allo scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Gestisci il click sul pulsante "Torna su"
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Lazy loading per le immagini
    const lazyImages = document.querySelectorAll('img.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.add('loaded');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // Fallback per browser che non supportano IntersectionObserver
        lazyImages.forEach(function(image) {
            image.src = image.dataset.src;
        });
    }
});
