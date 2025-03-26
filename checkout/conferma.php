<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ordine Confermato - StormJet X130</title>
    <meta name="description" content="Grazie per il tuo ordine di StormJet X130, il turbo ventilatore più potente sul mercato.">
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
    <link rel="stylesheet" href="css/confirmation-styles.css">
    
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
                <div class="step completed">
                    <span class="step-number"><i class="fas fa-check"></i></span>
                    <span class="step-name">Dati personali</span>
                </div>
                <div class="step completed">
                    <span class="step-number"><i class="fas fa-check"></i></span>
                    <span class="step-name">Pagamento</span>
                </div>
                <div class="step active">
                    <span class="step-number">3</span>
                    <span class="step-name">Conferma</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="checkout-main">
        <div class="container">
            <div class="confirmation-container">
                <div class="confirmation-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>Ordine Confermato!</h2>
                <p class="confirmation-message">Grazie per il tuo acquisto. Il tuo ordine è stato ricevuto e verrà elaborato a breve.</p>
                
                <div class="order-details">
                    <h3>Dettagli dell'ordine</h3>
                    <div class="order-info">
                        <div class="order-info-item">
                            <span class="label">Numero ordine:</span>
                            <span class="value" id="order-number">SJ-25032025-1234</span>
                        </div>
                        <div class="order-info-item">
                            <span class="label">Data:</span>
                            <span class="value" id="order-date">26 marzo 2025</span>
                        </div>
                        <div class="order-info-item">
                            <span class="label">Metodo di pagamento:</span>
                            <span class="value" id="payment-method">Carta di credito</span>
                        </div>
                        <div class="order-info-item">
                            <span class="label">Totale:</span>
                            <span class="value" id="order-total">€49,99</span>
                        </div>
                    </div>
                </div>
                
                <div class="shipping-details">
                    <h3>Informazioni di spedizione</h3>
                    <p>Spediremo il tuo ordine all'indirizzo fornito entro 24 ore. Riceverai un'email con il codice di tracciamento non appena il pacco sarà in viaggio.</p>
                    <div class="estimated-delivery">
                        <i class="fas fa-truck"></i>
                        <span>Consegna stimata: <strong id="delivery-date">29-30 marzo 2025</strong></span>
                    </div>
                </div>
                
                <div class="next-steps">
                    <h3>Prossimi passi</h3>
                    <ul>
                        <li><i class="fas fa-envelope"></i> Controlla la tua email per la conferma dell'ordine</li>
                        <li><i class="fas fa-box"></i> Riceverai un'altra email quando il tuo ordine verrà spedito</li>
                        <li><i class="fas fa-question-circle"></i> Per qualsiasi domanda, contatta il nostro servizio clienti</li>
                    </ul>
                </div>
                
                <div class="confirmation-actions">
                    <a href="../index.html" class="back-to-shop-btn">
                        <i class="fas fa-arrow-left"></i> Torna allo shop
                    </a>
                    <a href="#" class="track-order-btn" id="track-order-btn">
                        <i class="fas fa-truck"></i> Traccia il tuo ordine
                    </a>
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
    <script src="js/confirmation.js"></script>
</body>
</html>
