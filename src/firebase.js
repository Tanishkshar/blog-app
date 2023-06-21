import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_1fayndA5kYc2UA9Ib5tI6p879cT0-vY",
  authDomain: "react-blog-1ba40.firebaseapp.com",
  projectId: "react-blog-1ba40",
  storageBucket: "react-blog-1ba40.appspot.com",
  messagingSenderId: "505183006797",
  appId: "1:505183006797:web:8f207855f4425b18eaec04",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
