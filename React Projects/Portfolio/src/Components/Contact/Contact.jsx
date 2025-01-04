import React from 'react'
import './Contact.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import mail_icon from '../../assets/mail_icon.svg'
import location_icon from '../../assets/location_icon.svg'
import call_icon from '../../assets/call_icon.svg'


const Contact = () => {
  return (
    <div className='contact'>
        <div className="title">
            <h1>Get in Touch</h1>
            <img src={theme_pattern} alt="" />
        </div>

        <div className="section">
            <div className="left">
                <h1>Let's Talk</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, non? Corrupti nesciunt ut eaque iure?</p>

                <div className="conatct-details">
                    <div className="detail">
                        <img src={mail_icon} alt="" /> <p>kishortam@gmail.com</p>
                    </div>
                    <div className="detail">
                        <img src={call_icon} alt="" /> <p>+91 9737732898979</p>
                    </div>
                    <div className="detail">
                        <img src={location_icon} alt="" /> <p>Cuffe Parade, Mumbai</p>
                    </div>
                </div>
            </div>

            <div className="right">
                <label htmlFor="">Your Name</label>
                <input type="text" name="name" id="" placeholder='Enter your name' />
                
                <label htmlFor="">Your Email</label>
                <input type="email" name="email" id="" placeholder='Enter your email'/>

                <label htmlFor="">Write your message here</label>
                <textarea name="message" id="" rows="8" placeholder='Enter your message'></textarea>

                <button className="submit">Submit Now</button>
            </div>
        </div>
    </div>
  )
}

export default Contact