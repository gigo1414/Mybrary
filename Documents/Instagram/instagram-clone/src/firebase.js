import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseApp = firebase.initializeApp(
    {
        apiKey: "AIzaSyAM5Hkmeq_QzDRm9mNeIaDgJpczCxGatGQ",
        authDomain: "instagram-clone-cfb5d.firebaseapp.com",
        projectId: "instagram-clone-cfb5d",
        storageBucket: "instagram-clone-cfb5d.appspot.com",
        messagingSenderId: "418622336590",
        appId: "1:418622336590:web:0bb79482dacfd099305d1f"
      }
);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}