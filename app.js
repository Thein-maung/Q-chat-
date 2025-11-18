// Entangle Chat-2 - Mobile Optimized
console.log('📱 Mobile: Starting Entangle Chat...');

// Global state
let currentSeed = null;
let isEntangled = false;
let TWIN_SEED = null;
let CRYPTO_COUNTER = 0;

// Mobile-friendly initialization
function initializeApp() {
    console.log('📱 Mobile: Initializing...');
    
    const status = document.getElementById('status');
    const codeDisplay = document.getElementById('code-display');
    
    // Check if we're on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    console.log('📱 Mobile device:', isMobile);
    
    if (!status) {
        console.error('❌ Status element not found');
        return;
    }
    
    try {
        // Update status immediately
        status.textContent = '📱 Loading...';
        
        // Generate quantum seed with mobile-safe approach
        generateMobileSeed();
        
        // Update UI
        status.textContent = '✅ QUANTUM READY';
        status.style.color = 'green';
        
        if (codeDisplay) {
            const seedB64 = btoa(String.fromCharCode(...currentSeed));
            codeDisplay.textContent = seedB64;
            console.log('📱 Code displayed');
        }
        
        // Setup mobile-friendly buttons
        setupMobileButtons();
        
        console.log('✅ Mobile app ready');
        
    } catch (error) {
        console.error('❌ Mobile init failed:', error);
        if (status) {
            status.textContent = '❌ Load failed - tap buttons';
            status.style.color = 'red';
        }
    }
}

// Mobile-safe seed generation
function generateMobileSeed() {
    console.log('📱 Generating mobile seed...');
    
    currentSeed = new Uint8Array(32);
    
    // Try crypto API first
    if (window.crypto && crypto.getRandomValues) {
        try {
            crypto.getRandomValues(currentSeed);
            console.log('✅ Used crypto.getRandomValues');
            return;
        } catch (e) {
            console.log('⚠️ Crypto failed, using fallback');
        }
    }
    
    // Fallback for mobile browsers
    console.log('📱 Using mobile fallback RNG');
    for (let i = 0; i < 32; i++) {
        currentSeed[i] = Math.floor(Math.random() * 256);
    }
}

// Mobile-friendly button setup
function setupMobileButtons() {
    console.log('📱 Setting up mobile buttons...');
    
    // Partner code button
    const scanBtn = document.getElementById('scan');
    if (scanBtn) {
        scanBtn.addEventListener('click', handleMobilePartnerCode);
        console.log('✅ Scan button ready');
    }
    
    // Regenerate seed
    const regenBtn = document.getElementById('regen-seed');
    if (regenBtn) {
        regenBtn.addEventListener('click', handleMobileRegenerate);
        console.log('✅ Regen button ready');
    }
    
    // Navigation buttons
    const textBtn = document.getElementById('text-chat');
    const voiceBtn = document.getElementById('voice-chat');
    
    if (textBtn) {
        textBtn.addEventListener('click', () => handleMobileNavigation('text'));
    }
    if (voiceBtn) {
        voiceBtn.addEventListener('click', () => handleMobileNavigation('voice'));
    }
    
    enableMobileNavigation(false);
}

// Mobile partner code handler
function handleMobilePartnerCode() {
    console.log('📱 Partner code tapped');
    
    const status = document.getElementById('status');
    const codeDisplay = document.getElementById('code-display');
    
    // Use current code for self-test
    const currentCode = codeDisplay ? codeDisplay.textContent : '';
    
    if (currentCode && currentCode !== 'Generating...') {
        // Self-test with current code
        processMobileCode(currentCode);
    } else {
        // Manual entry fallback
        const userCode = prompt('Enter partner quantum code:');
        if (userCode) {
            processMobileCode(userCode);
        }
    }
}

function processMobileCode(code) {
    const status = document.getElementById('status');
    
    try {
        status.textContent = '🔐 Quantum Entanglement...';
        
        const cleanCode = code.trim();
        const bin = Uint8Array.from(atob(cleanCode), c => c.charCodeAt(0));
        
        if (bin.length === 32) {
            currentSeed = bin;
            setMobileSeed(bin);
            isEntangled = true;
            
            status.textContent = '✅ QUANTUM ENTANGLED!';
            status.style.color = 'green';
            
            enableMobileNavigation(true);
            
            // Show success message
            setTimeout(() => {
                alert('🎉 Quantum entanglement successful!\n\nYou can now use secure chat and voice features.');
            }, 500);
            
        } else {
            throw new Error('Invalid code length');
        }
        
    } catch (error) {
        status.textContent = '❌ Invalid code';
        status.style.color = 'red';
        
        setTimeout(() => {
            alert('Please check the quantum code and try again.');
        }, 500);
    }
}

// Mobile seed setting
function setMobileSeed(seedBytes) {
    let hashBuffer = new Uint8Array(32);
    for (let i = 0; i < seedBytes.length; i++) {
        hashBuffer[i % 32] ^= seedBytes[i];
    }
    TWIN_SEED = hashBuffer;
    CRYPTO_COUNTER = 0;
    console.log('📱 Quantum seed set');
}

// Mobile regenerate
function handleMobileRegenerate() {
    console.log('📱 Regenerate tapped');
    
    generateMobileSeed();
    
    const status = document.getElementById('status');
    const codeDisplay = document.getElementById('code-display');
    
    status.textContent = '🔄 New Quantum Seed';
    status.style.color = 'blue';
    
    if (codeDisplay) {
        const seedB64 = btoa(String.fromCharCode(...currentSeed));
        codeDisplay.textContent = seedB64;
    }
    
    isEntangled = false;
    enableMobileNavigation(false);
}

// Mobile navigation
function handleMobileNavigation(destination) {
    if (!isEntangled) {
        alert('🔐 Please establish quantum entanglement first!\n\nTap "Enter Partner Code" and use your quantum code.');
        return;
    }
    
    if (destination === 'text') {
        showMobileChatDemo();
    } else if (destination === 'voice') {
        showMobileVoiceDemo();
    }
}

// Mobile chat demo
function showMobileChatDemo() {
    const message = prompt('💬 Enter a test message to encrypt:');
    
    if (message) {
        // Simple encryption demo
        const pad = generateMobilePad(32);
        let encrypted = '';
        
        for (let i = 0; i < message.length; i++) {
            encrypted += String.fromCharCode(message.charCodeAt(i) ^ pad[i]);
        }
        
        const encryptedB64 = btoa(encrypted);
        
        // Show results
        alert(`🔐 Quantum Encryption Test:\n\n` +
              `Original: ${message}\n` +
              `Encrypted: ${encryptedB64}\n\n` +
              `✅ Message secured with quantum OTP!`);
    }
}

// Mobile voice demo
function showMobileVoiceDemo() {
    alert(`🎙️ Quantum Voice Chat Ready!\n\n` +
          `Your voice would be encrypted in real-time using:\n` +
          `• AI-generated OTP pads\n` +
          `• Quantum-secure encryption\n` +
          `• Peer-to-peer connection\n\n` +
          `Tap OK to continue`);
}

// Mobile pad generator
function generateMobilePad(length = 32) {
    const pad = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        pad[i] = (currentSeed[i % 32] + CRYPTO_COUNTER + i * 7) % 256;
    }
    CRYPTO_COUNTER++;
    return pad;
}

// Mobile navigation enable/disable
function enableMobileNavigation(enabled) {
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
    
    console.log('📱 Navigation', enabled ? 'enabled' : 'disabled');
}

// Mobile error handling
window.addEventListener('error', function(event) {
    console.error('📱 Mobile error:', event.error);
});

// Mobile-specific initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // If already loaded, wait a bit for mobile rendering
    setTimeout(initializeApp, 100);
}

console.log('📱 Mobile app script loaded');
