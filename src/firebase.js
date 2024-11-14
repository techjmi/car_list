
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtGioPJ-OvFsGQ_SMTCt9cDaRkvh3me3g",
  authDomain: "food-web-92bb6.firebaseapp.com",
  projectId: "food-web-92bb6",
  storageBucket: "food-web-92bb6.appspot.com",
  messagingSenderId: "84821599187",
  appId: "1:84821599187:web:a5aa21e3dc81d4f8240526",
  measurementId: "G-X077B4THG3"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
// const analytics = getAnalytics(app);