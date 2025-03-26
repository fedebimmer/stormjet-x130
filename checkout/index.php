<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkout - StormJet X130</title>
    <meta name="description" content="Completa il tuo acquisto di StormJet X130, il turbo ventilatore più potente sul mercato.">
    <!-- CSS di base -->
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/mobile-optimizations.css">
    <link rel="stylesheet" href="../css/conversion-elements.css">
    
    <!-- CSS ottimizzati -->
    <link rel="stylesheet" href="../css/readability-improvements.css">
    <link rel="stylesheet" href="../css/font-optimizations.css">
    <link rel="stylesheet" href="../css/responsive-design.css">
    <link rel="stylesheet" href="../css/responsive-fixes.css">
    
    <!-- CSS per miglioramenti di contrasto e leggibilità -->
    <link rel="stylesheet" href="../css/contrast-improvements.css">
    <link rel="stylesheet" href="../css/title-contrast-fixes.css">
    
    <!-- CSS specifico per il checkout -->
    <link rel="stylesheet" href="css/checkout-styles.css">
    
    <!-- Font e icone -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header -->
    <header class="checkout-header">
        <div class="container">
            <div class="logo">
                <h1>StormJet<span>X130</span></h1>
            </div>
            <div class="checkout-steps">
                <div class="step active">
                    <span class="step-number">1</span>
                    <span class="step-name">Dati personali</span>
                </div>
                <div class="step">
                    <span class="step-number">2</span>
                    <span class="step-name">Pagamento</span>
                </div>
                <div class="step">
                    <span class="step-number">3</span>
                    <span class="step-name">Conferma</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="checkout-main">
        <div class="container">
            <div class="checkout-grid">
                <!-- Colonna sinistra - Form di checkout -->
                <div class="checkout-form-container">
                    <h2>Completa il tuo ordine</h2>
                    
                    <!-- Form dati personali -->
                    <form id="checkout-form" class="checkout-form">
                        <div class="form-section" id="personal-info-section">
                            <h3>Dati personali</h3>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="first-name">Nome *</label>
                                    <input type="text" id="first-name" name="first-name" required aria-required="true">
                                </div>
                                <div class="form-group">
                                    <label for="last-name">Cognome *</label>
                                    <input type="text" id="last-name" name="last-name" required aria-required="true">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email *</label>
                                <input type="email" id="email" name="email" required aria-required="true">
                            </div>
                            
                            <div class="form-group">
                                <label for="phone">Telefono *</label>
                                <input type="tel" id="phone" name="phone" required aria-required="true">
                            </div>
                        </div>
                        
                        <div class="form-section" id="shipping-info-section">
                            <h3>Indirizzo di spedizione</h3>
                            
                            <div class="form-group">
                                <label for="address">Indirizzo *</label>
                                <input type="text" id="address" name="address" required aria-required="true">
                            </div>
                            
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="city">Città *</label>
                                    <input type="text" id="city" name="city" required aria-required="true">
                                </div>
                                <div class="form-group">
                                    <label for="zip">CAP *</label>
                                    <input type="text" id="zip" name="zip" required aria-required="true">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="country">Paese *</label>
                                <select id="country" name="country" required aria-required="true">
                                    <option value="IT" selected>Italia</option>
                                    <option value="FR">Francia</option>
                                    <option value="DE">Germania</option>
                                    <option value="ES">Spagna</option>
                                    <option value="UK">Regno Unito</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-section" id="payment-info-section">
                            <h3>Metodo di pagamento</h3>
                            
                            <div class="payment-methods">
                                <div class="payment-method">
                                    <input type="radio" id="payment-card" name="payment-method" value="card" checked>
                                    <label for="payment-card">
                                        <i class="fas fa-credit-card"></i> Carta di credito/debito
                                    </label>
                                </div>
                                <div class="payment-method">
                                    <input type="radio" id="payment-paypal" name="payment-method" value="paypal">
                                    <label for="payment-paypal">
                                        <i class="fab fa-paypal"></i> PayPal
                                    </label>
                                </div>
                                <div class="payment-method">
                                    <input type="radio" id="payment-bank" name="payment-method" value="bank">
                                    <label for="payment-bank">
                                        <i class="fas fa-university"></i> Bonifico bancario
                                    </label>
                                </div>
                            </div>
                            
                            <div id="card-payment-details">
                                <div class="form-group">
                                    <label for="card-number">Numero carta *</label>
                                    <input type="text" id="card-number" name="card-number" placeholder="1234 5678 9012 3456">
                                </div>
                                
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="card-expiry">Scadenza *</label>
                                        <input type="text" id="card-expiry" name="card-expiry" placeholder="MM/AA">
                                    </div>
                                    <div class="form-group">
                                        <label for="card-cvc">CVC *</label>
                                        <input type="text" id="card-cvc" name="card-cvc" placeholder="123">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="card-name">Nome sulla carta *</label>
                                    <input type="text" id="card-name" name="card-name">
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section" id="discount-code-section">
                            <h3>Codice sconto</h3>
                            
                            <div class="form-group discount-code-input">
                                <input type="text" id="discount-code" name="discount-code" placeholder="Inserisci il tuo codice sconto">
                                <button type="button" id="apply-discount" class="apply-discount-btn">Applica</button>
                            </div>
                            <p class="discount-note">* I codici sconto si applicano solo agli accessori extra e alla spedizione, non al prezzo base del prodotto.</p>
                        </div>
                        
                        <div class="form-actions">
                            <a href="../index.html" class="back-button">
                                <i class="fas fa-arrow-left"></i> Torna allo shop
                            </a>
                            <button type="submit" class="checkout-submit-btn">
                                Completa l'ordine <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </form>
                </div>
                
                <!-- Colonna destra - Riepilogo ordine -->
                <div class="order-summary-container">
                    <div class="order-summary">
                        <h3>Riepilogo ordine</h3>
                        
                        <div class="order-items" id="order-items">
                            <!-- Contenuto generato dinamicamente da JavaScript -->
                        </div>
                        
                        <div class="order-totals">
                            <div class="order-subtotal">
                                <span>Subtotale:</span>
                                <span id="subtotal-amount">€49,99</span>
                            </div>
                            <div class="order-shipping">
                                <span>Spedizione:</span>
                                <span id="shipping-amount">€4,99</span>
                            </div>
                            <div class="order-discount" id="discount-row" style="display: none;">
                                <span>Sconto:</span>
                                <span id="discount-amount">-€0,00</span>
                            </div>
                            <div class="order-total">
                                <span>Totale:</span>
                                <span id="total-amount">€54,98</span>
                            </div>
                        </div>
                        
                        <div class="secure-checkout">
                            <i class="fas fa-lock"></i> Pagamento sicuro e crittografato
                        </div>
                        
                        <div class="satisfaction-guarantee">
                            <i class="fas fa-shield-alt"></i> Garanzia di rimborso di 30 giorni
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="checkout-footer">
        <div class="container">
            <div class="footer-content">
                <p>&copy; 2025 StormJet X130. Tutti i diritti riservati.</p>
                <div class="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Termini e Condizioni</a>
                </div>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script src="../js/main.js"></script>
    <script src="js/checkout.js"></script>
</body>
</html>
