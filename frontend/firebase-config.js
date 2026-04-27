import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// In production, populate this with actual config or load from env securely
const firebaseConfig = {
  apiKey: "MOCK_API_KEY",
  authDomain: "nutrisense.firebaseapp.com",
  projectId: "nutrisense",
  storageBucket: "nutrisense.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:123"
};

let app, auth, provider;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
} catch (e) {
    console.warn("Firebase unable to initialize with mock config", e);
}

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };
