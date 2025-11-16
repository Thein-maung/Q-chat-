// Quantum Debug Console
console.log('🔧 Loading quantum debug console...');

class QuantumDebug {
    constructor() {
        this.logs = [];
        this.maxLogs = 50;
        this.init();
    }

    init() {
        this.createConsoleUI();
        this.overrideConsoleMethods();
        console.log('✅ Quantum debug console ready');
    }

    createConsoleUI() {
        const debugHTML = `
            <div id="quantum-debug" style="
                position: fixed;
                bottom: 10px;
                right: 10px;
                width: 95%;
                max-width: 400px;
                height: 300px;
                background: rgba(0,0,0,0.95);
                color: #00ff00;
                font-family: 'Courier New', monospace;
                font-size: 12px;
                border: 2px solid #00ff00;
                border-radius: 10px;
                z-index: 10000;
                display: none;
                flex-direction: column;
            ">
                <div style="
                    display: flex;
                    justify-content: space-between;
                    background: #000;
                    padding: 8px;
                    border-bottom: 1px solid #00ff00;
                ">
                    <strong>🔧 Quantum Debug</strong>
                    <div>
                        <button onclick="quantumDebug.clear()" style="margin-right: 5px; background: #ff4444; color: white; border: none; padding: 2px 8px; border-radius: 3px; font-size: 10px;">Clear</button>
                        <button onclick="quantumDebug.toggle()" style="background: #666; color: white; border: none; padding: 2px 8px; border-radius: 3px; font-size: 10px;">Hide</button>
                    </div>
                </div>
                <div id="quantum-debug-log" style="
                    flex: 1;
                    overflow-y: auto;
                    padding: 10px;
                    line-height: 1.4;
                "></div>
                <div style="
                    display: flex;
                    border-top: 1px solid #00ff00;
                    background: #000;
                ">
                    <input type="text" id="quantum-debug-command" placeholder="Debug command..." style="
                        flex: 1;
                        background: #000;
                        color: #00ff00;
                        border: none;
                        padding: 8px;
                        outline: none;
                        font-family: 'Courier New', monospace;
                    ">
                    <button onclick="quantumDebug.executeCommand()" style="
                        background: #00ff00;
                        color: #000;
                        border: none;
                        padding: 8px 12px;
                        font-weight: bold;
                        font-family: 'Courier New', monospace;
                    ">Run</button>
                </div>
            </div>
            <button onclick="quantumDebug.toggle()" style="
                position: fixed;
                bottom: 10px;
                right: 10px;
                background: #00ff00;
                color: #000;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 16px;
                z-index: 9999;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                cursor: pointer;
            ">🐛</button>
        `;

        const div = document.createElement('div');
        div.innerHTML = debugHTML;
        document.body.appendChild(div);
    }

    toggle() {
        const console = document.getElementById('quantum-debug');
        if (console.style.display === 'none' || !console.style.display) {
            console.style.display = 'flex';
            this.updateLogDisplay();
        } else {
            console.style.display = 'none';
        }
    }

    overrideConsoleMethods() {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        console.log = (...args) => {
            this.addLog('info', args);
            originalLog.apply(console, args);
        };

        console.error = (...args) => {
            this.addLog('error', args);
            originalError.apply(console, args);
        };

        console.warn = (...args) => {
            this.addLog('warn', args);
            originalWarn.apply(console, args);
        };
    }

    addLog(level, args) {
        const timestamp = new Date().toLocaleTimeString();
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');

        this.logs.push({
            level,
            timestamp,
            message,
            color: this.getColorForLevel(level)
        });

        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        this.updateLogDisplay();
    }

    getColorForLevel(level) {
        const colors = {
            info: '#00ff00',
            error: '#ff4444',
            warn: '#ffaa00'
        };
        return colors[level] || '#00ff00';
    }

    updateLogDisplay() {
        const logContainer = document.getElementById('quantum-debug-log');
        if (!logContainer) return;

        logContainer.innerHTML = this.logs.map(log => `
            <div style="color: ${log.color}; margin-bottom: 2px; font-size: 11px;">
                <span style="opacity: 0.7;">[${log.timestamp}]</span>
                ${log.message}
            </div>
        `).join('');

        logContainer.scrollTop = logContainer.scrollHeight;
    }

    clear() {
        this.logs = [];
        this.updateLogDisplay();
    }

    executeCommand() {
        const input = document.getElementById('quantum-debug-command');
        const command = input.value.trim();
        
        if (!command) return;

        try {
            const result = eval(command);
            console.log('💻 Command result:', result);
        } catch (error) {
            console.error('💻 Command error:', error);
        }

        input.value = '';
    }
}

// Initialize quantum debug console
const quantumDebug = new QuantumDebug();

// Global access
window.quantumDebug = quantumDebug;

console.log('✅ Quantum debug system loaded');