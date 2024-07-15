import React from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'

const Home = ({sidebar}) => {
  return (
    <>
    <Sidebar sidebar = {sidebar}/>
    <div className={`container ${sidebar?"" : 'large-conatiner'}`}>
      <Feed/>
    </div>
    </>
  )
}

export default Home