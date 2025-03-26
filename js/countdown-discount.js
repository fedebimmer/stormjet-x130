// Implementazione funzionalità countdown ottimizzata

document.addEventListener('DOMContentLoaded', function() {
    // Elementi countdown
    const countdownElements = {
        main: document.getElementById('countdown'),
        timer: document.getElementById('countdown-timer'),
        popup: document.getElementById('popup-countdown')
    };
    
    // Verifica se gli elementi esistono prima di procedere
    if (!countdownElements.main && !countdownElements.timer && !countdownElements.popup) {
        console.error('Elementi countdown non trovati nella pagina');
        return;
    }
    
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
    
    // Verifica se c'è un timestamp salvato nel localStorage
    const savedTimestamp = localStorage.getItem('countdownTimestamp');
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (savedTimestamp) {
        // Calcola il tempo rimanente
        const elapsedSeconds = currentTime - parseInt(savedTimestamp);
        totalSeconds = Math.max(0, 6 * 60 * 60 - elapsedSeconds);
    } else {
        // Salva il timestamp corrente
        localStorage.setItem('countdownTimestamp', currentTime.toString());
    }
    
    // Funzione per aggiornare il countdown
    function updateCountdown() {
        // Se il countdown è scaduto
        if (totalSeconds <= 0) {
            // Aggiorna il testo del countdown semplice
            if (countdownElements.main) {
                countdownElements.main.textContent = "Offerta scaduta!";
                countdownElements.main.classList.add('countdown-expired');
            }
            
            // Aggiorna il testo del countdown popup
            if (countdownElements.popup) {
                countdownElements.popup.textContent = "Offerta scaduta!";
                countdownElements.popup.classList.add('countdown-expired');
            }
            
            // Aggiorna il countdown strutturato
            if (countdownElements.timer) {
                countdownElements.timer.innerHTML = '<div class="countdown-expired">Offerta scaduta! Ricarica per un nuovo codice.</div>';
            }
            
            return;
        }
        
        // Calcola ore, minuti e secondi
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
        totalSeconds--;
        
        // Aggiorna il localStorage con il nuovo tempo rimanente
        localStorage.setItem('countdownSeconds', totalSeconds.toString());
    }
    
    // Aggiorna immediatamente e poi ogni secondo
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Funzione per resettare il countdown (utile per testing)
    window.resetCountdown = function() {
        totalSeconds = 6 * 60 * 60;
        localStorage.setItem('countdownTimestamp', Math.floor(Date.now() / 1000).toString());
        localStorage.removeItem('countdownSeconds');
        updateCountdown();
        
        // Rimuovi la classe countdown-expired se presente
        if (countdownElements.main) {
            countdownElements.main.classList.remove('countdown-expired');
        }
        
        if (countdownElements.popup) {
            countdownElements.popup.classList.remove('countdown-expired');
        }
        
        if (countdownElements.timer) {
            countdownElements.timer.innerHTML = countdownHTML;
        }
        
        console.log('Countdown resettato a 6 ore');
    };
    
    // Aggiungi un pulsante di reset nascosto per il testing (solo in modalità sviluppo)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Reset Countdown (Test)';
        resetButton.style.position = 'fixed';
        resetButton.style.bottom = '10px';
        resetButton.style.right = '10px';
        resetButton.style.zIndex = '9999';
        resetButton.style.padding = '5px 10px';
        resetButton.style.backgroundColor = '#f0f0f0';
        resetButton.style.border = '1px solid #ccc';
        resetButton.style.borderRadius = '4px';
        resetButton.style.cursor = 'pointer';
        resetButton.onclick = window.resetCountdown;
        document.body.appendChild(resetButton);
    }
});
