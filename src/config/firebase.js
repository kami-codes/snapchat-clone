import {getStorage} from "firebase/storage"
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAihPa90rtvK8jTazR48_Wf08WZx6Ri6gQ",
  authDomain: "snapchat-clone-e3109.firebaseapp.com",
  projectId: "snapchat-clone-e3109",
  storageBucket: "snapchat-clone-e3109.appspot.com",
  messagingSenderId: "615062130352",
  appId: "1:615062130352:web:26ec9a8bd8e61738d57575"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider(app)
export const db = getFirestore(app)