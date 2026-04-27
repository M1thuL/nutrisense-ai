import { auth, provider, signInWithPopup, onAuthStateChanged } from './firebase-config.js';

// Setup Authentication state
export let currentUser = null;
export const API_BASE = "http://localhost:8080/api"; // Default dev server url

document.addEventListener('DOMContentLoaded', () => {
    const loginScreen = document.getElementById('login-screen');
    const mainDashboard = document.getElementById('main-dashboard');
    const btnLogin = document.getElementById('btn-login');
    const userInfo = document.getElementById('user-info');
    const profileNotice = document.getElementById('profile-notice');

    btnLogin.addEventListener('click', async () => {
        try {
            // Mock login for demonstration if missing real api key
            // await signInWithPopup(auth, provider);
            // Simulate Google Login
            currentUser = { uid: "test-user-123", displayName: "Guest User" };
            handleAuthState(currentUser);
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login failed, falling back to mock user...");
            currentUser = { uid: "test-user-123", displayName: "Guest User" };
            handleAuthState(currentUser);
        }
    });

    if (auth) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                currentUser = user;
                handleAuthState(user);
            }
        });
    }

    function handleAuthState(user) {
        loginScreen.classList.add('hidden');
        mainDashboard.classList.remove('hidden');
        userInfo.innerHTML = `<span>👤 ${user.displayName || 'User'}</span>`;
        window.dispatchEvent(new CustomEvent('user-ready', { detail: { user } }));
    }

    // Tabs setup
    const tabs = document.querySelectorAll('.stitch-tab');
    const panels = document.querySelectorAll('.view-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active classes
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.add('hidden'));

            // Add active to current
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.target);
            target.classList.remove('hidden');
        });
    });

    document.getElementById('btn-go-profile').addEventListener('click', () => {
        document.querySelector('.stitch-tab[data-target="profile-view"]').click();
        profileNotice.classList.add('hidden');
    });
});
