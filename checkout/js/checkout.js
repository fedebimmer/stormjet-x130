/**
 * Checkout JavaScript
 * 
 * Questo script gestisce la funzionalità della pagina di checkout,
 * incluso il recupero dei dati dell'ordine, l'applicazione di codici sconto,
 * e la validazione del form.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Recupera i dati dell'ordine dal localStorage
    const orderData = JSON.parse(localStorage.getItem('stormjet_order') || '{}');
    const discountData = JSON.parse(localStorage.getItem('stormjet_discount') || '{}');
    
    // Popola il riepilogo dell'ordine
    populateOrderSummary(orderData);
    
    // Gestisce l'applicazione del codice sconto
    setupDiscountCode();
    
    // Gestisce la visualizzazione dei dettagli di pagamento
    setupPaymentMethodToggle();
    
    // Gestisce la validazione e l'invio del form
    setupFormValidation();
    
    // Applica eventuali sconti già presenti
    if (discountData.code) {
        document.getElementById('discount-code').value = discountData.code;
        applyDiscount(discountData.code);
    }
});

/**
 * Popola il riepilogo dell'ordine con i dati recuperati
 */
function populateOrderSummary(orderData) {
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal-amount');
    const shippingElement = document.getElementById('shipping-amount');
    const totalElement = document.getElementById('total-amount');
    
    // Valori predefiniti se non ci sono dati
    let packageType = orderData.package || 'single';
    let price = parseFloat(orderData.price || 49.99);
    let productId = orderData.id || 'SJ130-1';
    
    // Determina la quantità in base al tipo di pacchetto
    let quantity = 1;
    if (packageType === 'double') quantity = 2;
    if (packageType === 'triple') quantity = 3;
    
    // Verifica che il prezzo unitario non sia inferiore al minimo consentito (€49,99)
    const unitPrice = price / quantity;
    if (unitPrice < 49.99) {
        console.error(`Prezzo unitario (${unitPrice.toFixed(2)}) inferiore al minimo consentito (49.99)`);
        // Correggi il prezzo
        price = 49.99 * quantity;
    }
    
    // Crea l'elemento dell'ordine
    let orderItemHTML = `
        <div class="order-item">
            <div class="order-item-image">
                <img src="../images/optimized/product_1.webp" alt="StormJet X130">
            </div>
            <div class="order-item-details">
                <div class="order-item-name">StormJet X130</div>
                <div class="order-item-price">€${(price / quantity).toFixed(2)} per unità</div>
            </div>
            <div class="order-item-quantity">x${quantity}</div>
        </div>
    `;
    
    orderItemsContainer.innerHTML = orderItemHTML;
    
    // Calcola e visualizza i totali
    const subtotal = price;
    const shipping = subtotal >= 100 ? 0 : 4.99;
    const total = subtotal + shipping;
    
    subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'Gratuita' : `€${shipping.toFixed(2)}`;
    totalElement.textContent = `€${total.toFixed(2)}`;
    
    // Salva i dati aggiornati
    orderData.price = price;
    localStorage.setItem('stormjet_order', JSON.stringify(orderData));
}

/**
 * Configura la funzionalità del codice sconto
 */
function setupDiscountCode() {
    const applyButton = document.getElementById('apply-discount');
    const discountInput = document.getElementById('discount-code');
    const discountRow = document.getElementById('discount-row');
    const discountAmount = document.getElementById('discount-amount');
    const totalAmount = document.getElementById('total-amount');
    
    applyButton.addEventListener('click', function() {
        const code = discountInput.value.trim();
        if (code) {
            applyDiscount(code);
        }
    });
    
    function applyDiscount(code) {
        // Ottieni i dati dell'ordine
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
                showDiscountApplied('Sconto del 15% sugli accessori applicato!');
                break;
            case 'EXTRA10':
                // Accessori extra gratuiti
                freeAccessories = true;
                showDiscountApplied('Accessori extra gratuiti applicati!');
                break;
            default:
                showDiscountError('Codice sconto non valido');
                return false;
        }
        
        // Salva i dati dello sconto
        localStorage.setItem('stormjet_discount', JSON.stringify({
            code: code.toUpperCase(),
            accessoryDiscount: accessoryDiscount,
            freeShipping: freeShipping,
            freeAccessories: freeAccessories
        }));
        
        // Calcola il nuovo totale
        const subtotal = parseFloat(orderData.price || 49.99);
        const accessoryPrice = 9.99; // Esempio di prezzo accessori
        let shippingPrice = subtotal >= 100 ? 0 : 4.99;
        
        // Applica gli sconti
        let discountValue = 0;
        
        if (accessoryDiscount > 0) {
            discountValue = accessoryPrice * accessoryDiscount;
        }
        
        if (freeAccessories) {
            discountValue = accessoryPrice;
        }
        
        if (freeShipping) {
            shippingPrice = 0;
            document.getElementById('shipping-amount').textContent = 'Gratuita';
        }
        
        // Aggiorna la visualizzazione dello sconto
        if (discountValue > 0) {
            discountRow.style.display = 'flex';
            discountAmount.textContent = `-€${discountValue.toFixed(2)}`;
        }
        
        // Calcola il nuovo totale
        const total = subtotal + accessoryPrice + shippingPrice - discountValue;
        totalAmount.textContent = `€${total.toFixed(2)}`;
        
        return true;
    }
    
    function showDiscountApplied(message) {
        const discountNote = document.querySelector('.discount-note');
        discountNote.innerHTML = `<span style="color: #28a745; font-weight: 600;">${message}</span><br>* Il codice sconto si applica solo agli accessori extra, non al prezzo base del prodotto.`;
    }
    
    function showDiscountError(message) {
        const discountNote = document.querySelector('.discount-note');
        discountNote.innerHTML = `<span style="color: #dc3545; font-weight: 600;">${message}</span><br>* I codici sconto si applicano solo agli accessori extra, non al prezzo base del prodotto.`;
    }
}

/**
 * Configura il toggle per i metodi di pagamento
 */
function setupPaymentMethodToggle() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const cardDetails = document.getElementById('card-payment-details');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

/**
 * Configura la validazione e l'invio del form
 */
function setupFormValidation() {
    const form = document.getElementById('checkout-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verifica che tutti i campi obbligatori siano compilati
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        // Se il metodo di pagamento è carta, verifica i campi della carta
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        if (paymentMethod === 'card') {
            const cardFields = ['card-number', 'card-expiry', 'card-cvc', 'card-name'];
            cardFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
        }
        
        if (isValid) {
            // Simula l'invio del form
            simulateFormSubmission();
        } else {
            // Mostra un messaggio di errore
            alert('Per favore, compila tutti i campi obbligatori.');
        }
    });
    
    function simulateFormSubmission() {
        // Disabilita il pulsante di invio
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Elaborazione in corso...';
        
        // Simula un ritardo di elaborazione
        setTimeout(function() {
            // Reindirizza alla pagina di conferma
            window.location.href = 'conferma.php';
        }, 2000);
    }
}
