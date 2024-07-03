// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

const {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
} = require("firebase/firestore");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZxYJnp_IgcBQDs2k8RXiGSqvQOx8gYtM",
  authDomain: "ekocab2024.firebaseapp.com",
  projectId: "ekocab2024",
  storageBucket: "ekocab2024.appspot.com",
  messagingSenderId: "451941456359",
  appId: "1:451941456359:web:a5a5a1f647f46baaab8542",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

const createUser = async (data) => {
  const document = doc(db, "Users", data.uid);
  const user = await setDoc(document, data);
  return user;
};
module.exports = {
  db,
  createUser,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
