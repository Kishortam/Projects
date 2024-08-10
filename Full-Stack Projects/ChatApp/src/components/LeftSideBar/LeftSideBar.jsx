import React from 'react'
import assets from '../../assets/assets'
import './LeftSideBar.css'

const LeftSideBar = () => {
  return (
    <div className='ls'>
        <div className="ls-top">
            <div className="ls-nav">
                <img src={assets.logo} className='logo'/>
                <div className="menu">
                    <img src={assets.menu_icon} alt="" />
                </div>
            </div>
            <div className="ls-search">
                <img src={assets.search_icon} alt="" />
                <input type="text" placeholder='search here' />
            </div>
        </div>
        <div className="ls-list">
            {/* to make multiple instances of list chats */}
            {Array(12).fill(" ").map((item, index)=>(
                <div key={index} className="friends">
                <img src={assets.profile_img} alt="" />
                <div>
                    <p>Jagrut Jadhav</p>
                    <span>Good Morning</span>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default LeftSideBar