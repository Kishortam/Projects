import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/footer_logo.svg'
import user_icon from '../../assets/user_icon.svg'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="top">
            <div className="left">
                <img src={footer_logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, aliquam nostrum ipsa tenetur neque maiores?</p>
            </div>
            <div className="right">
                <div className="email-input">
                    <img src={user_icon} alt="" />
                    <input type="email" name="" id="" placeholder='Enter your email'/>
                </div>
                <div className="subscribe">Subscribe</div>
            </div>
        </div>

        <hr />

        <div className="bottom">
            <div className="bottom-left">@ 2023. All rights reserved</div>
            <div className="bottom-right">
                <p>Term of services</p>
                <p>privacy policy</p>
                <p>connect with me</p>
            </div>
        </div>
    </div>
  )
}

export default Footer