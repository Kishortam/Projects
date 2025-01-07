import React from 'react'
import './Hero.css'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import profile_pic from '../../assets/profile_pic.png'

const Hero = () => {
  return (
    <div id='home' className='hero'>
        <img src={profile_pic} alt="" />
        <h1><span>I'm Kishor Tambe, <br /></span> Full Stack Developer</h1>
        <p>Passionate software engineering enthusiast at Scaler Academy</p>
        <div className="hero-action">
            <div className="hero-connect"> <AnchorLink className='anchor-link' offset={50} href='#contact'>Connect with Me</AnchorLink></div>
            <div className="hero-resume"><a href="./CV/Kishor_Tambe_CV1.pdf" target='blank'>My Resume</a></div>
        </div>
    </div>
  )
}

export default Hero