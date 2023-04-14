import { initializeApp } from "firebase/app";
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  apiKey: "AIzaSyDLbcvbQrb04u5d4Kc2GwCFfABRNHhAxqU",
  authDomain: "tenboonline.firebaseapp.com",
  databaseURL: "https://tenboonline-default-rtdb.firebaseio.com",
  projectId: "tenboonline",
  storageBucket: "tenboonline.appspot.com",
  messagingSenderId: "1088704558121",
  appId: "1:1088704558121:web:525e6e15663a1cb7ce9838",
  measurementId: "G-EQH9CCVFG7",
};
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
