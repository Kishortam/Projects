import React from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'

const ChatBox = () => {
  return (
    <div className='chat-box'>
      {/* top section of user chat  */}
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>Akshay Wadhavane <img className='dot' src={assets.green_dot} alt="" /></p>
        <img src={assets.help_icon} className='help' alt="" />
      </div>

      {/* chat messages */}
      <div className="chat-msg">
        <div className="s-msg">
          <p className='msg'>Hey where are you?</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30pm</p>
          </div>
        </div>

        <div className="s-msg">
          <img className="msg-img" src={assets.pic1} alt="" />
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30pm</p>
          </div>
        </div>
        
        <div className="r-msg">
          <p className='msg'>I'm at home.</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:31pm</p>
          </div>
        </div>
      </div>



      {/* type message section */}
      <div className="chat-input">
        <input type="text" placeholder='Send a message' />
        <input type="file" name="" id="image" accept='image/png, image/jpeg' hidden/>
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  )
}

export default ChatBox