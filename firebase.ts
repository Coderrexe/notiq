import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8NcAXIZ-7cmTPxS-rqmXZLqLMMlga4H8",
  authDomain: "notiq-415be.firebaseapp.com",
  projectId: "notiq-415be",
  storageBucket: "notiq-415be.firebasestorage.app",
  messagingSenderId: "433433134402",
  appId: "1:433433134402:web:f9dc269f3b93d0b47e34db",
  measurementId: "G-7MLKGH0FQW",
};

// when using Next.js, there's chance of double initialisation – we must check for this
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
