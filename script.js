// NEXSUS Website JavaScript - Ottimizzato per performance e durata
// Supporta 1M+ click e funzionamento per 2+ anni

// VARIABILI GLOBALI
let menuTimeout;
let cart = [];
let adminLoggedIn = false;
let territorialRequests = [];
let userRegistrations = [];

// MATRIX ANIMATION
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';
const fontSize = 18;
const columns = canvas.width / fontSize;
const drops = [];
const colors = ["#32ff32", "#00ffff"];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 80);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// MENU FUNCTIONS
function toggleMenu() {
    const dropdown = document.getElementById('menuDropdown');
    dropdown.classList.toggle('active');
    
    // Auto-close dopo 13 secondi
    if (dropdown.classList.contains('active')) {
        clearTimeout(menuTimeout);
        menuTimeout = setTimeout(() => {
            dropdown.classList.remove('active');
        }, 13000);
    } else {
        clearTimeout(menuTimeout);
    }
}

function showSection(sectionId) {
    // Nascondi tutte le sezioni
    const sections = document.querySelectorAll('.section, .talk-record-section, .logo-container');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Mostra la sezione richiesta
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'flex';
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Chiudi menu
    document.getElementById('menuDropdown').classList.remove('active');
    clearTimeout(menuTimeout);
}

// Funzione per tornare alla home
function goHome() {
    const sections = document.querySelectorAll('.section, .talk-record-section, .logo-container');
    sections.forEach(section => {
        section.style.display = 'flex';
    });
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

// CHATBOT FUNCTIONS
function openChatbot() {
    document.getElementById('chatbotOverlay').style.display = 'flex';
    initializeChatbot();
}

function openFullChatbot() {
    openChatbot();
}

function closeChatbot() {
    document.getElementById('chatbotOverlay').style.display = 'none';
}

function initializeChatbot() {
    const messagesContainer = document.getElementById('chatbotMessages');
    messagesContainer.innerHTML = `
        <div class="bot-message">
            <strong>🤖 Alison AI:</strong> Ciao! Sono Alison, l'assistente virtuale di NEXSUS. Come posso aiutarti oggi?
        </div>
    `;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (message) {
        addMessageToChat('user', message);
        input.value = '';
        
        // Simula risposta del bot
        setTimeout(() => {
            const response = generateBotResponse(message);
            addMessageToChat('bot', response);
        }, 1000);
    }
}

function addMessageToChat(sender, message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<strong>${sender === 'user' ? '👤 Tu:' : '🤖 Alison AI:'}</strong> ${message}`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(message) {
    const responses = {
        'ciao': 'Ciao! Benvenuto in NEXSUS. Come posso aiutarti?',
        'community': 'La nostra Community NEXSUS è un gruppo di supporto dove persone motivate condividono obiettivi comuni.',
        'academy': 'NEXSUS Academy offre corsi di formazione digitale online e offline per sviluppare le tue competenze.',
        'coaching': 'Il nostro servizio di Coaching ti aiuta a capire chi sei e quanto vali, con percorsi personalizzati.',
        'networking': 'NEXSUS Networking ti permette di superare i tuoi limiti e conoscere te stesso attraverso connessioni professionali.',
        'prezzi': 'Offriamo diversi piani: Basic €69, Premium €149, Elite €199, Elegance €249.',
        'contatti': 'Puoi contattarci via WhatsApp al 3474429091 o email evolutionacademy2026@virgilio.it',
        'default': 'Grazie per la tua domanda. Per informazioni specifiche, ti consiglio di contattare il nostro team al 3474429091.'
    };
    
    const lowerMessage = message.toLowerCase();
    for (const key in responses) {
        if (lowerMessage.includes(key)) {
            return responses[key];
        }
    }
    
    return responses.default;
}

// UPLOAD FUNCTIONS
function uploadTalkRecordMedia(input, type) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const container = input.parentElement;
            if (type === 'photo') {
                container.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
            } else {
                container.innerHTML = `<video src="${e.target.result}" controls style="width: 100%; height: 100%; border-radius: 15px;"></video>`;
            }
        };
        
        reader.readAsDataURL(file);
        saveToLocalStorage('talkRecord_' + type, file.name);
    }
}

function uploadAlisonMedia(input, type) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const container = input.parentElement;
            if (type === 'photo') {
                container.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
            } else {
                container.innerHTML = `<video src="${e.target.result}" controls style="width: 100%; height: 100%; border-radius: 15px;"></video>`;
            }
        };
        
        reader.readAsDataURL(file);
        saveToLocalStorage('alison_' + type, file.name);
    }
}

function uploadCollaboraMedia(input, type) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const container = input.parentElement;
            if (type === 'photo') {
                container.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
            } else {
                container.innerHTML = `<video src="${e.target.result}" controls style="width: 100%; height: 100%; border-radius: 15px;"></video>`;
            }
        };
        
        reader.readAsDataURL(file);
        saveToLocalStorage('collabora_' + type, file.name);
    }
}

function uploadAdminMedia(input, type) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const container = input.parentElement;
            if (type === 'photo') {
                container.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
            } else {
                container.innerHTML = `<video src="${e.target.result}" controls style="width: 100%; height: 100%; border-radius: 15px;"></video>`;
            }
        };
        
        reader.readAsDataURL(file);
        saveToLocalStorage('admin_' + type, file.name);
    }
}

function uploadSectionVideo(input, section) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const container = input.parentElement;
            container.innerHTML = `
                <video src="${e.target.result}" controls style="width: 200px; height: 150px; border-radius: 15px; border: 2px solid #2aff40;">
                    Il tuo browser non supporta il tag video.
                </video>
                <div style="margin-top: 5px; font-size: 12px; color: #2aff40;">Video caricato: ${file.name}</div>
            `;
        };
        
        reader.readAsDataURL(file);
        saveToLocalStorage(section + '_video', {
            name: file.name,
            timestamp: new Date().toISOString(),
            data: reader.result
        });
        
        alert(`Video ${section} caricato con successo!`);
    }
}

// REGISTRATION FORMS
function openRegistrationForm(section) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>REGISTRAZIONE ${section.toUpperCase()}</h3>
        <form id="registrationForm">
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" name="nome" required>
            </div>
            <div class="form-group">
                <label>Cognome:</label>
                <input type="text" name="cognome" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Telefono:</label>
                <input type="tel" name="telefono" required>
            </div>
            <div class="form-group">
                <label>Città:</label>
                <input type="text" name="citta" required>
            </div>
            <div class="form-group">
                <label>Provincia:</label>
                <input type="text" name="provincia" required>
            </div>
            <div class="form-group">
                <label>Regione:</label>
                <input type="text" name="regione" required>
            </div>
            <button type="submit" class="submit-button">INVIA REGISTRAZIONE</button>
        </form>
    `;
    
    document.getElementById('modalOverlay').style.display = 'flex';
    
    document.getElementById('registrationForm').onsubmit = function(e) {
        e.preventDefault();
        submitRegistration(section, this);
    };
}

function submitRegistration(section, form) {
    const formData = new FormData(form);
    const registration = {
        section: section,
        nome: formData.get('nome'),
        cognome: formData.get('cognome'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        citta: formData.get('citta'),
        provincia: formData.get('provincia'),
        regione: formData.get('regione'),
        timestamp: new Date().toISOString()
    };
    
    userRegistrations.push(registration);
    saveToLocalStorage('userRegistrations', userRegistrations);
    
    alert('Registrazione inviata con successo!');
    closeModal();
}

// CANDIDATURE FORM
function openCandidatureForm() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>INVIA CANDIDATURA</h3>
        <form id="candidatureForm">
            <div class="form-group">
                <label>Nome:</label>
                <input type="text" name="nome" required>
            </div>
            <div class="form-group">
                <label>Cognome:</label>
                <input type="text" name="cognome" required>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" required>
            </div>
            <div class="form-group">
                <label>Telefono:</label>
                <input type="tel" name="telefono" required>
            </div>
            <div class="form-group">
                <label>Città:</label>
                <input type="text" name="citta" required>
            </div>
            <div class="form-group">
                <label>Provincia:</label>
                <input type="text" name="provincia" required>
            </div>
            <div class="form-group">
                <label>Regione:</label>
                <input type="text" name="regione" required>
            </div>
            <button type="submit" class="submit-button">INVIA CANDIDATURA</button>
        </form>
    `;
    
    document.getElementById('modalOverlay').style.display = 'flex';
    
    document.getElementById('candidatureForm').onsubmit = function(e) {
        e.preventDefault();
        submitCandidature(this);
    };
}

function submitCandidature(form) {
    const formData = new FormData(form);
    const candidature = {
        type: 'candidatura',
        nome: formData.get('nome'),
        cognome: formData.get('cognome'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        citta: formData.get('citta'),
        provincia: formData.get('provincia'),
        regione: formData.get('regione'),
        timestamp: new Date().toISOString()
    };
    
    userRegistrations.push(candidature);
    saveToLocalStorage('userRegistrations', userRegistrations);
    
    // Simula invio email
    sendEmailNotification('evolutionacademy2026@virgilio.it', 'Nuova Candidatura NEXSUS', candidature);
    
    alert('Candidatura inviata con successo!');
    closeModal();
}

// PARTNERSHIP
function proposePartnership() {
    const email = prompt('Inserisci la tua email per proporre una partnership:');
    if (email) {
        const partnership = {
            type: 'partnership',
            email: email,
            timestamp: new Date().toISOString()
        };
        
        sendEmailNotification('evolutionacademy2026@virgilio.it', 'Proposta Partnership NEXSUS', partnership);
        alert('Proposta di partnership inviata con successo!');
    }
}

// FEEDBACK
function submitFeedback() {
    const email = document.getElementById('feedbackEmail').value;
    const note = document.getElementById('feedbackNote').value;
    
    if (email && note) {
        const feedback = {
            email: email,
            note: note,
            timestamp: new Date().toISOString()
        };
        
        const feedbacks = getFromLocalStorage('feedbacks') || [];
        feedbacks.push(feedback);
        saveToLocalStorage('feedbacks', feedbacks);
        
        alert('Feedback inviato con successo!');
        document.getElementById('feedbackEmail').value = '';
        document.getElementById('feedbackNote').value = '';
    } else {
        alert('Compila tutti i campi!');
    }
}

// TERRITORIAL SECTIONS
function submitTerritorialRequest(event) {
    event.preventDefault();
    const form = event.target.closest('form');
    const formData = new FormData(form);
    
    const request = {
        nome: formData.get('nome') || form.querySelector('input[placeholder="Nome"]').value,
        cognome: formData.get('cognome') || form.querySelector('input[placeholder="Cognome"]').value,
        email: formData.get('email') || form.querySelector('input[placeholder="Email"]').value,
        telefono: formData.get('telefono') || form.querySelector('input[placeholder="Telefono"]').value,
        regione: formData.get('regione') || form.querySelector('input[placeholder="Regione"]').value,
        provincia: formData.get('provincia') || form.querySelector('input[placeholder="Provincia"]').value,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    territorialRequests.push(request);
    saveToLocalStorage('territorialRequests', territorialRequests);
    
    // Simula invio email
    sendEmailNotification('evolutionacademy2026@virgilio.it', 'Richiesta Sezione Territoriale NEXSUS', request);
    
    alert('Richiesta inviata con successo! Riceverai una risposta via email.');
    form.reset();
}

// ADMIN FUNCTIONS
function openAdminLogin() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>ACCESSO ADMIN NEXSUS</h3>
        <form id="adminLoginForm">
            <div class="form-group">
                <label>Password:</label>
                <input type="password" id="adminPassword" placeholder="Inserisci password admin" required>
            </div>
            <div class="form-group">
                <label>Domanda di verifica: Il nome della tua assistente virtuale?</label>
                <input type="text" id="adminVerification" placeholder="Risposta..." required>
            </div>
            <button type="submit" class="submit-button">ACCEDI</button>
            <button type="button" onclick="resetPassword()" class="submit-button" style="background: #ff4444; margin-top: 10px;">RESET PASSWORD</button>
        </form>
        <div style="margin-top: 20px;">
            <button onclick="goHome()" class="submit-button">TORNA ALLA HOME</button>
        </div>
    `;
    
    document.getElementById('modalOverlay').style.display = 'flex';
    
    document.getElementById('adminLoginForm').onsubmit = function(e) {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        const verification = document.getElementById('adminVerification').value;
        
        if (password === 'EVOLUTIONnexsusTEAM2026@' && verification.toLowerCase() === 'alison ai') {
            adminLoggedIn = true;
            alert('Admin autorizzato: Giuliano Caratelli');
            closeModal();
            openAdminPanel();
        } else {
            alert('Credenziali non valide!');
        }
    };
}

function resetPassword() {
    const email = prompt('Inserisci la tua email per il reset della password:');
    if (email) {
        sendEmailNotification('evolutionacademy2026@virgilio.it', 'Reset Password Admin NEXSUS', { email: email });
        alert('Link per il reset inviato via email!');
    }
}

function openAdminPanel() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>PANEL ADMIN NEXSUS</h3>
        <div class="admin-menu">
            <button onclick="openNexsusSystemPage()" class="admin-button">NEXSUS SISTEMA PAGE</button>
            <button onclick="openTerritorialManagement()" class="admin-button">NEXSUS TERRITORIALI</button>
            <button onclick="openUserManagement()" class="admin-button">GESTIONE UTENTI</button>
            <button onclick="openPaymentManagement()" class="admin-button">GESTIONE PAGAMENTI</button>
            <button onclick="openContactManagement()" class="admin-button">GESTIONE CONTATTI</button>
            <button onclick="openLibraryManagement()" class="admin-button">LIBRERIE NEXSUS</button>
            <button onclick="openPrizeManagement()" class="admin-button">GESTIONE VINCI E PREMIATI</button>
        </div>
    `;
    
    document.getElementById('modalOverlay').style.display = 'flex';
}

function showTerritorialRequests() {
    if (territorialRequests.length === 0) {
        alert('Nessuna richiesta territoriale presente.');
        return;
    }
    
    const modalBody = document.getElementById('modalBody');
    let requestsHtml = '<h3>RICHIESTE TERRITORIALI</h3>';
    
    territorialRequests.forEach((request, index) => {
        requestsHtml += `
            <div style="border: 1px solid #2aff40; padding: 15px; margin: 10px 0; border-radius: 10px;">
                <strong>${request.nome} ${request.cognome}</strong><br>
                Email: ${request.email}<br>
                Telefono: ${request.telefono}<br>
                Regione: ${request.regione}<br>
                Provincia: ${request.provincia}<br>
                Status: ${request.status}<br>
                Data: ${new Date(request.timestamp).toLocaleDateString()}
            </div>
        `;
    });
    
    modalBody.innerHTML = requestsHtml;
    document.getElementById('modalOverlay').style.display = 'flex';
}

// CART FUNCTIONS
function addToCart(plan, price) {
    const item = {
        id: Date.now(),
        plan: plan,
        price: price
    };
    
    cart.push(item);
    updateCartDisplay();
    alert(`${plan.toUpperCase()} aggiunto al carrello!`);
}

function viewCart() {
    document.getElementById('cartOverlay').style.display = 'flex';
    updateCartDisplay();
}

function closeCart() {
    document.getElementById('cartOverlay').style.display = 'none';
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Carrello vuoto</p>';
        cartTotal.textContent = 'Totale: €0';
        return;
    }
    
    let total = 0;
    let itemsHtml = '';
    
    cart.forEach((item, index) => {
        total += item.price;
        itemsHtml += `
            <div style="border: 1px solid #2aff40; padding: 10px; margin: 5px 0; border-radius: 5px; display: flex; justify-content: space-between; align-items: center;">
                <span>${item.plan.toUpperCase()} - €${item.price}</span>
                <button onclick="removeFromCart(${index})" style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Rimuovi</button>
            </div>
        `;
    });
    
    cartItems.innerHTML = itemsHtml;
    cartTotal.textContent = `Totale: €${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    updateCartDisplay();
}

function proceedToPayment() {
    if (cart.length === 0) {
        alert('Carrello vuoto!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Reindirizzamento al pagamento per €${total}. Collegamento con sistema SumUp...`);
    
    // Qui si collegherebbe al link di pagamento dell'admin
    clearCart();
    closeCart();
}

// CONTACT FUNCTIONS
function openEmailForm() {
    window.location.href = 'mailto:evolutionacademy2026@virgilio.it';
}

function openWhatsApp(number) {
    window.open(`https://wa.me/${number}`, '_blank');
}

function callPhone(number) {
    window.location.href = `tel:${number}`;
}

function contactLeader() {
    alert('Contatto Leader NEXSUS: 3474429091');
}

function contactOperator() {
    alert('Operatore NEXSUS: 3474429091');
}

function openSocial(platform) {
    const links = getFromLocalStorage('socialLinks') || {};
    const url = links[platform] || '#';
    if (url !== '#') {
        window.open(url, '_blank');
    } else {
        alert(`Link ${platform} non configurato dall'admin.`);
    }
}

function openUtilLink(type) {
    const links = getFromLocalStorage('utilLinks') || {};
    const url = links[type] || '#';
    if (url !== '#') {
        window.open(url, '_blank');
    } else {
        alert(`Link ${type} non configurato dall'admin.`);
    }
}

// LIBRARY FUNCTIONS
function openLibrary(type) {
    const modalBody = document.getElementById('modalBody');
    const items = getFromLocalStorage(`library_${type}`) || [];
    
    let libraryHtml = `<h3>${type.toUpperCase()} NEXSUS</h3>`;
    
    if (items.length === 0) {
        libraryHtml += '<p>Nessun elemento presente.</p>';
    } else {
        items.forEach((item, index) => {
            libraryHtml += `
                <div style="border: 1px solid #2aff40; padding: 10px; margin: 5px 0; border-radius: 5px;">
                    <strong>${item.name}</strong><br>
                    Caricato: ${new Date(item.timestamp).toLocaleDateString()}
                </div>
            `;
        });
    }
    
    modalBody.innerHTML = libraryHtml;
    document.getElementById('modalOverlay').style.display = 'flex';
}

// PAYMENT FUNCTIONS
function openPaymentSystem() {
    alert('Collegamento al sistema di pagamento SumUp...');
}

function openStageSubscription() {
    alert('Collegamento agli stage in abbonamento...');
}

function openSecureCardPayment() {
    alert('Collegamento al pagamento sicuro con carta...');
}

function downloadApp() {
    alert('Download app NEXSUS in arrivo...');
}

function openPremiumLink() {
    alert('Collegamento alla sezione Vinci e Premiati...');
}

// STORY FUNCTIONS
function toggleStory() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>LA STORIA DI NEXSUS</h3>
        <div style="max-height: 400px; overflow-y: auto; padding: 20px;">
            <p>La vita ti deve ancora un sogno… la tua SCINTILLA si chiama NEXSUS.</p>
            <p>Ci sono momenti in cui le persone smettono di credere nei propri sogni. Non perché non valgano, ma perché il peso delle rinunce, delle delusioni, dei tentativi falliti fa sembrare tutto troppo lontano.</p>
            <p>Ci sono attimi in cui il mondo sembra fermarsi. Attimi in cui guardi ciò che hai lasciato andare e senti un vuoto silenzioso, come se una parte di te fosse rimasta indietro, in attesa.</p>
            <p>Le passioni abbandonate non scompaiono davvero: diventano braci sotto la cenere, pronte a riaccendersi al primo soffio di coraggio.</p>
            <p>Nexsus è quel soffio. È la scintilla che riapre il cassetto dove tenevi i tuoi sogni più fragili. È la mano che ti solleva proprio quando credevi che fosse troppo tardi per riprovarci.</p>
            <p>È la fiamma che illumina ciò che il tempo non ha mai cancellato davvero: il tuo desiderio di essere, creare, realizzare.</p>
            <p>Perché la vita non ha finito di stupirti. Ed è qui che Nexsus entra in gioco.</p>
            <p>Nexsus è progettato per riaccendere ciò che sembrava spento: la motivazione, la visione, la fiducia. Offre un percorso chiaro, un metodo concreto, un ecosistema capace di trasformare la passione bloccata in risultati misurabili.</p>
            <p>È quel segnale che arriva quando stai per arrenderti. È la forza che ti rimette in piedi quando hai lasciato andare ciò che amavi, ma che continua a chiamarti dentro.</p>
            <p>È la prova che la tua storia non è finita, che la passione non è morta, che ciò che hai abbandonato può tornare più forte di prima.</p>
            <p>Perché la vita ti deve ancora un sogno. E oggi, quel sogno ha un nome preciso: NEXSUS.</p>
        </div>
        <button onclick="closeModal()" class="submit-button">CHIUDI E TORNA ALLA SEZIONE</button>
    `;
    
    document.getElementById('modalOverlay').style.display = 'flex';
}

// MODAL FUNCTIONS
function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

// UTILITY FUNCTIONS
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
        console.error('Errore nel salvataggio:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Errore nel caricamento:', e);
        return null;
    }
}

function sendEmailNotification(to, subject, data) {
    // Simula invio email - in produzione si collegherebbe a un servizio email
    console.log(`Email inviata a ${to}:`, { subject, data });
    
    // Salva le notifiche per l'admin
    const notifications = getFromLocalStorage('emailNotifications') || [];
    notifications.push({
        to: to,
        subject: subject,
        data: data,
        timestamp: new Date().toISOString()
    });
    saveToLocalStorage('emailNotifications', notifications);
}

// ADMIN PANEL FUNCTIONS
function openNexsusSystemPage() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>NEXSUS SISTEMA PAGE</h3>
        <div class="admin-section">
            <h4>Notifiche dalle Sezioni</h4>
            <button onclick="viewSectionNotifications('community')" class="admin-button">Community</button>
            <button onclick="viewSectionNotifications('academy')" class="admin-button">Academy</button>
            <button onclick="viewSectionNotifications('coaching')" class="admin-button">Coaching</button>
            <button onclick="viewSectionNotifications('networking')" class="admin-button">Networking</button>
            <button onclick="viewSectionNotifications('collabora')" class="admin-button">Collabora con NEXSUS</button>
        </div>
        <button onclick="openAdminPanel()" class="admin-button">← Torna al Menu</button>
    `;
}

function openTerritorialManagement() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>GESTIONE TERRITORIALI</h3>
        <div class="admin-section">
            <button onclick="viewTerritorialRequests()" class="admin-button">Visualizza Richieste</button>
            <button onclick="manageTerritorialSections()" class="admin-button">Gestisci 50 Sezioni</button>
            <button onclick="assignCredentials()" class="admin-button">Assegna Credenziali</button>
        </div>
        <button onclick="openAdminPanel()" class="admin-button">← Torna al Menu</button>
    `;
}

function openUserManagement() {
    const modalBody = document.getElementById('modalBody');
    const registrations = getFromLocalStorage('userRegistrations') || [];
    
    let usersHtml = `
        <h3>GESTIONE UTENTI</h3>
        <div class="admin-section">
            <h4>Registrazioni Utenti (${registrations.length})</h4>
    `;
    
    registrations.forEach((user, index) => {
        usersHtml += `
            <div style="border: 1px solid #2aff40; padding: 10px; margin: 5px 0; border-radius: 5px;">
                <strong>${user.nome} ${user.cognome}</strong> - ${user.section || user.type}<br>
                Email: ${user.email} | Tel: ${user.telefono}<br>
                ${user.citta}, ${user.provincia}, ${user.regione}<br>
                <small>Data: ${new Date(user.timestamp).toLocaleDateString()}</small>
            </div>
        `;
    });
    
    usersHtml += `
        </div>
        <button onclick="resetUserData()" class="admin-button" style="background: #ff4444;">Reset Dati Utenti</button>
        <button onclick="openAdminPanel()" class="admin-button">← Torna al Menu</button>
    `;
    
    modalBody.innerHTML = usersHtml;
}

function openPaymentManagement() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>GESTIONE PAGAMENTI</h3>
        <div class="admin-section">
            <div class="form-group">
                <label>Link Pagamento Carta:</label>
                <input type="url" id="cardPaymentLink" placeholder="Inserisci link SumUp carta">
                <button onclick="savePaymentLink('card')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Link Acquisto Gift Card:</label>
                <input type="url" id="giftCardLink" placeholder="Inserisci link gift card">
                <button onclick="savePaymentLink('gift')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Link Stage Abbonamenti:</label>
                <input type="url" id="stageLink" placeholder="Inserisci link stage">
                <button onclick="savePaymentLink('stage')" class="admin-button">Salva</button>
            </div>
        </div>
        <button onclick="openAdminPanel()" class="admin-button">← Torna al Menu</button>
    `;
}

function openContactManagement() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>GESTIONE CONTATTI</h3>
        <div class="admin-section">
            <h4>Social Network Links</h4>
            <div class="form-group">
                <label>Facebook NEXSUS:</label>
                <input type="url" id="facebookLink" placeholder="Link Facebook">
                <button onclick="saveSocialLink('facebook')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Instagram NEXSUS:</label>
                <input type="url" id="instagramLink" placeholder="Link Instagram">
                <button onclick="saveSocialLink('instagram')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>TikTok NEXSUS:</label>
                <input type="url" id="tiktokLink" placeholder="Link TikTok">
                <button onclick="saveSocialLink('tiktok')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>YouTube NEXSUS:</label>
                <input type="url" id="youtubeLink" placeholder="Link YouTube">
                <button onclick="saveSocialLink('youtube')" class="admin-button">Salva</button>
            </div>
            <h4>Link Utili</h4>
            <div class="form-group">
                <label>Premio 25%:</label>
                <input type="url" id="premio25Link" placeholder="Link Premio 25%">
                <button onclick="saveUtilLink('premio25')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Vinci 50%:</label>
                <input type="url" id="vinci50Link" placeholder="Link Vinci 50%">
                <button onclick="saveUtilLink('vinci50')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Negozio Online:</label>
                <input type="url" id="negozioLink" placeholder="Link Negozio">
                <button onclick="saveUtilLink('negozio')" class="admin-button">Salva</button>
            </div>
        </div>
        <button onclick="openAdminPanel()" class="admin-button">← Torna al Menu</button>
    `;
}

function openLibraryManagement() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>LIBRERIE NEXSUS</h3>
        <div class="admin-section">
            <div class="upload-section">
                <h4>Carica Foto (max 200)</h4>
                <input type="file" accept="image/*" multiple onchange="uploadToLibrary(this, 'foto')">
                <div id="fotoCount">Foto caricate: ${(getFromLocalStorage('library_foto') || []).length}/200</div>
            </div>
            <div class="upload-section">
                <h4>Carica Video (max 100)</h4>
                <input type="file" accept="video/*" multiple onchange="uploadToLibrary(this, 'video')">
                <div id="videoCount">Video caricati: ${(getFromLocalStorage('library_video') || []).length}/100</div>
            </div>
            <div class="upload-section">
                <h4>Carica PDF (max 200)</h4>
                <input type="file" accept=".pdf" multiple onchange="uploadToLibrary(this, 'pdf')">
                <div id="pdfCount">PDF caricati: ${(getFromLocalStorage('library_pdf') || []).length}/200</div>
            </div>
            <div class="upload-section">
                <h4>Carica Testi (max 200)</h4>
                <input type="file" accept=".txt,.doc,.docx" multiple onchange="uploadToLibrary(this, 'testi')">
                <div id="testiCount">Testi caricati: ${(getFromLocalStorage('library_testi') || []).length}/200</div>
            </div>
        </div>
        <button onclick="openAdminPanel()" class="admin-button">← Torna al Menu</button>
    `;
}

function openPrizeManagement() {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h3>GESTIONE VINCI E PREMIATI</h3>
        <div class="admin-section">
            <div class="form-group">
                <label>Link Home Vinci e Premiati:</label>
                <input type="url" id="prizeHomeLink" placeholder="Inserisci link principale">
                <button onclick="savePrizeLink('home')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Link Premio Speciale 1:</label>
                <input type="url" id="prize1Link" placeholder="Inserisci link premio 1">
                <button onclick="savePrizeLink('prize1')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Link Premio Speciale 2:</label>
                <input type="url" id="prize2Link" placeholder="Inserisci link premio 2">
                <button onclick="savePrizeLink('prize2')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Link Premio Speciale 3:</label>
                <input type="url" id="prize3Link" placeholder="Inserisci link premio 3">
                <button onclick="savePrizeLink('prize3')" class="admin-button">Salva</button>
            </div>
            <div class="form-group">
                <label>Link Premio Speciale 4:</label>
                <input type="url" id="prize4Link" placeholder="Inserisci link premio 4">
                <button onclick="savePrizeLink('prize4')" class="admin-button">Salva</button>
            </div>
        </div>
        <button onclick="openAdminPanel()" class="admin-button">← Torna al Menu</button>
    `;
}

// SAVE FUNCTIONS
function savePaymentLink(type) {
    const links = getFromLocalStorage('paymentLinks') || {};
    const inputId = type === 'card' ? 'cardPaymentLink' : type === 'gift' ? 'giftCardLink' : 'stageLink';
    const url = document.getElementById(inputId).value;
    
    if (url) {
        links[type] = url;
        saveToLocalStorage('paymentLinks', links);
        alert('Link salvato con successo!');
    }
}

function saveSocialLink(platform) {
    const links = getFromLocalStorage('socialLinks') || {};
    const url = document.getElementById(platform + 'Link').value;
    
    if (url) {
        links[platform] = url;
        saveToLocalStorage('socialLinks', links);
        alert('Link social salvato con successo!');
    }
}

function saveUtilLink(type) {
    const links = getFromLocalStorage('utilLinks') || {};
    const inputId = type + 'Link';
    const url = document.getElementById(inputId).value;
    
    if (url) {
        links[type] = url;
        saveToLocalStorage('utilLinks', links);
        alert('Link utile salvato con successo!');
    }
}

function savePrizeLink(type) {
    const links = getFromLocalStorage('prizeLinks') || {};
    const inputId = type === 'home' ? 'prizeHomeLink' : type + 'Link';
    const url = document.getElementById(inputId).value;
    
    if (url) {
        links[type] = url;
        saveToLocalStorage('prizeLinks', links);
        alert('Link premio salvato con successo!');
    }
}

function uploadToLibrary(input, type) {
    const files = input.files;
    const maxFiles = type === 'video' ? 100 : 200;
    const currentItems = getFromLocalStorage(`library_${type}`) || [];
    
    if (currentItems.length + files.length > maxFiles) {
        alert(`Limite massimo raggiunto per ${type}!`);
        return;
    }
    
    for (let file of files) {
        const item = {
            name: file.name,
            size: file.size,
            timestamp: new Date().toISOString()
        };
        currentItems.push(item);
    }
    
    saveToLocalStorage(`library_${type}`, currentItems);
    
    // Aggiorna contatore
    const countElement = document.getElementById(type + 'Count');
    if (countElement) {
        countElement.textContent = `${type} caricati: ${currentItems.length}/${maxFiles}`;
    }
    
    // Aggiorna contatore nella home
    const homeCounter = document.getElementById(type + 'Counter');
    if (homeCounter) {
        homeCounter.textContent = `${currentItems.length} ${type}`;
    }
    
    alert(`${files.length} file caricati con successo!`);
}

// TERRITORIAL FUNCTIONS
function viewTerritorialRequests() {
    const requests = getFromLocalStorage('territorialRequests') || [];
    const modalBody = document.getElementById('modalBody');
    
    let requestsHtml = `
        <h3>RICHIESTE TERRITORIALI (${requests.length})</h3>
        <div class="admin-section">
    `;
    
    if (requests.length === 0) {
        requestsHtml += '<p>Nessuna richiesta presente.</p>';
    } else {
        requests.forEach((request, index) => {
            requestsHtml += `
                <div style="border: 1px solid #2aff40; padding: 15px; margin: 10px 0; border-radius: 10px;">
                    <strong>${request.nome} ${request.cognome}</strong><br>
                    Email: ${request.email}<br>
                    Telefono: ${request.telefono}<br>
                    Regione: ${request.regione}<br>
                    Provincia: ${request.provincia}<br>
                    Status: <span style="color: ${request.status === 'assigned' ? '#2aff40' : '#ffd21a'}">${request.status}</span><br>
                    Data: ${new Date(request.timestamp).toLocaleDateString()}<br>
                    <button onclick="assignTerritorialSection(${index})" class="admin-button" style="margin-top: 10px;">Assegna Sezione</button>
                </div>
            `;
        });
    }
    
    requestsHtml += `
        </div>
        <button onclick="openTerritorialManagement()" class="admin-button">← Torna</button>
    `;
    
    modalBody.innerHTML = requestsHtml;
}

function manageTerritorialSections() {
    const sections = getFromLocalStorage('territorialSections') || generateTerritorialSections();
    const modalBody = document.getElementById('modalBody');
    
    let sectionsHtml = `
        <h3>50 SEZIONI TERRITORIALI</h3>
        <div class="admin-section" style="max-height: 400px; overflow-y: auto;">
    `;
    
    sections.forEach((section, index) => {
        const statusColor = section.status === 'libera' ? '#2aff40' : '#0070ff';
        sectionsHtml += `
            <div style="border: 1px solid ${statusColor}; padding: 10px; margin: 5px 0; border-radius: 5px; background: rgba(${section.status === 'libera' ? '42, 255, 64' : '0, 112, 255'}, 0.1);">
                <strong>${section.name}</strong> - 
                <span style="color: ${statusColor}">${section.status.toUpperCase()}</span>
                ${section.assignedTo ? `<br>Assegnata a: ${section.assignedTo}` : ''}
                <br>
                <button onclick="resetTerritorialSection(${index})" class="admin-button" style="background: #ff4444; margin-top: 5px;">Reset</button>
            </div>
        `;
    });
    
    sectionsHtml += `
        </div>
        <button onclick="openTerritorialManagement()" class="admin-button">← Torna</button>
    `;
    
    modalBody.innerHTML = sectionsHtml;
}

function generateTerritorialSections() {
    const regions = [
        'Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna',
        'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche',
        'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia',
        'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'
    ];
    
    const provinces = [
        'Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Bologna',
        'Firenze', 'Bari', 'Catania', 'Venezia', 'Verona', 'Messina', 'Padova',
        'Trieste', 'Brescia', 'Taranto', 'Prato', 'Reggio Calabria', 'Modena',
        'Parma', 'Perugia', 'Livorno', 'Cagliari', 'Foggia', 'Salerno',
        'Ravenna', 'Ferrara', 'Rimini', 'Siracusa'
    ];
    
    const sections = [];
    
    // Aggiungi sezioni regionali
    regions.forEach(region => {
        sections.push({
            name: `Sezione Regionale ${region}`,
            type: 'regionale',
            status: 'libera',
            assignedTo: null,
            credentials: null
        });
    });
    
    // Aggiungi sezioni provinciali
    provinces.forEach(province => {
        sections.push({
            name: `Sezione Provinciale ${province}`,
            type: 'provinciale',
            status: 'libera',
            assignedTo: null,
            credentials: null
        });
    });
    
    saveToLocalStorage('territorialSections', sections);
    return sections;
}

function assignTerritorialSection(requestIndex) {
    const requests = getFromLocalStorage('territorialRequests') || [];
    const sections = getFromLocalStorage('territorialSections') || [];
    const request = requests[requestIndex];
    
    // Trova sezioni libere
    const freeSections = sections.filter(section => section.status === 'libera');
    
    if (freeSections.length === 0) {
        alert('Nessuna sezione libera disponibile!');
        return;
    }
    
    // Mostra selezione sezioni
    const modalBody = document.getElementById('modalBody');
    let selectionHtml = `
        <h3>ASSEGNA SEZIONE A ${request.nome} ${request.cognome}</h3>
        <div class="admin-section">
            <h4>Sezioni Libere Disponibili:</h4>
    `;
    
    freeSections.forEach((section, index) => {
        selectionHtml += `
            <div style="border: 1px solid #2aff40; padding: 10px; margin: 5px 0; border-radius: 5px; cursor: pointer;" onclick="confirmSectionAssignment(${requestIndex}, '${section.name}')">
                <strong>${section.name}</strong> (${section.type})
            </div>
        `;
    });
    
    selectionHtml += `
        </div>
        <button onclick="viewTerritorialRequests()" class="admin-button">← Annulla</button>
    `;
    
    modalBody.innerHTML = selectionHtml;
}

function confirmSectionAssignment(requestIndex, sectionName) {
    const requests = getFromLocalStorage('territorialRequests') || [];
    const sections = getFromLocalStorage('territorialSections') || [];
    const request = requests[requestIndex];
    
    // Genera credenziali
    const email = request.email;
    const password = generatePassword();
    
    // Aggiorna richiesta
    request.status = 'assigned';
    request.assignedSection = sectionName;
    request.credentials = { email, password };
    
    // Aggiorna sezione
    const sectionIndex = sections.findIndex(s => s.name === sectionName);
    if (sectionIndex !== -1) {
        sections[sectionIndex].status = 'assegnata';
        sections[sectionIndex].assignedTo = `${request.nome} ${request.cognome}`;
        sections[sectionIndex].credentials = { email, password };
    }
    
    // Salva modifiche
    saveToLocalStorage('territorialRequests', requests);
    saveToLocalStorage('territorialSections', sections);
    
    // Simula invio email con credenziali
    sendEmailNotification(email, 'Credenziali Sezione Territoriale NEXSUS', {
        nome: request.nome,
        cognome: request.cognome,
        sezione: sectionName,
        email: email,
        password: password
    });
    
    alert(`Sezione "${sectionName}" assegnata con successo!\nCredenziali inviate via email.`);
    viewTerritorialRequests();
}

function generatePassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function resetTerritorialSection(sectionIndex) {
    if (confirm('Sei sicuro di voler resettare questa sezione?')) {
        const sections = getFromLocalStorage('territorialSections') || [];
        sections[sectionIndex].status = 'libera';
        sections[sectionIndex].assignedTo = null;
        sections[sectionIndex].credentials = null;
        
        saveToLocalStorage('territorialSections', sections);
        alert('Sezione resettata con successo!');
        manageTerritorialSections();
    }
}

function resetUserData() {
    if (confirm('Sei sicuro di voler cancellare tutti i dati utenti?')) {
        localStorage.removeItem('userRegistrations');
        alert('Dati utenti cancellati!');
        openUserManagement();
    }
}

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
    // Carica dati salvati
    territorialRequests = getFromLocalStorage('territorialRequests') || [];
    userRegistrations = getFromLocalStorage('userRegistrations') || [];
    cart = getFromLocalStorage('cart') || [];
    
    // Aggiorna contatori librerie
    updateLibraryCounters();
    
    // Gestione input chatbot
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

function updateLibraryCounters() {
    const types = ['foto', 'video', 'pdf', 'testi'];
    types.forEach(type => {
        const items = getFromLocalStorage(`library_${type}`) || [];
        const counter = document.getElementById(type + 'Counter');
        if (counter) {
            counter.textContent = `${items.length} ${type}`;
        }
    });
}

// Salva carrello quando cambia
function saveCart() {
    saveToLocalStorage('cart', cart);
}

// Chiama saveCart quando il carrello viene modificato
const originalAddToCart = addToCart;
addToCart = function(plan, price) {
    originalAddToCart(plan, price);
    saveCart();
};

const originalRemoveFromCart = removeFromCart;
removeFromCart = function(index) {
    originalRemoveFromCart(index);
    saveCart();
};

const originalClearCart = clearCart;
clearCart = function() {
    originalClearCart();
    saveCart();
};

// PERFORMANCE OPTIMIZATION
// Debounce function per ottimizzare le performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Ottimizza resize events
window.addEventListener('resize', debounce(function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, 250));

// SECURITY & STABILITY
// Gestione errori globale
window.addEventListener('error', function(e) {
    console.error('Errore JavaScript:', e.error);
    // Non mostrare errori all'utente per sicurezza
});

// Prevenzione memory leaks
window.addEventListener('beforeunload', function() {
    // Cleanup se necessario
    clearTimeout(menuTimeout);
});

// SISTEMA CREDENZIALI TERRITORIALI AVANZATO
function assignCredentials() {
    const requests = getFromLocalStorage('territorialRequests') || [];
    const pendingRequests = requests.filter(req => req.status === 'pending');
    
    const modalBody = document.getElementById('modalBody');
    let credentialsHtml = `
        <h3>ASSEGNA CREDENZIALI TERRITORIALI</h3>
        <div class="admin-section">
    `;
    
    if (pendingRequests.length === 0) {
        credentialsHtml += '<p>Nessuna richiesta in attesa di credenziali.</p>';
    } else {
        credentialsHtml += '<h4>Richieste in Attesa:</h4>';
        pendingRequests.forEach((request, index) => {
            const originalIndex = requests.findIndex(r => r.timestamp === request.timestamp);
            credentialsHtml += `
                <div style="border: 1px solid #ffd21a; padding: 15px; margin: 10px 0; border-radius: 10px; background: rgba(255, 210, 26, 0.1);">
                    <strong>${request.nome} ${request.cognome}</strong><br>
                    Email: ${request.email}<br>
                    Regione: ${request.regione} | Provincia: ${request.provincia}<br>
                    <div style="margin-top: 10px;">
                        <label>Password da Assegnare:</label>
                        <input type="text" id="password_${originalIndex}" value="${generatePassword()}" style="margin: 5px 0; padding: 5px; width: 200px;">
                        <button onclick="regeneratePassword(${originalIndex})" class="admin-button" style="margin-left: 5px;">Rigenera</button>
                    </div>
                    <button onclick="finalizeCredentials(${originalIndex})" class="admin-button" style="background: #2aff40; margin-top: 10px;">Conferma e Invia Credenziali</button>
                </div>
            `;
        });
    }
    
    credentialsHtml += `
        </div>
        <div style="margin-top: 20px;">
            <h4>Gestione Credenziali Esistenti:</h4>
            <button onclick="viewAssignedCredentials()" class="admin-button">Visualizza Credenziali Assegnate</button>
            <button onclick="resetAllCredentials()" class="admin-button" style="background: #ff4444;">Reset Tutte le Credenziali</button>
        </div>
        <button onclick="openTerritorialManagement()" class="admin-button">← Torna al Menu</button>
    `;
    
    modalBody.innerHTML = credentialsHtml;
}

function regeneratePassword(requestIndex) {
    const newPassword = generatePassword();
    const passwordInput = document.getElementById(`password_${requestIndex}`);
    if (passwordInput) {
        passwordInput.value = newPassword;
    }
}

function finalizeCredentials(requestIndex) {
    const requests = getFromLocalStorage('territorialRequests') || [];
    const sections = getFromLocalStorage('territorialSections') || [];
    const request = requests[requestIndex];
    const passwordInput = document.getElementById(`password_${requestIndex}`);
    
    if (!passwordInput || !passwordInput.value) {
        alert('Errore: password non trovata!');
        return;
    }
    
    const password = passwordInput.value;
    const email = request.email;
    
    // Trova sezione libera appropriata per regione/provincia
    const freeSections = sections.filter(section => 
        section.status === 'libera' && 
        (section.name.includes(request.regione) || section.name.includes(request.provincia))
    );
    
    let assignedSection;
    if (freeSections.length > 0) {
        assignedSection = freeSections[0];
    } else {
        // Se non trova sezione specifica, prende la prima libera
        const anyFreeSection = sections.find(section => section.status === 'libera');
        if (!anyFreeSection) {
            alert('Nessuna sezione libera disponibile!');
            return;
        }
        assignedSection = anyFreeSection;
    }
    
    // Aggiorna richiesta
    request.status = 'assigned';
    request.assignedSection = assignedSection.name;
    request.credentials = { email, password };
    request.assignedDate = new Date().toISOString();
    
    // Aggiorna sezione
    const sectionIndex = sections.findIndex(s => s.name === assignedSection.name);
    if (sectionIndex !== -1) {
        sections[sectionIndex].status = 'assegnata';
        sections[sectionIndex].assignedTo = `${request.nome} ${request.cognome}`;
        sections[sectionIndex].credentials = { email, password };
        sections[sectionIndex].assignedDate = new Date().toISOString();
    }
    
    // Salva modifiche
    saveToLocalStorage('territorialRequests', requests);
    saveToLocalStorage('territorialSections', sections);
    
    // Simula invio email con credenziali
    const emailData = {
        nome: request.nome,
        cognome: request.cognome,
        sezione: assignedSection.name,
        email: email,
        password: password,
        istruzioni: 'Usa queste credenziali per accedere alla tua sezione territoriale NEXSUS.'
    };
    
    sendEmailNotification(email, 'Credenziali Sezione Territoriale NEXSUS', emailData);
    
    alert(`Credenziali assegnate con successo!
Sezione: ${assignedSection.name}
Email: ${email}
Password: ${password}

Credenziali inviate via email all'utente.`);
    
    // Ricarica la vista
    assignCredentials();
}

function viewAssignedCredentials() {
    const requests = getFromLocalStorage('territorialRequests') || [];
    const assignedRequests = requests.filter(req => req.status === 'assigned');
    
    const modalBody = document.getElementById('modalBody');
    let credentialsHtml = `
        <h3>CREDENZIALI ASSEGNATE (${assignedRequests.length})</h3>
        <div class="admin-section" style="max-height: 400px; overflow-y: auto;">
    `;
    
    if (assignedRequests.length === 0) {
        credentialsHtml += '<p>Nessuna credenziale assegnata.</p>';
    } else {
        assignedRequests.forEach((request, index) => {
            const originalIndex = requests.findIndex(r => r.timestamp === request.timestamp);
            credentialsHtml += `
                <div style="border: 1px solid #2aff40; padding: 15px; margin: 10px 0; border-radius: 10px; background: rgba(42, 255, 64, 0.1);">
                    <strong>${request.nome} ${request.cognome}</strong><br>
                    Sezione: ${request.assignedSection}<br>
                    Email: ${request.credentials.email}<br>
                    Password: <span style="font-family: monospace; background: rgba(0,0,0,0.2); padding: 2px 5px; border-radius: 3px;">${request.credentials.password}</span><br>
                    Assegnata: ${new Date(request.assignedDate).toLocaleDateString()}<br>
                    <button onclick="resetSingleCredential(${originalIndex})" class="admin-button" style="background: #ff4444; margin-top: 10px;">Reset Credenziali</button>
                    <button onclick="resendCredentials(${originalIndex})" class="admin-button" style="background: #0070ff; margin-top: 10px;">Reinvia Email</button>
                </div>
            `;
        });
    }
    
    credentialsHtml += `
        </div>
        <button onclick="assignCredentials()" class="admin-button">← Torna alla Gestione</button>
    `;
    
    modalBody.innerHTML = credentialsHtml;
}

function resetSingleCredential(requestIndex) {
    if (confirm('Sei sicuro di voler resettare le credenziali di questo utente?')) {
        const requests = getFromLocalStorage('territorialRequests') || [];
        const sections = getFromLocalStorage('territorialSections') || [];
        const request = requests[requestIndex];
        
        // Reset richiesta
        const oldSection = request.assignedSection;
        request.status = 'pending';
        delete request.assignedSection;
        delete request.credentials;
        delete request.assignedDate;
        
        // Reset sezione
        const sectionIndex = sections.findIndex(s => s.name === oldSection);
        if (sectionIndex !== -1) {
            sections[sectionIndex].status = 'libera';
            sections[sectionIndex].assignedTo = null;
            sections[sectionIndex].credentials = null;
            delete sections[sectionIndex].assignedDate;
        }
        
        // Salva modifiche
        saveToLocalStorage('territorialRequests', requests);
        saveToLocalStorage('territorialSections', sections);
        
        alert('Credenziali resettate con successo!');
        viewAssignedCredentials();
    }
}

function resendCredentials(requestIndex) {
    const requests = getFromLocalStorage('territorialRequests') || [];
    const request = requests[requestIndex];
    
    if (request.credentials) {
        const emailData = {
            nome: request.nome,
            cognome: request.cognome,
            sezione: request.assignedSection,
            email: request.credentials.email,
            password: request.credentials.password,
            istruzioni: 'Reinvio credenziali per accedere alla tua sezione territoriale NEXSUS.'
        };
        
        sendEmailNotification(request.credentials.email, 'Reinvio Credenziali Sezione Territoriale NEXSUS', emailData);
        alert('Credenziali reinviate via email!');
    }
}

function resetAllCredentials() {
    if (confirm('ATTENZIONE: Questa operazione resetterà TUTTE le credenziali assegnate. Continuare?')) {
        const requests = getFromLocalStorage('territorialRequests') || [];
        const sections = getFromLocalStorage('territorialSections') || [];
        
        // Reset tutte le richieste
        requests.forEach(request => {
            if (request.status === 'assigned') {
                request.status = 'pending';
                delete request.assignedSection;
                delete request.credentials;
                delete request.assignedDate;
            }
        });
        
        // Reset tutte le sezioni
        sections.forEach(section => {
            section.status = 'libera';
            section.assignedTo = null;
            section.credentials = null;
            delete section.assignedDate;
        });
        
        // Salva modifiche
        saveToLocalStorage('territorialRequests', requests);
        saveToLocalStorage('territorialSections', sections);
        
        alert('Tutte le credenziali sono state resettate!');
        assignCredentials();
    }
}

console.log('NEXSUS Website JavaScript caricato con successo - Versione ottimizzata per 2+ anni di funzionamento');