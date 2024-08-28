import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
// imported from react-toastify/gist
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { AppContext } from './context/AppContext'

const App = () => {

  const navigate = useNavigate(); // to navigate a user
  const {loadUserData} = useContext(AppContext) // using AppContext

  // whenever we login or logout, this method will execute
  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        navigate('/chat'); // if we have authenticate user, then we navigate it to chat page
        // console.log(user);
        await loadUserData(user.uid)
      }
      else{
        navigate('/'); // if user dont found or doesn't authenticate navigate it to login page
      }
    })
  }, []);

  return (
    <>
    <ToastContainer/>
    <Routes>
      {/* Routes to pages: on opening a webpage by default login page will appear*/}
      <Route path='/' element={<Login/>}/> 
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>
    </Routes>
    </>
  )
}

export default App