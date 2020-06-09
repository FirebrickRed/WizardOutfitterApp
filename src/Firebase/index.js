import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAynV5vYISi875Ss-5SZlndZQFEWNeCpcs",
  authDomain: "wizardoutfitter.firebaseapp.com",
  databaseURL: "https://wizardoutfitter.firebaseio.com",
  projectId: "wizardoutfitter",
  storageBucket: "wizardoutfitter.appspot.com",
  messagingSenderId: "722597225453",
  appId: "1:722597225453:web:763a41f1ae85c3fdd23de4",
  measurementId: "G-7YX6WMWXYN",
};

firebase.initializeApp(firebaseConfig);

export const FireAuth = firebase.auth();
const myFireStore = firebase.firestore();

// Auth API
export const createUserWithEmailAndPassword = (email, password) =>
  FireAuth.createUserWithEmailAndPassword(email, password);

export const signInWithEmailAndPassword = (email, password) =>
  FireAuth.signInWithEmailAndPassword(email, password);

export const signOut = () => FireAuth.signOut();

export const resetPassword = (email) => FireAuth.sendPasswordResetEmail(email);

export const updatePassword = (password) =>
  FireAuth.currentUser.updatePassword(password);

export const getCurrentUserID = () => FireAuth.currentUser.uid;

// User API
export const getSingleUser = (userId) =>
  myFireStore.collection(`Users/${userId}`);

export const addSingleUser = (userId, info) =>
  myFireStore.collection("Users").doc(userId).set(info);

export const getAllWizardsForUser = (userId) =>
  myFireStore.collection(`Users/${userId}/Wizards`);

export const addSingleWizard = (userId, wizardInfo) =>
  myFireStore.collection(`Users/${userId}/Wizards`).doc().set(wizardInfo);

export const addEquipmentToWizard = (userId, wizardId, equipment) =>
  myFireStore
    .collection(`Users/${userId}/Wizards`)
    .doc(wizardId)
    .update({ [`Equipment.${equipment.Type}`] : equipment });

// Database API
export const getItems = (collection) => myFireStore.collection(collection);

export const getBaseStats = (school) =>
  myFireStore.doc(`BaseStats/${school}School`);
