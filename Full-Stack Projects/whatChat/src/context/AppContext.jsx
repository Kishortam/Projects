import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Skeleton of AppContext
// export const AppContext = createContext();

// const AppContextProvider = (props) =>{

//     const value = {

//     }

//     return(
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

// export default AppContextProvider

// ---------------------------------------------

// import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) =>{

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // to store user data in DB
    const [chatData, setChatData] = useState(null); // to store chat data in DB
    const [messagesId, setMessagesId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatUser, setChatUser] = useState(null);
    const [chatVisible, setChatVisible] = useState(false);

    const loadUserData = async (uid) =>{
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            setUserData(userData); // we'll store user data into userData variable

            // if users avatar & name is available, then navigate it to chat page, else on profile page to upload it
            if(userData.avatar && userData.name){
                navigate('/chat');
            }
            else{
                navigate('/profile')
            }
            // if user is authenticated, we will update its last seen every minute
            await updateDoc(userRef, {
                lastSeen: Date.now()
            })
            setInterval(async() => {
                if(auth.chatUser){
                    await updateDoc(userRef, {
                        lastSeen: Date.now()
                    })
                }
            }, 60000);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(userData){
            const chatRef = doc(db, 'chats', userData.id);
            const unSub = onSnapshot(chatRef, async(res)=>{
                const chatItems = res.data().chatsData;
                const tempData = [];
                for(const item of chatItems){
                    const userRef = doc(db, 'users', item.rId);
                    const userSnap = await getDoc(userRef);
                    const userData = userSnap.data();
                    tempData.push({...item, userData})
                }
                setChatData(tempData.sort((a,b)=> b.updatedAt - a.updatedAt))
            })
            return ()=>{
                unSub();
            }
        }
    },[userData])

    const value = {
        userData, setUserData,
        chatData, setChatData,
        loadUserData,
        messages, setMessages,
        messagesId, setMessagesId,
        chatUser, setChatUser,
        chatVisible, setChatVisible
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider