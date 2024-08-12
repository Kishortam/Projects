// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq-k2uYNvAwSYA_7SG0fTlw92wsWi3ZAU",
  authDomain: "netflix-clone-ea461.firebaseapp.com",
  projectId: "netflix-clone-ea461",
  storageBucket: "netflix-clone-ea461.appspot.com",
  messagingSenderId: "39163776304",
  appId: "1:39163776304:web:646417f83e62a793004cf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const db = getFirestore;

// user Sign up function
const signup = async(name, email, password)=>{
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}



// user Signin function
const login = async (email, password) => {
    try {
        signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}



// log out function
const logout = ()=>{
    signOut(auth);
}


export {auth, db, login, signup, logout}
