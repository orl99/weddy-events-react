import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../envs/firebase.config';
import { getFirestore } from "firebase/firestore";
// Initialize Firebase
export const app = initializeApp(firebaseConfig);




// Your web app's Firebase configuration
// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
