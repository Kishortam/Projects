// Basic code copied from firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {collection, doc, getDocs, getFirestore, query, setDoc, where} from 'firebase/firestore'
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// 1. Authentication  2. Firesotre Database  3. Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRFFWeJqfqygMClGc4OPCcChrNfmedlYk",
  authDomain: "whatchat-469f7.firebaseapp.com",
  projectId: "whatchat-469f7",
  storageBucket: "whatchat-469f7.appspot.com",
  messagingSenderId: "290794723768",
  appId: "1:290794723768:web:c1d28264848dbc1920d74d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app);

// Signup
const signup = async (username, email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        // users collection : it will show all data of below attributes in Firebase DB
        await setDoc(doc(db, "users", user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, there I am using whatChat",
            lastSeen:Date.now()
         })
        //  Chats collection
         await setDoc(doc(db, "chats", user.uid),{
            chatsData:[]
         })
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


// Login
const login = async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


// Logout
const logout = async() =>{
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

// reset password
const resetPassword = async(email)=>{
    if(!email){
        toast.error("enter your email");
        return null;
    }
    try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where("email", "==", email));
        const querySnap = await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset email sent")
        }
        else{
            toast.error("Email doesn't exists")
        }
    } catch (error) {
        console.error(error);
        toast.error(error.message);
    }
}


export {signup, login, logout,auth, db, resetPassword}
