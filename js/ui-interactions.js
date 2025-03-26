// Funzionalità per le FAQ interattive
document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti gli elementi FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Aggiungi event listener a ciascun elemento FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle della classe 'active' sull'elemento FAQ
            item.classList.toggle('active');
            
            // Animazione dell'icona
            const icon = question.querySelector('i');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
            
            // Log per debugging
            console.log(`FAQ ${item.id} cliccata, stato: ${item.classList.contains('active') ? 'aperta' : 'chiusa'}`);
        });
    });
    
    // Verifica i link di acquisto
    const buyButtons = document.querySelectorAll('a[href*="checkout"]');
    
    buyButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            // Ottieni l'URL corrente
            const href = button.getAttribute('href');
            
            // Verifica se l'URL è corretto
            if (!href || !href.includes('checkout')) {
                console.error(`Pulsante di acquisto ${index + 1} ha un URL non valido: ${href}`);
                // Correggi l'URL se necessario
                if (!href) {
                    button.setAttribute('href', 'checkout/index.html');
                    console.log(`URL corretto a: checkout/index.html`);
                }
            } else {
                console.log(`Pulsante di acquisto ${index + 1} ha un URL valido: ${href}`);
            }
        });
    });
});

// Funzionalità per il pulsante play del video
document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.video-container');
    const video = document.getElementById('demo-video');
    const playButton = document.querySelector('.play-button');
    
    if (videoContainer && video && playButton) {
        playButton.addEventListener('click', function() {
            // Avvia il video
            video.play();
            
            // Nascondi il pulsante play
            playButton.style.display = 'none';
            
            // Log per debugging
            console.log('Video avviato');
        });
        
        // Mostra nuovamente il pulsante play quando il video è in pausa o finisce
        video.addEventListener('pause', function() {
            playButton.style.display = 'flex';
            console.log('Video in pausa');
        });
        
        video.addEventListener('ended', function() {
            playButton.style.display = 'flex';
            console.log('Video terminato');
        });
    }
});

// Funzionalità per il menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle della classe 'active' sul pulsante
            mobileMenuBtn.classList.toggle('active');
            
            // Toggle della classe 'mobile-active' sul menu
            navMenu.classList.toggle('mobile-active');
            
            // Log per debugging
            console.log(`Menu mobile ${navMenu.classList.contains('mobile-active') ? 'aperto' : 'chiuso'}`);
        });
    }
});
