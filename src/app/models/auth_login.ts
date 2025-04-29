// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    connectAuthEmulator
} from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBceF-jo2ovfwggamRltCHNiA1W-6VcCXc",
    authDomain: "cuatrovientos-agenda-2030.firebaseapp.com",
    projectId: "cuatrovientos-agenda-2030",
    storageBucket: "cuatrovientos-agenda-2030.firebasestorage.app",
    messagingSenderId: "1081372264341",
    appId: "1:1081372264341:web:a474937c75a435643e189c",
    measurementId: "G-1CZ9QLJ11C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
//Cambiar por los datos que nos regresen del login de la app
const email = "email@gmail.com"
const password = "password"

const auth = getAuth(app);
connectAuthEmulator(auth, "http://127.0.0.1:9099");

createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });

signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        console.log(user + " Is signed up")
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        console.log(user + " Is signed out")
        // ...
    }
});