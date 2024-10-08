import React, { useContext, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Chat from './pages/Chat/Chat'
import ProfileUpdate from './pages/ProfileUpdate/ProfileUpdate'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { AppContext } from './context/AppContext'

const App = () => {

  const navigate = useNavigate();

  // to use context
  const {loadUserData} = useContext(AppContext)

  useEffect(()=>{
    // while authentication done, if user found & and successfully logged in it will redirect to chat page
    // else it will still be at login page
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        navigate('/chat')
        await loadUserData(user.uid)
      }
      else{
        navigate('/')
      }
    })
  })

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<ProfileUpdate/>}/>
    </Routes>
    </>
  )
}

export default App