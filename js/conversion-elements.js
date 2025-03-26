// Conversion Elements JavaScript for StormJet X130 Website

document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function startCountdown() {
        // Set the countdown to 6 hours from now
        const now = new Date();
        const countdownEnd = new Date(now.getTime() + 6 * 60 * 60 * 1000);
        
        function updateCountdown() {
            const currentTime = new Date();
            const diff = countdownEnd - currentTime;
            
            if (diff <= 0) {
                // Reset countdown when it reaches zero
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
        }
        
        // Update countdown every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    if (document.getElementById('countdown')) {
        startCountdown();
    }
    
    // Stock Counter
    function updateStockCounter() {
        const stockCount = document.getElementById('stock-count');
        if (!stockCount) return;
        
        let count = parseInt(stockCount.textContent);
        
        // Randomly decrease stock count
        setInterval(function() {
            if (Math.random() < 0.3 && count > 1) {
                count--;
                stockCount.textContent = count;
                stockCount.classList.add('highlight');
                
                // Update progress bar
                const stockProgress = document.querySelector('.stock-progress');
                if (stockProgress) {
                    const newWidth = (count / 30) * 100;
                    stockProgress.style.width = newWidth + '%';
                }
                
                setTimeout(function() {
                    stockCount.classList.remove('highlight');
                }, 2000);
            }
        }, 30000); // Check every 30 seconds
    }
    
    updateStockCounter();
    
    // Popup
    function showPopup() {
        const popup = document.getElementById('popup');
        if (!popup) return;
        
        // Show popup after 30 seconds
        setTimeout(function() {
            popup.style.display = 'flex';
        }, 30000);
        
        // Close popup when clicking on close button
        const closePopup = document.querySelector('.close-popup');
        if (closePopup) {
            closePopup.addEventListener('click', function() {
                popup.style.display = 'none';
            });
        }
        
        // Close popup when clicking outside
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });
    }
    
    showPopup();
    
    // Exit Intent Popup
    function setupExitIntent() {
        const exitPopup = document.querySelector('.exit-intent-popup');
        if (!exitPopup) return;
        
        let showOnce = false;
        
        document.addEventListener('mouseleave', function(e) {
            if (e.clientY < 0 && !showOnce) {
                exitPopup.style.display = 'flex';
                showOnce = true;
            }
        });
        
        const closeExitPopup = exitPopup.querySelector('.close-popup');
        if (closeExitPopup) {
            closeExitPopup.addEventListener('click', function() {
                exitPopup.style.display = 'none';
            });
        }
        
        exitPopup.addEventListener('click', function(e) {
            if (e.target === exitPopup) {
                exitPopup.style.display = 'none';
            }
        });
    }
    
    setupExitIntent();
    
    // Social Proof Notifications
    function showSocialProof() {
        const names = ['Marco', 'Laura', 'Giovanni', 'Francesca', 'Alessandro', 'Sofia', 'Andrea', 'Giulia'];
        const cities = ['Milano', 'Roma', 'Napoli', 'Torino', 'Firenze', 'Bologna', 'Venezia', 'Palermo'];
        const times = ['2 minuti fa', '5 minuti fa', '10 minuti fa', '15 minuti fa', '20 minuti fa'];
        
        function createNotification() {
            const name = names[Math.floor(Math.random() * names.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            const time = times[Math.floor(Math.random() * times.length)];
            
            const notification = document.createElement('div');
            notification.className = 'social-proof';
            notification.innerHTML = `
                <img src="https://placehold.co/50x50/222/ffffff?text=${name.charAt(0)}" alt="${name}" class="social-proof-avatar">
                <div class="social-proof-content">
                    <h4>${name} da ${city}</h4>
                    <p>ha appena acquistato StormJet X130</p>
                    <div class="social-proof-time">${time}</div>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Remove notification after 6 seconds
            setTimeout(function() {
                notification.remove();
            }, 6000);
        }
        
        // Show first notification after 45 seconds
        setTimeout(function() {
            createNotification();
            
            // Show random notifications every 45-90 seconds
            setInterval(function() {
                createNotification();
            }, Math.random() * 45000 + 45000);
        }, 45000);
    }
    
    showSocialProof();
    
    // Floating Notification
    function showFloatingNotification() {
        const notification = document.createElement('div');
        notification.className = 'floating-notification';
        notification.innerHTML = `
            <div class="floating-notification-header">
                <div class="floating-notification-title">Offerta Speciale</div>
                <div class="close-notification">&times;</div>
            </div>
            <div class="floating-notification-content">
                <p>Usa il codice <strong>EXTRA10</strong> al checkout per uno sconto extra del 10%!</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification after 60 seconds
        setTimeout(function() {
            notification.style.display = 'block';
        }, 60000);
        
        // Close notification when clicking on close button
        const closeNotification = notification.querySelector('.close-notification');
        closeNotification.addEventListener('click', function() {
            notification.style.display = 'none';
        });
    }
    
    showFloatingNotification();
});
