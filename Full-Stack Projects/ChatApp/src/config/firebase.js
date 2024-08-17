// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {doc, getFirestore, setDoc} from 'firebase/firestore'
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgtos4y4nAna2r83xlzxTcW4gnp0po7Fw",
  authDomain: "chat-app-11039.firebaseapp.com",
  projectId: "chat-app-11039",
  storageBucket: "chat-app-11039.appspot.com",
  messagingSenderId: "420479824137",
  appId: "1:420479824137:web:a6eb5f85bb23a89b79a3d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// sign up
const signup = async(username, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid),{
            id:user.uid,
            usrname:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio: "Hey, there i'm using ChatApp",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid),{
            chatsData: []
        })
    } catch (error) {
        console.error(error)
        toast.error(error.code)
    }
}


// login
const login = async(email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


// logout
const logout = async () =>{
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


export {signup, login, logout, auth, db}
