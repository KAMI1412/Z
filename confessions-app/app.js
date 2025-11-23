// Initialize the app
let confessions = [];
const STORAGE_KEY = 'confessions';
let sdk = null;

// DOM elements
const confessionInput = document.getElementById('confession-input');
const charCounter = document.getElementById('char-counter');
const submitBtn = document.getElementById('submit-btn');
const confessionsList = document.getElementById('confessions-list');
const loadingOverlay = document.getElementById('loading-overlay');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Initialize Farcaster SDK
async function initApp() {
    try {
        showLoading();
        
        // Load confessions from localStorage
        loadConfessions();
        
        // Try to load Farcaster SDK if available
        try {
            const module = await import('https://esm.sh/@farcaster/miniapp-sdk');
            sdk = module.sdk;
            if (sdk && sdk.actions && sdk.actions.ready) {
                await sdk.actions.ready();
            }
        } catch (error) {
            console.log('Running in standalone mode (SDK not available)');
        }
        
        hideLoading();
        renderConfessions();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        hideLoading();
    }
}

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.getAttribute('data-tab');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        // Refresh confessions when switching to read tab
        if (tabName === 'read') {
            renderConfessions();
        }
    });
});

// Character counter
confessionInput.addEventListener('input', () => {
    const length = confessionInput.value.length;
    charCounter.textContent = length;
    
    if (length > 450) {
        charCounter.style.color = '#ff4444';
    } else {
        charCounter.style.color = '#999';
    }
});

// Submit confession
submitBtn.addEventListener('click', async () => {
    const text = confessionInput.value.trim();
    
    if (!text) {
        alert('Please write something before submitting!');
        return;
    }
    
    if (text.length < 10) {
        alert('Your confession is too short. Please write at least 10 characters.');
        return;
    }
    
    try {
        showLoading();
        
        const confession = {
            id: generateId(),
            text: text,
            timestamp: Date.now(),
            createdAt: new Date().toISOString()
        };
        
        // Add to confessions array
        confessions.unshift(confession);
        
        // Save to localStorage
        saveConfessions();
        
        // Clear input
        confessionInput.value = '';
        charCounter.textContent = '0';
        
        // Show success message
        await showSuccessMessage();
        
        // Switch to read tab
        switchToReadTab();
        
        hideLoading();
    } catch (error) {
        console.error('Failed to submit confession:', error);
        alert('Failed to submit confession. Please try again.');
        hideLoading();
    }
});

// Load confessions from localStorage
function loadConfessions() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            confessions = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Failed to load confessions:', error);
        confessions = [];
    }
}

// Save confessions to localStorage
function saveConfessions() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(confessions));
    } catch (error) {
        console.error('Failed to save confessions:', error);
    }
}

// Render confessions
function renderConfessions() {
    if (confessions.length === 0) {
        confessionsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <p>No confessions yet.</p>
                <p style="margin-top: 10px; font-size: 0.9em;">Be the first to share!</p>
            </div>
        `;
        return;
    }
    
    confessionsList.innerHTML = confessions.map(confession => `
        <div class="confession-card">
            <p class="confession-text">${escapeHtml(confession.text)}</p>
            <div class="confession-meta">
                <span class="confession-time">${formatTime(confession.timestamp)}</span>
                <span class="confession-id">#${confession.id}</span>
            </div>
        </div>
    `).join('');
}

// Switch to read tab
function switchToReadTab() {
    tabs.forEach(t => t.classList.remove('active'));
    tabs[1].classList.add('active');
    
    tabContents.forEach(content => content.classList.remove('active'));
    document.getElementById('read-tab').classList.add('active');
    
    renderConfessions();
}

// Show success message
async function showSuccessMessage() {
    return new Promise(resolve => {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #4caf50;
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 2000;
            animation: slideDown 0.3s ease;
        `;
        message.textContent = '✓ Confession submitted anonymously!';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(message);
                resolve();
            }, 300);
        }, 2000);
    });
}

// Utility functions
function generateId() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading() {
    loadingOverlay.classList.add('active');
}

function hideLoading() {
    loadingOverlay.classList.remove('active');
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
