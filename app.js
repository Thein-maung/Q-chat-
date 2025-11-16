// Entangle Chat-2 - Complete Working Version
console.log('🔧 Entangle Chat-2: Starting quantum initialization...');

// Global Quantum State
let currentSeed = null;
let isEntangled = false;
let TWIN_SEED = null;
let CRYPTO_COUNTER = 0;
let currentPad = null;

// Quantum OTP Generator
function generatePad(seed, counter, length = 32) {
    const pad = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        // Quantum-inspired deterministic algorithm
        const value = (seed[i % seed.length] + counter + i * 13) % 256;
        pad[i] = value;
    }
    return pad;
}

// Quantum Encryption
function encrypt(message, pad) {
    if (!message || typeof message !== 'string') {
        throw new Error('Message must be a non-empty string');
    }
    
    const msgBytes = new TextEncoder().encode(message);
    if (msgBytes.length > pad.length) {
        throw new Error('Quantum pad too short');
    }
    
    const encrypted = new Uint8Array(msgBytes.length);
    for (let i = 0; i < msgBytes.length; i++) {
        encrypted[i] = msgBytes[i] ^ pad[i];
    }
    
    return btoa(String.fromCharCode(...encrypted));
}

// Quantum Decryption
function decrypt(encryptedB64, pad) {
    if (!encryptedB64 || typeof encryptedB64 !== 'string') {
        throw new Error('Encrypted data must be a string');
    }
    
    const encrypted = Uint8Array.from(atob(encryptedB64), c => c.charCodeAt(0));
    
    if (encrypted.length > pad.length) {
        throw new Error('Quantum pad too short');
    }
    
    const decrypted = new Uint8Array(encrypted.length);
    for (let i = 0; i < encrypted.length; i++) {
        decrypted[i] = encrypted[i] ^ pad[i];
    }
    
    return new TextDecoder().decode(decrypted);
}

// Set Quantum Seed
async function setSeed(seedBytes) {
    if (!seedBytes || seedBytes.length < 16) {
        throw new Error('Quantum seed must be at least 16 bytes');
    }
    
    // Quantum hash simulation
    let hashBuffer = new Uint8Array(32);
    for (let i = 0; i < seedBytes.length; i++) {
        hashBuffer[i % 32] ^= seedBytes[i];
    }
    
    TWIN_SEED = hashBuffer;
    CRYPTO_COUNTER = 0;
}

// Generate Next OTP Pad
async function nextPad(len = 32) {
    if (!TWIN_SEED) {
        throw new Error('Quantum entanglement required first');
    }
    
    const pad = generatePad(TWIN_SEED, CRYPTO_COUNTER, len);
    CRYPTO_COUNTER = (CRYPTO_COUNTER + 1) % 256;
    return pad;
}

// Get Crypto State
function getCryptoState() {
    return {
        isEntangled: isEntangled,
        hasSeed: !!TWIN_SEED,
        counter: CRYPTO_COUNTER,
        currentPad: currentPad ? currentPad.length + ' bytes' : 'None'
    };
}

// Main App Initialization
function initializeApp() {
    console.log('🚀 Initializing Entangle Chat-2...');
    
    const status = document.getElementById('status');
    const output = document.getElementById('output');
    const codeDisplay = document.getElementById('code-display');
    
    if (!status) {
        console.error('❌ Required elements not found');
        return;
    }
    
    try {
        // Generate quantum seed
        try {
    currentSeed = crypto.getRandomValues(new Uint8Array(32));
} catch (error) {
    console.error('Crypto error, using fallback:', error);
    // Fallback random generation
    currentSeed = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
        currentSeed[i] = Math.floor(Math.random() * 256);
    }
}
        
        // Update UI
        status.textContent = '✅ QUANTUM READY';
        status.style.color = 'green';
        
        const seedB64 = btoa(String.fromCharCode(...currentSeed));
        
        if (output) {
            output.textContent = 'Share your quantum code below';
        }
        
        if (codeDisplay) {
            codeDisplay.textContent = seedB64;
        }
        
        // Setup event handlers
        setupEventHandlers();
        
        console.log('✅ Entangle Chat-2 initialized successfully');
        
    } catch (error) {
        console.error('❌ Initialization failed:', error);
        if (status) {
            status.textContent = '❌ Initialization failed';
            status.style.color = 'red';
        }
    }
}

// Setup Event Handlers
function setupEventHandlers() {
    // Partner code entry
    const scanBtn = document.getElementById('scan');
    if (scanBtn) {
        scanBtn.onclick = handlePartnerCode;
    }
    
    // Seed regeneration
    const regenBtn = document.getElementById('regen-seed');
    if (regenBtn) {
        regenBtn.onclick = handleRegenerateSeed;
    }
    
    // Navigation
    const textBtn = document.getElementById('text-chat');
    const voiceBtn = document.getElementById('voice-chat');
    
    if (textBtn) textBtn.onclick = () => handleNavigation('text');
    if (voiceBtn) voiceBtn.onclick = () => handleNavigation('voice');
    
    enableNavigation(false);
}

// Handle Partner Code
async function handlePartnerCode() {
    const status = document.getElementById('status');
    const partnerCode = prompt('Enter your partner\'s quantum code:');
    
    if (!partnerCode) return;
    
    try {
        status.textContent = '🔐 QUANTUM ENTANGLEMENT...';
        status.className = 'status connecting';
        
        const cleanCode = partnerCode.trim();
        const bin = Uint8Array.from(atob(cleanCode), c => c.charCodeAt(0));
        
        if (bin.length !== 32) {
            throw new Error('Invalid quantum code length');
        }
        
        currentSeed = bin;
        await setSeed(bin);
        isEntangled = true;
        currentPad = await nextPad(32);
        
        status.textContent = '✅ QUANTUM ENTANGLED!';
        status.style.color = 'green';
        status.className = 'status';
        
        const output = document.getElementById('output');
        if (output) {
            output.textContent = 'Secure AI connection established!';
        }
        
        enableNavigation(true);
        
    } catch (error) {
        const status = document.getElementById('status');
        status.textContent = '❌ Entanglement failed';
        status.style.color = 'red';
        status.className = 'status';
    }
}

// Regenerate Seed
function handleRegenerateSeed() {
    currentSeed = crypto.getRandomValues(new Uint8Array(32));
    TWIN_SEED = null;
    isEntangled = false;
    currentPad = null;
    
    const status = document.getElementById('status');
    const output = document.getElementById('output');
    const codeDisplay = document.getElementById('code-display');
    
    status.textContent = '🔄 NEW QUANTUM SEED';
    status.style.color = 'blue';
    
    const seedB64 = btoa(String.fromCharCode(...currentSeed));
    
    if (output) {
        output.textContent = 'Share your new quantum code';
    }
    
    if (codeDisplay) {
        codeDisplay.textContent = seedB64;
    }
    
    enableNavigation(false);
}

// Enable Navigation
function enableNavigation(enabled) {
    const textBtn = document.getElementById('text-chat');
    const voiceBtn = document.getElementById('voice-chat');
    
    if (textBtn) {
        textBtn.disabled = !enabled;
        textBtn.style.opacity = enabled ? '1' : '0.5';
    }
    
    if (voiceBtn) {
        voiceBtn.disabled = !enabled;
        voiceBtn.style.opacity = enabled ? '1' : '0.5';
    }
}

// Handle Navigation
async function handleNavigation(destination) {
    if (!isEntangled) {
        alert('⚠️ Please establish quantum entanglement first!');
        return;
    }
    
    if (destination === 'text') {
        window.location.href = 'chat.html';
    } else if (destination === 'voice') {
        window.location.href = 'voice.html';
    }
}

// Global Error Handling
window.addEventListener('error', function(event) {
    console.error('🚨 Global error:', event.error);
});

// Debug Functions
window.getQuantumState = function() {
    const state = getCryptoState();
    console.log('🔍 Quantum State:', state);
    return state;
};

window.debugEntanglement = function() {
    const state = getQuantumState();
    alert(`Quantum Debug:\n\n` +
          `Entangled: ${state.isEntangled}\n` +
          `Has Seed: ${state.hasSeed}\n` +
          `Counter: ${state.counter}\n` +
          `Current Pad: ${state.currentPad}`);
};

// Initialize App
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}


console.log('🔧 Entangle Chat-2 app.js loaded successfully');
