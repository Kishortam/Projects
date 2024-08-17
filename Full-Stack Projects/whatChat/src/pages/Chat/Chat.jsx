import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { AppContext } from '../../context/AppContext'

const Chat = () => {

  const {chatData, userData} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(chatData && userData){
      setLoading(false);
    }
  },[chatData,userData ])

  return (
    <div className='chat'>
      {
        loading ? <p className='loading'>Loading...</p>
        :
        <div className="chat-container">
        {/* mount all components of chat page */}
        <LeftSideBar/>
        <ChatBox/>
        <RightSideBar/>
      </div>
      }
    </div>
  )
}

export default Chat