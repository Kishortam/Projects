import React from 'react'
import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '../../assets/profile_img.svg'

const About = () => {
  return (
    <div className='about'>
        <div className="title">
            <h1>About Me</h1>
            <img src={theme_pattern} alt="" />
        </div>

        <div className="sections">
            <div className="left">
                <img src={profile_img} alt="" />
            </div>
            <div className="right">
                <div className="about-para">
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum necessitatibus temporibus quaerat possimus tenetur laboriosam?</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. In odio tempore doloribus perspiciatis, iusto culpa quisquam earum quae, corporis commodi sed incidunt rerum, ea repellendus.</p>
                </div>
                <div className="about-skills">
                    <div className="skills"><p>HTML & CSS</p><hr style={{width:"50%"}} /></div>
                    <div className="skills"><p>Javascript</p><hr style={{width:"70%"}} /></div>
                    <div className="skills"><p>ReactJS</p><hr style={{width:"60%"}} /></div>
                    <div className="skills"><p>DSA</p><hr style={{width:"40%"}} /></div>
                </div>
            </div>  
        </div>
        <div className="about-achievements">
            <div className="achievements">
                <h1>10+</h1>
                <p>Years of Experience</p>
            </div>
            <hr />
            <div className="achievements">
                <h1>90+</h1>
                <p>Projects Completed</p>
            </div>
            <hr />
            <div className="achievements">
                <h1>15+</h1>
                <p>Happy Clients</p>
            </div>
        </div>
    </div>
  )
}

export default About