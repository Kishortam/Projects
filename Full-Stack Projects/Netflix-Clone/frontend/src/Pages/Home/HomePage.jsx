import React from 'react'
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../Store/authUser';
import HomeScreen from './HomeScreen';


const HomePage = () => {
  const {user} = useAuthStore();  // using function from authUser.js

  return (
    // if user is logged in then show HomeScreen else show AuthScreen
    <div>{user ? <HomeScreen/> : <AuthScreen/>}</div>
  )
}

export default HomePage