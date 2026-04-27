import firebase from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js";
import "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js";

const firebaseConfig = {
  apiKey: "AIzaSyCD-TRQIBAXat2Hf9ImtHD1ejZddPkwy-k",
  authDomain: "nutrisense-ai-e9c47.firebaseapp.com",
  projectId: "nutrisense-ai-e9c47",
  storageBucket: "nutrisense-ai-e9c47.firebasestorage.app",
  messagingSenderId: "721548148318",
  appId: "1:721548148318:web:645ae9654f549d589f7ecf"
};

let app, auth, db, provider;

try {
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db = firebase.firestore();
  provider = new firebase.auth.GoogleAuthProvider();
} catch (e) {
  console.warn("Firebase unable to initialize", e);
}

// Wrappers to map compat SDK back to typical functional exports
const signInWithPopup = (authInstance, providerInstance) => authInstance.signInWithPopup(providerInstance);
const signOut = (authInstance) => authInstance.signOut();
const onAuthStateChanged = (authInstance, callback) => authInstance.onAuthStateChanged(callback);

export { app, auth, db, provider, signInWithPopup, signOut, onAuthStateChanged };
