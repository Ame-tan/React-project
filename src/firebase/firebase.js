import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDi5xvDl4FIjiocAbEm5T_Mvtg31a5yAH4",
  authDomain: "myapp-f31f4.firebaseapp.com",
  projectId: "myapp-f31f4",
  storageBucket: "myapp-f31f4.appspot.com",
  messagingSenderId: "220148214392",
  appId: "1:220148214392:web:198e456534401e69151b8d",
  measurementId: "G-8WCP3BN23Q",
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
