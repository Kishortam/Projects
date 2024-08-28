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
    if(chatData && userData){ // if both chatData & userData is available make loading false
      setLoading(false);
    }
  },[chatData,userData ])

  // while chat data is loading, we can show 'loading'
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