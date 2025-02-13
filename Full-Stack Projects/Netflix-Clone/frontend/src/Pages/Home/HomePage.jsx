import React from 'react'
import AuthScreen from './AuthScreen';


const HomePage = () => {
  const user = false;
  return (
    <div>{user ? <HomeScreen/> : <AuthScreen/>}</div>
  )
}

export default HomePage