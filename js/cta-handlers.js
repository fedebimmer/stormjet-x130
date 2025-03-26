// Implementazione CTA funzionanti con redirect

document.addEventListener('DOMContentLoaded', function() {
    // Configurazione dei pacchetti e dei loro URL di destinazione
    const packages = [
        {
            id: 'package-1',
            name: '1 StormJet X130',
            price: '49.99',
            url: 'checkout.html?package=single&price=49.99&id=SJ130-1'
        },
        {
            id: 'package-2',
            name: '2 StormJet X130',
            price: '89.98',
            url: 'checkout.html?package=double&price=89.98&id=SJ130-2'
        },
        {
            id: 'package-3',
            name: '3 StormJet X130',
            price: '119.97',
            url: 'checkout.html?package=triple&price=119.97&id=SJ130-3'
        }
    ];

    // Funzione per impostare i link corretti sui pulsanti CTA
    function setupCTAButtons() {
        // Ottieni tutti i pulsanti CTA nella pagina
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        // Per ogni pulsante CTA generico (non specifico per un pacchetto)
        ctaButtons.forEach(button => {
            // Se il pulsante porta alla sezione #acquista, lascialo così
            if (button.getAttribute('href') === '#acquista') {
                console.log('CTA button linking to #acquista section - keeping as is');
            } else {
                // Altrimenti, imposta il link al pacchetto più popolare (2 unità)
                button.setAttribute('href', packages[1].url);
                console.log('Generic CTA button updated to link to popular package');
            }
        });

        // Ottieni tutti i pulsanti specifici dei pacchetti
        const packageButtons = document.querySelectorAll('.package-button');
        
        // Imposta il link corretto per ogni pulsante del pacchetto
        packageButtons.forEach((button, index) => {
            if (index < packages.length) {
                button.setAttribute('href', packages[index].url);
                
                // Aggiungi attributi data per il tracciamento
                button.setAttribute('data-package-id', packages[index].id);
                button.setAttribute('data-package-name', packages[index].name);
                button.setAttribute('data-package-price', packages[index].price);
                
                console.log(`Package button ${index + 1} updated to link to ${packages[index].url}`);
                
                // Aggiungi event listener per il tracciamento delle conversioni
                button.addEventListener('click', function(e) {
                    // In un'implementazione reale, qui si invierebbe un evento di tracciamento
                    console.log(`Conversion tracking: User clicked on package ${packages[index].name}`);
                    
                    // Crea una pagina di checkout simulata se non esiste
                    createCheckoutPage(packages[index]);
                });
            }
        });
    }

    // Funzione per creare una pagina di checkout simulata
    function createCheckoutPage(packageData) {
        // In un'implementazione reale, questa funzione non sarebbe necessaria
        // poiché avresti già una pagina di checkout. Questa è solo per simulazione.
        
        // Crea un file HTML di checkout temporaneo
        const checkoutHTML = `
        <!DOCTYPE html>
        <html lang="it">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Checkout - StormJet X130</title>
            <link rel="stylesheet" href="css/styles.css">
            <link rel="stylesheet" href="css/mobile-optimizations.css">
            <link rel="stylesheet" href="css/conversion-elements.css">
            <link rel="stylesheet" href="css/responsive-fixes.css">
            <link rel="stylesheet" href="css/readability-improvements.css">
            <link rel="stylesheet" href="css/font-optimizations.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
            <style>
                .checkout-container {
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 30px;
                    background-color: #fff;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                }
                .checkout-header {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .checkout-product {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    margin-bottom: 30px;
                }
                .checkout-product img {
                    width: 100px;
                    height: auto;
                }
                .checkout-details {
                    flex: 1;
                }
                .checkout-price {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #0066ff;
                }
                .checkout-form {
                    margin-top: 30px;
                }
                .form-group {
                    margin-bottom: 20px;
                }
                .form-group label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 600;
                }
                .form-group input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                }
                .checkout-button {
                    background-color: #0066ff;
                    color: #fff;
                    padding: 15px 30px;
                    border-radius: 30px;
                    font-weight: 700;
                    font-size: 1.2rem;
                    display: block;
                    width: 100%;
                    text-align: center;
                    cursor: pointer;
                    border: none;
                    transition: background-color 0.3s;
                }
                .checkout-button:hover {
                    background-color: #0052cc;
                }
                .discount-section {
                    margin: 30px 0;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    text-align: center;
                }
                .discount-code-input {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }
                .discount-code-input input {
                    flex: 1;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                }
                .apply-code-button {
                    background-color: #333;
                    color: #fff;
                    padding: 12px 20px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    border: none;
                }
                .back-button {
                    display: inline-block;
                    margin-top: 20px;
                    color: #666;
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <header>
                <div class="container">
                    <div class="logo">
                        <h1>StormJet<span>X130</span></h1>
                    </div>
                </div>
            </header>
            
            <div class="checkout-container">
                <div class="checkout-header">
                    <h1>Completa il tuo ordine</h1>
                    <p>Sei a un passo dal ricevere il tuo StormJet X130!</p>
                </div>
                
                <div class="checkout-product">
                    <img src="images/optimized/product_1.webp" alt="StormJet X130">
                    <div class="checkout-details">
                        <h3>${packageData.name}</h3>
                        <p>Il turbo ventilatore più potente sul mercato</p>
                    </div>
                    <div class="checkout-price">€${packageData.price}</div>
                </div>
                
                <div class="discount-section">
                    <h3>Hai un codice sconto?</h3>
                    <p>Inserisci <span class="discount-code">WELCOME15</span> o <span class="discount-code">EXTRA10</span> per ricevere accessori extra gratuiti!</p>
                    <div class="discount-code-input">
                        <input type="text" placeholder="Inserisci il codice">
                        <button class="apply-code-button">Applica</button>
                    </div>
                </div>
                
                <div class="checkout-form">
                    <h2>Informazioni di spedizione</h2>
                    <div class="form-group">
                        <label for="name">Nome e Cognome</label>
                        <input type="text" id="name" placeholder="Inserisci il tuo nome completo">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Inserisci la tua email">
                    </div>
                    <div class="form-group">
                        <label for="phone">Telefono</label>
                        <input type="tel" id="phone" placeholder="Inserisci il tuo numero di telefono">
                    </div>
                    <div class="form-group">
                        <label for="address">Indirizzo</label>
                        <input type="text" id="address" placeholder="Inserisci il tuo indirizzo completo">
                    </div>
                    <div class="form-group">
                        <label for="city">Città</label>
                        <input type="text" id="city" placeholder="Inserisci la tua città">
                    </div>
                    <div class="form-group">
                        <label for="zip">CAP</label>
                        <input type="text" id="zip" placeholder="Inserisci il tuo CAP">
                    </div>
                    
                    <button class="checkout-button">Completa l'ordine</button>
                    
                    <a href="index.html" class="back-button">Torna allo shop</a>
                </div>
            </div>
            
            <script>
                // Simulazione applicazione codice sconto
                document.querySelector('.apply-code-button').addEventListener('click', function() {
                    const codeInput = document.querySelector('.discount-code-input input');
                    const code = codeInput.value.trim().toUpperCase();
                    
                    if (code === 'WELCOME15' || code === 'EXTRA10') {
                        alert('Codice sconto applicato con successo! Riceverai accessori extra gratuiti con il tuo ordine.');
                        codeInput.value = '';
                    } else {
                        alert('Codice sconto non valido. Prova con WELCOME15 o EXTRA10.');
                    }
                });
                
                // Simulazione completamento ordine
                document.querySelector('.checkout-button').addEventListener('click', function() {
                    alert('Grazie per il tuo ordine! Riceverai una email di conferma a breve.');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 2000);
                });
            </script>
        </body>
        </html>
        `;
        
        // In un'implementazione reale, non creeresti questo file
        // ma reindirizzaresti a una pagina esistente
        console.log('Checkout page would be created in a real implementation');
    }

    // Inizializza i pulsanti CTA
    setupCTAButtons();
});
