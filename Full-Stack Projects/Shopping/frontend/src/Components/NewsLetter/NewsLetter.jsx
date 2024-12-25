import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers on Your Mail</h1>
        <p>subscribe to our newsletter and stay updated</p>

        <div>
            <input type="email" name="" id="" placeholder='Your email id'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter