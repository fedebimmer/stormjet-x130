// Implementazione funzionalità countdown e codici sconto

document.addEventListener('DOMContentLoaded', function() {
    // Implementazione countdown funzionale
    function setupCountdown() {
        // Elementi countdown
        const countdownElements = {
            main: document.getElementById('countdown'),
            timer: document.getElementById('countdown-timer'),
            popup: document.getElementById('popup-countdown')
        };
        
        // Struttura HTML per il countdown con unità
        const countdownHTML = `
            <div class="countdown-unit">
                <span class="countdown-value hours">05</span>
                <span class="countdown-label-small">ore</span>
            </div>
            <span class="countdown-separator">:</span>
            <div class="countdown-unit">
                <span class="countdown-value minutes">59</span>
                <span class="countdown-label-small">min</span>
            </div>
            <span class="countdown-separator">:</span>
            <div class="countdown-unit">
                <span class="countdown-value seconds">59</span>
                <span class="countdown-label-small">sec</span>
            </div>
        `;
        
        // Aggiorna la struttura HTML dei countdown
        if (countdownElements.timer) {
            countdownElements.timer.innerHTML = countdownHTML;
        }
        
        // Imposta un countdown di 6 ore (in secondi)
        let totalSeconds = 6 * 60 * 60;
        
        // Funzione per aggiornare il countdown
        function updateCountdown() {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            // Formatta i valori con zero iniziale se necessario
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            
            // Aggiorna il testo del countdown semplice
            if (countdownElements.main) {
                countdownElements.main.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            }
            
            // Aggiorna il testo del countdown popup
            if (countdownElements.popup) {
                countdownElements.popup.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            }
            
            // Aggiorna i valori nel countdown strutturato
            if (countdownElements.timer) {
                const hoursElements = countdownElements.timer.querySelectorAll('.hours');
                const minutesElements = countdownElements.timer.querySelectorAll('.minutes');
                const secondsElements = countdownElements.timer.querySelectorAll('.seconds');
                
                hoursElements.forEach(el => el.textContent = formattedHours);
                minutesElements.forEach(el => el.textContent = formattedMinutes);
                secondsElements.forEach(el => el.textContent = formattedSeconds);
                
                // Aggiungi classe di urgenza se manca meno di 10 minuti
                if (totalSeconds < 600) {
                    countdownElements.timer.classList.add('countdown-urgent');
                } else {
                    countdownElements.timer.classList.remove('countdown-urgent');
                }
            }
            
            // Decrementa il contatore
            if (totalSeconds > 0) {
                totalSeconds--;
            } else {
                // Resetta il countdown quando raggiunge zero (opzionale)
                totalSeconds = 6 * 60 * 60;
            }
        }
        
        // Aggiorna immediatamente e poi ogni secondo
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Implementazione evidenziazione codici sconto
    function setupDiscountCodes() {
        // Trova tutti i codici sconto nel testo
        const welcomeCodeRegex = /WELCOME15/g;
        const extraCodeRegex = /EXTRA10/g;
        
        // Sostituisci i codici sconto con elementi HTML formattati
        document.body.innerHTML = document.body.innerHTML.replace(
            welcomeCodeRegex, 
            '<span class="discount-code welcome discount-code-tooltip" data-tooltip="15% di sconto sul primo ordine"><i class="fas fa-tag discount-code-icon"></i>WELCOME15</span>'
        );
        
        document.body.innerHTML = document.body.innerHTML.replace(
            extraCodeRegex, 
            '<span class="discount-code extra discount-code-tooltip" data-tooltip="Accessori extra gratuiti"><i class="fas fa-gift discount-code-icon"></i>EXTRA10</span>'
        );
        
        // Aggiungi funzionalità di copia al click
        const discountCodes = document.querySelectorAll('.discount-code');
        discountCodes.forEach(code => {
            // Crea il pulsante di copia
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-code-button';
            copyButton.textContent = 'Copia';
            code.appendChild(copyButton);
            
            // Crea il messaggio di conferma
            const copyConfirmation = document.createElement('span');
            copyConfirmation.className = 'copy-confirmation';
            copyConfirmation.textContent = 'Copiato!';
            code.appendChild(copyConfirmation);
            
            // Aggiungi l'evento click per copiare il codice
            copyButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Estrai il codice sconto (testo senza l'icona e il pulsante)
                const codeText = code.textContent.replace('Copia', '').trim();
                
                // Copia negli appunti
                navigator.clipboard.writeText(codeText).then(() => {
                    // Mostra il messaggio di conferma
                    copyConfirmation.classList.add('show');
                    
                    // Nascondi il messaggio dopo 2 secondi
                    setTimeout(() => {
                        copyConfirmation.classList.remove('show');
                    }, 2000);
                });
            });
        });
        
        // Crea una sezione dedicata ai codici sconto se non esiste
        if (!document.querySelector('.discount-section') && discountCodes.length > 0) {
            const discountSection = document.createElement('div');
            discountSection.className = 'discount-section';
            discountSection.innerHTML = `
                <h2>Codici Sconto Esclusivi</h2>
                <p>Utilizza questi codici durante il checkout per ottenere vantaggi esclusivi:</p>
                <div class="discount-codes-container">
                    <div class="discount-badge">
                        <span class="discount-code welcome">
                            <i class="fas fa-tag discount-code-icon"></i>WELCOME15
                            <button class="copy-code-button">Copia</button>
                            <span class="copy-confirmation">Copiato!</span>
                        </span>
                        <p>15% di sconto sul primo ordine</p>
                    </div>
                    <div class="discount-badge">
                        <span class="discount-code extra">
                            <i class="fas fa-gift discount-code-icon"></i>EXTRA10
                            <button class="copy-code-button">Copia</button>
                            <span class="copy-confirmation">Copiato!</span>
                        </span>
                        <p>Accessori extra gratuiti</p>
                    </div>
                </div>
            `;
            
            // Inserisci la sezione prima della sezione FAQ
            const faqSection = document.getElementById('faq');
            if (faqSection) {
                faqSection.parentNode.insertBefore(discountSection, faqSection);
            } else {
                // Altrimenti inseriscila prima della sezione acquista
                const acquistaSection = document.getElementById('acquista');
                if (acquistaSection) {
                    acquistaSection.parentNode.insertBefore(discountSection, acquistaSection);
                }
            }
            
            // Aggiungi funzionalità di copia ai nuovi pulsanti
            const newCopyButtons = discountSection.querySelectorAll('.copy-code-button');
            newCopyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const codeElement = this.parentNode;
                    const codeText = codeElement.textContent.replace('Copia', '').trim();
                    const confirmation = codeElement.querySelector('.copy-confirmation');
                    
                    navigator.clipboard.writeText(codeText).then(() => {
                        confirmation.classList.add('show');
                        setTimeout(() => {
                            confirmation.classList.remove('show');
                        }, 2000);
                    });
                });
            });
        }
    }
    
    // Aggiungi pulsante "Torna su"
    function addBackToTopButton() {
        const backToTopButton = document.createElement('div');
        backToTopButton.className = 'back-to-top';
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopButton);
        
        // Mostra/nascondi il pulsante in base allo scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Torna all'inizio della pagina al click
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Inizializza tutte le funzionalità
    setupCountdown();
    setupDiscountCodes();
    addBackToTopButton();
});
