import React from 'react'
import assets from '../../assets/assets'
import './LeftSideBar.css'
import { useNavigate } from 'react-router-dom'
import { collection, query } from 'firebase/firestore'
import { db } from '../../config/firebase'

const LeftSideBar = () => {

    const inputHandler = async(e)=>{
        try {
            const input = e.target.value;
            const userRef = collection(db, 'users');
            const q = query(userRef, where("username", "==", input.toLowerCase()));
            const querySnap = await getDoc(q);
            if(!querySnap.empty){
                console.log(querySnap.doc[0].data());
            }
        } catch (error) {
            
        }
    }

    const navigate = useNavigate();
  return (
    <div className='ls'>
        <div className="ls-top">
            <div className="ls-nav">
                <img src={assets.logo} className='logo'/>
                <div className="menu">
                    <img src={assets.menu_icon} alt="" />
                    {/* sub menu near bar icon */}
                    <div className="sub-menu">
                        <p onClick={()=>navigate('/profile')}>Edit Profile</p>
                        <hr />
                        <p>Logout</p>
                    </div>
                </div>
            </div>
            <div className="ls-search">
                <img src={assets.search_icon} alt="" />
                <input onChange={inputHandler} type="text" placeholder='search here' />
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