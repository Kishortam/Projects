import React from 'react'
import './About.css'
import theme_pattern from '../../assets/theme_pattern.svg'
import profile_pic from '../../assets/profile_pic.png'

const About = () => {
  return (
    <div id='about' className='about'>
        <div className="title">
            <h1>About Me</h1>
            <img src={theme_pattern} alt="" />
        </div>

        <div className="sections">
            <div className="left">
                <img src={profile_pic} alt="" />
            </div>
            <div className="right">
                <div className="about-para">
                    <p>Hello, I'm Kishor Tambe, a passionate and dedicated software developer with a strong foundation in full-stack development. I completed a comprehensive Software Development course from Scaler Academy, where I gained expertise in Data Structures and Algorithms (DSA), MERN Stack, HTML, CSS, JavaScript, MySQL, and System Design.
                    </p>

                    <p>Additionally, I completed a MERN Stack Web Development course from CodeKaro in 2023, which provided me with practical, hands-on experience. Leveraging the skills I acquired, I developed clones of popular applications like X, GitHub, Netflix, and YouTube. I also expanded my knowledge through various YouTube tutorials, constantly learning and improving my skills.
                    I am deeply passionate about technology and continuously strive to learn and adopt new tools and frameworks.
                    </p>

                    <p>
                    I am now seeking an entry-level or fresher software developer role where I can apply my skills, contribute to meaningful projects, and continue growing as a developer. I am excited to bring my dedication and problem-solving abilities to a dynamic team.
                    Feel free to browse through my portfolio to see my work, and don't hesitate to reach out if you'd like to collaborate or just chat about tech!
                    </p>

                    <p>Let's connect and create something amazing together!
                    </p>
                </div>

                <div className="info">
                    <div className="skills">
                        <h2>Skills</h2>
                        <p>Frontend</p>
                        <p>Backend</p>
                        <p>Databases</p>
                        <p>Data Structure & Algorithm</p>
                    </div>
                    <div className="educations">
                        <h2>Education</h2>
                        <div className="education">
                            <p>Scaler Academy</p>
                            <p> <span>Full Stack Software Engineering | Feb 2023 - Present </span> </p>
                        </div>
                        <div className="education">
                            <p>CodeKaro</p>
                            <p><span> MERN Stack Web Development | Apr 2023</span></p>
                        </div>
                        <div className="education">
                            <p>Elphinstone College | University of Mumbai</p>
                            <p><span> Bachelor of Science in Botany | Jul 2017</span></p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        
        {/* No Big Achievements, no need to mention */}
        
        {/* <div className="about-achievements">
            <div className="achievements">
                <h1>2+</h1>
                <p>Years of Experience</p>
            </div>
            <hr />
            <div className="achievements">
                <h1>5+</h1>
                <p>Projects Completed</p>
            </div>
            <hr />
            <div className="achievements">
                <h1>15+</h1>
                <p>Happy Clients</p>
            </div>
        </div> */}
    </div>
  )
}

export default About