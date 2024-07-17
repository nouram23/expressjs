const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
} = require("firebase/firestore");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const { v4: uuidv4 } = require("uuid"); // Import the uuid package

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
const createOrder = async (data) => {
  const uniqueId = uuidv4();
  const document = doc(db, "Orders", uniqueId);
  const user = await setDoc(document, data);
  return uniqueId;
};
const getOrders = async () => {
  const ordersCollection = collection(db, "Orders");
  const ordersSnapshot = await getDocs(ordersCollection);
  const ordersList = ordersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return ordersList;
};
const getOrderById = async (id) => {
  const documentRef = doc(db, "Orders", id);
  const documentSnapshot = await getDoc(documentRef);
  return documentSnapshot;
};
const updateOrder = async (id, status) => {
  const documentRef = doc(db, "Orders", id);
  await updateDoc(documentRef, { status });
};
module.exports = {
  db,
  createUser,
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
