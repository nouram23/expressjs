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
const {
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
  ref,
} = require("firebase/storage");
const giveCurrentDateTime = require("../utils");
const multer = require("multer");

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
const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

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
const createCarType = async (data) => {
  const uniqueId = uuidv4();
  const document = doc(db, "CarType", uniqueId);
  const user = await setDoc(document, data);
  return uniqueId;
};
const uploadImage = async (file) => {
  const dateTime = giveCurrentDateTime();
  const storageRef = ref(
    storage,
    `${file.originalname + "       " + dateTime}`
  );
  // Create file metadata including the content type
  const metadata = {
    contentType: file.mimetype,
  };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // Grab the public url
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
const createCar = async (data) => {
  const uniqueId = uuidv4();
  const document = doc(db, "Car", uniqueId);
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
const getCarTypes = async () => {
  const carTypesCollection = collection(db, "CarType");
  const snapshot = await getDocs(carTypesCollection);
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return list;
};
const getCars = async () => {
  const collections = collection(db, "Car");
  const snapshot = await getDocs(collections);
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return list;
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
  getCarTypes,
  createCarType,
  getCars,
  createCar,
  upload,
  uploadImage,
};
