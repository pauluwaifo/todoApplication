import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// allow read, write: if request.time < timestamp.date(2023, 11, 14);

const firebaseConfig = {
  apiKey: "AIzaSyAvjgbu0Tik-5yRfmV07xPonwkoB2pm-ec",
  authDomain: "user-data-c5ce1.firebaseapp.com",
  projectId: "user-data-c5ce1",
  storageBucket: "user-data-c5ce1.appspot.com",
  messagingSenderId: "488602970286",
  appId: "1:488602970286:web:ae99c2c768825ca061a53f",
  measurementId: "G-25EN0MCP1X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
