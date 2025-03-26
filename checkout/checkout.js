// JavaScript per la pagina di checkout
document.addEventListener('DOMContentLoaded', function() {
    // Gestione degli step del checkout
    const steps = document.querySelectorAll('.step');
    const stepContents = document.querySelectorAll('.checkout-step-content');
    const nextButtons = document.querySelectorAll('.next-step-btn');
    const backButtons = document.querySelectorAll('.back-step-btn');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const orderConfirmation = document.getElementById('order-confirmation');
    
    // Gestione dei pulsanti "Continua"
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            goToStep(nextStep);
        });
    });
    
    // Gestione dei pulsanti "Indietro"
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });
    
    // Funzione per passare a uno step specifico
    function goToStep(stepNumber) {
        // Validazione dei campi obbligatori prima di procedere
        if (!validateCurrentStep()) {
            return;
        }
        
        // Aggiorna lo stato degli step
        steps.forEach((step, index) => {
            if (index + 1 < stepNumber) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index + 1 === stepNumber) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
        
        // Mostra il contenuto dello step corrente
        stepContents.forEach((content, index) => {
            if (index + 1 === stepNumber) {
                content.classList.add('active');
                
                // Aggiorna i dati di riepilogo quando si arriva allo step 5
                if (stepNumber === 5) {
                    updateReviewData();
                }
            } else {
                content.classList.remove('active');
            }
        });
        
        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Validazione dello step corrente
    function validateCurrentStep() {
        // Implementazione di base, da espandere con validazioni reali
        return true;
    }
    
    // Gestione del pulsante "Conferma ordine"
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            // Validazione finale
            if (!document.getElementById('terms-conditions').checked) {
                alert('Devi accettare i Termini e Condizioni per procedere.');
                return;
            }
            
            // Nascondi tutti gli step
            stepContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Mostra la conferma dell'ordine
            orderConfirmation.classList.add('active');
            
            // Aggiorna i dati di conferma
            document.getElementById('confirmation-email').textContent = document.getElementById('email').value;
            document.getElementById('confirmation-total').textContent = document.getElementById('review-grand-total').textContent;
            
            // Determina il metodo di pagamento selezionato
            let paymentMethod = 'PayPal';
            if (document.getElementById('payment-bank-transfer').checked) {
                paymentMethod = 'Bonifico bancario';
            } else if (document.getElementById('payment-revolut').checked) {
                paymentMethod = 'Revolut';
            }
            document.getElementById('confirmation-payment').textContent = paymentMethod;
            
            // Genera un numero d'ordine casuale
            const orderNumber = 'ST' + Math.floor(10000000 + Math.random() * 90000000);
            document.getElementById('order-number').textContent = orderNumber;
        });
    }
    
    // Gestione della quantità prodotto
    const quantityInput = document.getElementById('quantity');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateTotals();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
                updateTotals();
            }
        });
        
        quantityInput.addEventListener('change', function() {
            updateTotals();
        });
    }
    
    // Gestione degli accessori
    const accessoryCheckboxes = document.querySelectorAll('.accessory-checkbox input');
    
    accessoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateTotals();
        });
    });
    
    // Gestione del codice sconto
    const applyDiscountBtn = document.getElementById('apply-discount');
    const discountCodeInput = document.getElementById('discount-code');
    
    if (applyDiscountBtn && discountCodeInput) {
        applyDiscountBtn.addEventListener('click', function() {
            const discountCode = discountCodeInput.value.trim().toUpperCase();
            
            if (discountCode === 'SCONTO10') {
                alert('Codice sconto applicato: 10% di sconto sugli accessori!');
                updateTotals(0.1); // 10% di sconto
            } else if (discountCode === 'SCONTO20') {
                alert('Codice sconto applicato: 20% di sconto sugli accessori!');
                updateTotals(0.2); // 20% di sconto
            } else {
                alert('Codice sconto non valido.');
                updateTotals(0);
            }
        });
    }
    
    // Gestione dei metodi di pagamento
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.querySelectorAll('.payment-specific-details');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Nascondi tutti i dettagli
            paymentDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Mostra i dettagli del metodo selezionato
            const selectedMethodId = this.id;
            const detailsId = selectedMethodId.replace('payment-', '') + '-details';
            document.getElementById(detailsId).style.display = 'block';
        });
    });
    
    // Gestione delle opzioni di spedizione
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    
    shippingOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateTotals();
        });
    });
    
    // Funzione per aggiornare i totali
    function updateTotals(discountRate = 0) {
        // Prezzo base del prodotto
        const basePrice = 49.99;
        const quantity = parseInt(document.getElementById('quantity').value);
        const subtotal = basePrice * quantity;
        
        // Calcola il totale degli accessori
        let accessoriesTotal = 0;
        const accessory1 = document.getElementById('accessory-1');
        const accessory2 = document.getElementById('accessory-2');
        
        if (accessory1 && accessory1.checked) {
            accessoriesTotal += 19.99;
        }
        
        if (accessory2 && accessory2.checked) {
            accessoriesTotal += 14.99;
        }
        
        // Calcola lo sconto (solo sugli accessori)
        const discountTotal = accessoriesTotal * discountRate;
        
        // Calcola la spedizione
        let shippingCost = 4.99; // Standard di default
        if (document.getElementById('shipping-express') && document.getElementById('shipping-express').checked) {
            shippingCost = 9.99;
        }
        
        // Calcola il totale
        const grandTotal = subtotal + accessoriesTotal - discountTotal + shippingCost;
        
        // Aggiorna i valori visualizzati
        document.getElementById('subtotal').textContent = '€' + subtotal.toFixed(2);
        document.getElementById('accessories-total').textContent = '€' + accessoriesTotal.toFixed(2);
        document.getElementById('discount-total').textContent = '-€' + discountTotal.toFixed(2);
        document.getElementById('shipping-total').textContent = '€' + shippingCost.toFixed(2);
        document.getElementById('grand-total').textContent = '€' + grandTotal.toFixed(2);
        
        // Aggiorna anche i totali nella sidebar
        document.getElementById('sidebar-subtotal').textContent = '€' + subtotal.toFixed(2);
        document.getElementById('sidebar-accessories-total').textContent = '€' + accessoriesTotal.toFixed(2);
        document.getElementById('sidebar-discount-total').textContent = '-€' + discountTotal.toFixed(2);
        document.getElementById('sidebar-shipping-total').textContent = '€' + shippingCost.toFixed(2);
        document.getElementById('sidebar-grand-total').textContent = '€' + grandTotal.toFixed(2);
        
        // Aggiorna la quantità visualizzata
        document.getElementById('sidebar-quantity').textContent = quantity;
        
        // Aggiorna gli accessori nella sidebar
        updateSidebarAccessories();
    }
    
    // Funzione per aggiornare gli accessori nella sidebar
    function updateSidebarAccessories() {
        const sidebarAccessories = document.getElementById('sidebar-accessories');
        sidebarAccessories.innerHTML = '';
        
        const accessory1 = document.getElementById('accessory-1');
        const accessory2 = document.getElementById('accessory-2');
        
        if (accessory1 && accessory1.checked) {
            const accessoryItem = document.createElement('div');
            accessoryItem.className = 'sidebar-product';
            accessoryItem.innerHTML = `
                <div class="sidebar-product-image">
                    <img src="../images/optimized/accessory_1.webp" alt="Set ugelli di precisione">
                </div>
                <div class="sidebar-product-details">
                    <h4>Set ugelli di precisione</h4>
                </div>
                <div class="sidebar-product-price">€19,99</div>
            `;
            sidebarAccessories.appendChild(accessoryItem);
        }
        
        if (accessory2 && accessory2.checked) {
            const accessoryItem = document.createElement('div');
            accessoryItem.className = 'sidebar-product';
            accessoryItem.innerHTML = `
                <div class="sidebar-product-image">
                    <img src="../images/optimized/accessory_2.webp" alt="Custodia premium">
                </div>
                <div class="sidebar-product-details">
                    <h4>Custodia premium</h4>
                </div>
                <div class="sidebar-product-price">€14,99</div>
            `;
            sidebarAccessories.appendChild(accessoryItem);
        }
    }
    
    // Funzione per aggiornare i dati di riepilogo nello step 5
    function updateReviewData() {
        // Dati personali
        document.getElementById('review-name').textContent = document.getElementById('first-name').value + ' ' + document.getElementById('last-name').value;
        document.getElementById('review-email').textContent = document.getElementById('email').value;
        document.getElementById('review-phone').textContent = document.getElementById('phone').value;
        
        // Indirizzo di spedizione
        document.getElementById('review-address').textContent = document.getElementById('address').value;
        document.getElementById('review-address-number').textContent = document.getElementById('address-number').value;
        document.getElementById('review-postal-code').textContent = document.getElementById('postal-code').value;
        document.getElementById('review-city').textContent = document.getElementById('city').value;
        document.getElementById('review-province').textContent = document.getElementById('province').value;
        
        // Paese
        const countrySelect = document.getElementById('country');
        document.getElementById('review-country').textContent = countrySelect.options[countrySelect.selectedIndex].text;
        
        // Metodo di spedizione
        if (document.getElementById('shipping-express').checked) {
            document.getElementById('review-shipping-method').textContent = 'Spedizione espressa (1-2 giorni lavorativi)';
        } else {
            document.getElementById('review-shipping-method').textContent = 'Spedizione standard (2-5 giorni lavorativi)';
        }
        
        // Metodo di pagamento
        if (document.getElementById('payment-bank-transfer').checked) {
            document.getElementById('review-payment-method').textContent = 'Bonifico bancario';
        } else if (document.getElementById('payment-revolut').checked) {
            document.getElementById('review-payment-method').textContent = 'Revolut';
        } else {
            document.getElementById('review-payment-method').textContent = 'PayPal';
        }
        
        // Quantità
        document.getElementById('review-quantity').textContent = document.getElementById('quantity').value;
        
        // Totali
        document.getElementById('review-subtotal').textContent = document.getElementById('subtotal').textContent;
        document.getElementById('review-accessories-total').textContent = document.getElementById('accessories-total').textContent;
        document.getElementById('review-discount-total').textContent = document.getElementById('discount-total').textContent;
        document.getElementById('review-shipping-total').textContent = document.getElementById('shipping-total').textContent;
        document.getElementById('review-grand-total').textContent = document.getElementById('grand-total').textContent;
        
        // Accessori
        const reviewAccessories = document.getElementById('review-accessories');
        reviewAccessories.innerHTML = '';
        
        const accessory1 = document.getElementById('accessory-1');
        const accessory2 = document.getElementById('accessory-2');
        
        if (accessory1 && accessory1.checked) {
            const accessoryItem = document.createElement('div');
            accessoryItem.className = 'review-product';
            accessoryItem.innerHTML = `
                <div class="review-product-image">
                    <img src="../images/optimized/accessory_1.webp" alt="Set ugelli di precisione">
                </div>
                <div class="review-product-details">
                    <h4>Set ugelli di precisione</h4>
                </div>
                <div class="review-product-price">€19,99</div>
            `;
            reviewAccessories.appendChild(accessoryItem);
        }
        
        if (accessory2 && accessory2.checked) {
            const accessoryItem = document.createElement('div');
            accessoryItem.className = 'review-product';
            accessoryItem.innerHTML = `
                <div class="review-product-image">
                    <img src="../images/optimized/accessory_2.webp" alt="Custodia premium">
                </div>
                <div class="review-product-details">
                    <h4>Custodia premium</h4>
                </div>
                <div class="review-product-price">€14,99</div>
            `;
            reviewAccessories.appendChild(accessoryItem);
        }
    }
    
    // Inizializza i totali
    updateTotals();
});
