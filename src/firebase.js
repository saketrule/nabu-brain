import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDG6SoIuXlX8m5qyt4S1csldZA7hWm726M",
    authDomain: "nabu-sciences.firebaseapp.com",
    projectId: "nabu-sciences",
    storageBucket: "nabu-sciences.firebasestorage.app",
    messagingSenderId: "178570040802",
    appId: "1:178570040802:web:7fa37fe9b27a18886f95bb",
    measurementId: "G-4S8VJTF30X"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
