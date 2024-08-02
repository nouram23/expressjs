const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  query,
  where,
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
const createMapping = async (data) => {
  const uniqueId = uuidv4();
  const document = doc(db, "CarAndOrderMapping", uniqueId);
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
const getOrderByUserId = async (userId) => {
  const ref = collection(db, "CarAndOrderMapping");
  const _query = query(ref, where("userId", "==", userId));

  const snapshot = await getDocs(_query);
  const list = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (list.length < 1) {
    return [];
  }

  // Use map to create an array of promises
  const resultPromises = list.map(async (element) => {
    const orderSnapshot = await getOrderById(element.orderId);
    const orderData = orderSnapshot.data();
    element.order = { id: orderSnapshot.id, ...orderData };

    const carSnapshot = await getCarById(element.carId);
    const carData = carSnapshot.data();
    element.car = { id: carSnapshot.id, ...carData };

    return element;
  });

  // Wait for all promises to resolve
  const result = await Promise.all(resultPromises);

  return result;
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
const getCars = async (isActive, type) => {
  const carsRef = collection(db, "Car");
  let carsQuery = carsRef;
  if (isActive !== undefined) {
    carsQuery = query(
      carsQuery,
      where("isActive", "==", parseInt(isActive, 10))
    );
  }
  if (type) {
    carsQuery = query(carsQuery, where("carType", "==", type));
  }

  // Execute the query and get the snapshot
  const snapshot = await getDocs(carsQuery);
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
const getCarById = async (id) => {
  const documentRef = doc(db, "Car", id);
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
  createMapping,
  getOrderByUserId,
};
