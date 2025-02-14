import React from 'react'
import { useAuthStore } from '../../Store/authUser'

const HomeScreen = () => {
  const {logout} = useAuthStore();

  return (
    <button onClick={logout}>Logout</button>
  )
}

export default HomeScreen