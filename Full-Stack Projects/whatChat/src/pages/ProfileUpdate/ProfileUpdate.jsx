import React, { useContext, useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import {doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../lib/upload';
import { AppContext } from '../../context/AppContext';

const ProfileUpdate = () => {

  const navigate = useNavigate();
  const [image, setImage] = useState(false); // to setup profile picture
  const [name, setName] = useState("");  // to store name, when profile setup
  const [bio, setBio] = useState(""); // to store bio, when profile setup
  const [uid, setUid] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const {setUserData} = useContext(AppContext);

  // to update profile image
  const profileUpdate = async(event)=>{
    event.preventDefault();

    try {
      if(!prevImage && !image){
        toast.error("Upload a profile picture")
      }
      const docRef = doc(db, 'users', uid);
      if(image){
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        //update img, bio, name
        await updateDoc(docRef, {
          avatar:imgUrl,
          bio:bio,
          name:name
        })
      }
      else{
        await updateDoc(docRef, {
          bio:bio,
          name:name
        })
      }
      const snap = await getDoc(docRef);
      setUserData(snap.data());
      // when click on save button will redirect to chat page
      navigate('/chat');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        setUid(user.uid)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef)
        // if userdata is present in document, set in state variables
        if(docSnap.data().name){
          setName(docSnap.data().name);
        }
        if(docSnap.data().bio){
          setBio(docSnap.data().bio);
        }
        if(docSnap.data().avatar){
          setPrevImage(docSnap.data().avatar);
        }
      }
      else{
        navigate('/');
      }
    })
  })



  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <label htmlFor="avatar">
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden/>
            {/* if image available show it, else show avatar  */}
            <img src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            Upload Profile Picture
          </label>

          <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Your name' required />
          <textarea onChange={(e) => setBio(e.target.bio)} value={bio} placeholder='Write profile bio' required></textarea>
          <button type='submit'>Save</button>
        </form>

        {/* if image available show it, else show logo  */}
        <img className='profile-pic' src={image ? URL.createObjectURL(image) : prevImage ? prevImage : assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate