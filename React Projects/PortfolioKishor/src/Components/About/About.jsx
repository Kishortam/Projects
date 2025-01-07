import React from 'react'
import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_img from '../../assets/profile_img.svg'

const About = () => {
  return (
    <div id='about' className='about'>
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
                    <p>Hello! I'm Kishor Tambe, a passionate software developer with over 2 years of experience in building dynamic and responsive web applications. 
                        I hold Software Developer degree from Scaler Academy.</p>

                    <p>My technical expertise includes proficiency in JavaScript, React, Node.js, and Java.
                        I have a strong foundation in front-end development, coupled with a robust understanding of back-end systems and databases.</p>

                    <p>I am deeply passionate about technology and continuously strive to learn and adopt new tools and frameworks.
                        I believe in the power of technology to solve real-world problems and enhance the user experience. 
                        Feel free to browse through my portfolio to see my work, and don't hesitate to reach out if you'd like to collaborate or just chat about tech!</p>

                    <p>Let's connect and create something amazing together!</p>
                </div>

                <div className="info">
                    <div className="skills">
                        <h2>Skills</h2>
                        <p>Frontend</p>
                        <p>Backend</p>
                        <p>Database</p>
                        <p>Data Structure & Algorithm</p>
                    </div>
                    <div className="educations">
                        <h2>Education</h2>
                        <div className="education">
                            <p>Scaler Academy</p>
                            <p>2024</p>
                        </div>
                        <div className="education">
                            <p>CodeKaro</p>
                            <p>2024</p>
                        </div>
                        <div className="education">
                            <p>Elphinstone College</p>
                            <p>2024</p>
                        </div>
                    </div>
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