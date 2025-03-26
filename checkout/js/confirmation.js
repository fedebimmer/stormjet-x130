/**
 * Confirmation JavaScript
 * 
 * Questo script gestisce la funzionalità della pagina di conferma dell'ordine,
 * incluso il recupero dei dati dell'ordine e la visualizzazione delle informazioni.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Recupera i dati dell'ordine dal localStorage
    const orderData = JSON.parse(localStorage.getItem('stormjet_order') || '{}');
    const discountData = JSON.parse(localStorage.getItem('stormjet_discount') || '{}');
    
    // Popola i dettagli dell'ordine
    populateOrderDetails(orderData, discountData);
    
    // Gestisce il pulsante di tracciamento dell'ordine
    setupTrackingButton();
    
    // Genera date di consegna stimate
    setupDeliveryDates();
});

/**
 * Popola i dettagli dell'ordine con i dati recuperati
 */
function populateOrderDetails(orderData, discountData) {
    // Genera un numero d'ordine casuale
    const orderNumber = document.getElementById('order-number');
    const today = new Date();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    orderNumber.textContent = `SJ-${today.getDate()}${today.getMonth() + 1}${today.getFullYear()}-${randomNum}`;
    
    // Imposta la data dell'ordine
    const orderDate = document.getElementById('order-date');
    orderDate.textContent = today.toLocaleDateString('it-IT', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Imposta il metodo di pagamento (simulato)
    const paymentMethod = document.getElementById('payment-method');
    paymentMethod.textContent = 'Carta di credito';
    
    // Calcola e visualizza il totale dell'ordine
    const orderTotal = document.getElementById('order-total');
    
    // Valori predefiniti se non ci sono dati
    let packageType = orderData.package || 'single';
    let price = parseFloat(orderData.price || 49.99);
    
    // Determina la quantità in base al tipo di pacchetto
    let quantity = 1;
    if (packageType === 'double') quantity = 2;
    if (packageType === 'triple') quantity = 3;
    
    // Verifica che il prezzo unitario non sia inferiore al minimo consentito (€49,99)
    const unitPrice = price / quantity;
    if (unitPrice < 49.99) {
        // Correggi il prezzo
        price = 49.99 * quantity;
    }
    
    // Calcola il totale con eventuali sconti
    const accessoryPrice = 9.99; // Esempio di prezzo accessori
    let shippingPrice = price >= 100 ? 0 : 4.99;
    
    // Applica gli sconti
    let discountValue = 0;
    
    if (discountData.accessoryDiscount) {
        discountValue = accessoryPrice * discountData.accessoryDiscount;
    }
    
    if (discountData.freeAccessories) {
        discountValue = accessoryPrice;
    }
    
    if (discountData.freeShipping) {
        shippingPrice = 0;
    }
    
    // Calcola il totale finale
    const total = price + accessoryPrice + shippingPrice - discountValue;
    orderTotal.textContent = `€${total.toFixed(2)}`;
    
    // Pulisci i dati dell'ordine dal localStorage
    // Questo è opzionale, ma è una buona pratica per la privacy
    // localStorage.removeItem('stormjet_order');
    // localStorage.removeItem('stormjet_discount');
}

/**
 * Configura il pulsante di tracciamento dell'ordine
 */
function setupTrackingButton() {
    const trackButton = document.getElementById('track-order-btn');
    
    trackButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Simula l'apertura di una pagina di tracciamento
        alert('Il sistema di tracciamento sarà disponibile entro 24 ore dalla spedizione del tuo ordine.');
    });
}

/**
 * Genera e visualizza le date di consegna stimate
 */
function setupDeliveryDates() {
    const deliveryDate = document.getElementById('delivery-date');
    
    // Calcola la data di consegna stimata (3-4 giorni da oggi)
    const today = new Date();
    const deliveryStart = new Date(today);
    deliveryStart.setDate(today.getDate() + 3);
    
    const deliveryEnd = new Date(today);
    deliveryEnd.setDate(today.getDate() + 4);
    
    // Formatta le date
    const startDay = deliveryStart.getDate();
    const endDay = deliveryEnd.getDate();
    const month = deliveryEnd.toLocaleDateString('it-IT', { month: 'long' });
    const year = deliveryEnd.getFullYear();
    
    // Visualizza il range di date
    deliveryDate.textContent = `${startDay}-${endDay} ${month} ${year}`;
}
