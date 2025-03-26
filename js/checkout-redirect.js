/**
 * Checkout Redirect Script - Versione ottimizzata
 * 
 * Questo script gestisce il reindirizzamento corretto dei pulsanti "Acquista ora"
 * verso una pagina di checkout completa con form per i dati cliente e pagamento.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Seleziona tutti i pulsanti di acquisto
    const buyButtons = document.querySelectorAll('.cta-button, .package-button, .popup-button');
    
    // Aggiungi event listener a ciascun pulsante
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ottieni l'URL originale dal pulsante
            const originalUrl = this.getAttribute('href');
            
            // Verifica che l'URL sia valido
            if (!originalUrl || !originalUrl.includes('checkout.php')) {
                console.error('URL di checkout non valido:', originalUrl);
                alert('Si è verificato un errore. Riprova più tardi.');
                return;
            }
            
            // Estrai i parametri dall'URL
            const urlParams = new URLSearchParams(originalUrl.split('?')[1]);
            const packageType = urlParams.get('package');
            const price = urlParams.get('price');
            const productId = urlParams.get('id');
            const source = urlParams.get('source') || 'landing_page';
            
            // Verifica che i parametri essenziali siano presenti
            if (!packageType || !price || !productId) {
                console.error('Parametri mancanti nell\'URL di checkout:', originalUrl);
                alert('Si è verificato un errore. Riprova più tardi.');
                return;
            }
            
            // Verifica il prezzo unitario minimo
            let quantity = 1;
            if (packageType === 'double') quantity = 2;
            if (packageType === 'triple') quantity = 3;
            
            if (!validateMinimumUnitPrice(parseFloat(price), quantity)) {
                console.error('Prezzo unitario inferiore al minimo consentito');
                // Correggi il prezzo
                const correctedPrice = (49.99 * quantity).toFixed(2);
                console.log(`Correzione automatica del prezzo: ${price} -> ${correctedPrice}`);
                urlParams.set('price', correctedPrice);
            }
            
            // Crea l'URL per la pagina di checkout completa
            // Usa percorso relativo per maggiore compatibilità
            const checkoutUrl = `checkout/index.php?${urlParams.toString()}`;
            
            // Salva i dati dell'ordine in localStorage per il recupero nella pagina di checkout
            localStorage.setItem('stormjet_order', JSON.stringify({
                package: packageType,
                price: urlParams.get('price'), // Usa il prezzo potenzialmente corretto
                id: productId,
                source: source,
                timestamp: new Date().toISOString()
            }));
            
            // Aggiungi un piccolo ritardo per dare tempo al localStorage di salvare
            setTimeout(() => {
                // Reindirizza alla pagina di checkout
                window.location.href = checkoutUrl;
            }, 100);
        });
    });
    
    // Validazione del prezzo unitario minimo
    function validateMinimumUnitPrice(price, quantity) {
        const minUnitPrice = 49.99;
        const unitPrice = price / quantity;
        
        // Verifica che il prezzo unitario non sia inferiore al minimo consentito
        if (unitPrice < minUnitPrice) {
            console.error(`Prezzo unitario (${unitPrice.toFixed(2)}) inferiore al minimo consentito (${minUnitPrice})`);
            return false;
        }
        
        return true;
    }
    
    // Funzione per applicare codici sconto solo agli accessori
    window.applyDiscountCode = function(code) {
        // Ottieni i dati dell'ordine dal localStorage
        const orderData = JSON.parse(localStorage.getItem('stormjet_order') || '{}');
        
        // Inizializza gli sconti sugli accessori
        let accessoryDiscount = 0;
        let freeShipping = false;
        let freeAccessories = false;
        
        // Applica lo sconto in base al codice
        switch(code.toUpperCase()) {
            case 'WELCOME15':
                // 15% di sconto sugli accessori
                accessoryDiscount = 0.15;
                break;
            case 'EXTRA10':
                // Accessori extra gratuiti
                freeAccessories = true;
                break;
            default:
                console.warn('Codice sconto non valido');
                return false;
        }
        
        // Salva i dati dello sconto
        localStorage.setItem('stormjet_discount', JSON.stringify({
            code: code.toUpperCase(),
            accessoryDiscount: accessoryDiscount,
            freeShipping: freeShipping,
            freeAccessories: freeAccessories
        }));
        
        return true;
    };
    
    // Funzione per calcolare il prezzo finale
    window.calculateFinalPrice = function() {
        // Ottieni i dati dell'ordine dal localStorage
        const orderData = JSON.parse(localStorage.getItem('stormjet_order') || '{}');
        const discountData = JSON.parse(localStorage.getItem('stormjet_discount') || '{}');
        
        // Prezzo base del prodotto (non scontabile)
        const basePrice = parseFloat(orderData.price || 0);
        
        // Prezzo degli accessori (scontabile)
        const accessoryPrice = 9.99; // Esempio di prezzo accessori
        
        // Prezzo della spedizione
        let shippingPrice = basePrice >= 100 ? 0 : 4.99;
        
        // Applica gli sconti
        let discountedAccessoryPrice = accessoryPrice;
        if (discountData.accessoryDiscount) {
            discountedAccessoryPrice = accessoryPrice * (1 - discountData.accessoryDiscount);
        }
        
        if (discountData.freeAccessories) {
            discountedAccessoryPrice = 0;
        }
        
        if (discountData.freeShipping) {
            shippingPrice = 0;
        }
        
        // Calcola il prezzo finale
        const finalPrice = basePrice + discountedAccessoryPrice + shippingPrice;
        
        return {
            basePrice: basePrice,
            accessoryPrice: accessoryPrice,
            discountedAccessoryPrice: discountedAccessoryPrice,
            shippingPrice: shippingPrice,
            finalPrice: finalPrice,
            discount: accessoryPrice - discountedAccessoryPrice
        };
    };
    
    // Verifica che la directory checkout esista
    function checkCheckoutDirectory() {
        // Crea un elemento immagine nascosto per verificare se la directory checkout esiste
        const testImg = document.createElement('img');
        testImg.style.display = 'none';
        testImg.src = 'checkout/test-directory.gif';
        
        testImg.onerror = function() {
            console.error('Directory checkout non trovata. I reindirizzamenti potrebbero non funzionare correttamente.');
        };
        
        document.body.appendChild(testImg);
        setTimeout(() => {
            document.body.removeChild(testImg);
        }, 1000);
    }
    
    // Esegui la verifica della directory checkout
    checkCheckoutDirectory();
});
