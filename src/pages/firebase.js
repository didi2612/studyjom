// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACAnlckW9wnvpoDPtV2iOs3-cqkZ3womg",
  authDomain: "studyjom-81af9.firebaseapp.com",
  projectId: "studyjom-81af9",
  storageBucket: "studyjom-81af9.appspot.com",
  messagingSenderId: "342668211076",
  appId: "1:342668211076:web:16584c8c455740741723d1",
  measurementId: "G-3PEWWCY607",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
