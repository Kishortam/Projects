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
            {/* visitor can view my resume, uploaded on google drive & put the link here */}
            <div className="hero-resume"><a href="https://drive.google.com/file/d/16DeBrjuGyTrJ7HQ65ug7nMqrUTfdhHX2/view?usp=sharing" target='blank'>My Resume</a></div>
            

        </div>
    </div>
  )
}

export default Hero