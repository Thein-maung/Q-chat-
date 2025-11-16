# 🔗 Entangle Chat-2

Quantum-inspired secure PWA for private text & voice chat. Uses AI-generated OTP pads via quantum pairing. No phone numbers, no server logs, no metadata.

## ✨ Features

- **Quantum QR Pairing** - Secure device entanglement
- **AI-Generated OTP Pads** - Neural network-based one-time pads
- **End-to-End Encryption** - XOR encryption with perfect secrecy
- **Peer-to-Peer Voice** - Secure voice communication
- **Offline-First PWA** - Works without internet
- **Mobile Debug Console** - Built-in debugging tools
- **No External Dependencies** - Pure JavaScript implementation

## 🚀 Quick Start

1. **Pair Devices**: Share quantum codes between devices
2. **Secure Text Chat**: Encrypted messaging with OTP pads
3. **Private Voice Calls**: Encrypted voice communication

## 🛠️ Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel at [vercel.com](https://vercel.com)
3. Deploy automatically

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select main branch as source

### Local Development
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .

## [file name]: package.json
```json
{
  "name": "entangle-chat-2",
  "version": "2.0.0",
  "description": "Quantum-inspired secure PWA for private text & voice chat",
  "scripts": {
    "dev": "python3 -m http.server 8000",
    "build": "echo 'No build needed - Pure JavaScript PWA'",
    "deploy": "echo 'Deploy to Vercel or GitHub Pages'"
  },
  "keywords": [
    "quantum",
    "encryption",
    "chat",
    "pwa",
    "security",
    "privacy",
    "ai",
    "otp"
  ],
  "author": "Entangle Chat Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/entangle-chat-2"
  }
}