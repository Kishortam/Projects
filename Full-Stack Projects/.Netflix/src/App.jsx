import React, { useEffect } from 'react'
import Home from './components/pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/pages/Login/Login'
import Player from './components/pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
// for toastify notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  // to navigate the user to home page on log in
  const navigate = useNavigate();

  //
  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("Logged in");
        navigate('/')
      }
      else{
        console.log("Logged out");
        navigate('/login')
      }
    })
  }, [])


  return (
    <div>
      <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App