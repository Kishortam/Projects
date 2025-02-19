import React from 'react'
import './Contact.css'
import theme_pattern from '../../assets/theme_pattern.svg'

const Contact = () => {

  // To get email from user or person who wants to contact or reach us,
  // we will use => web3 forms 

    // open web3forms.com => get access key by email => copy code for react
    // paste it into component
   
    const onSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
  
      formData.append("access_key", "3d91682c-943e-4247-a3e4-a9a971d825d7");
  
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
  
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());
  
      if (res.success) {
        // console.log("Success", res);
        alert(res.message);
      }
    };

  return (
    <div id='contact' className='contact'>
        <div className="title">
            <h1>Get in Touch</h1>
            <img src={theme_pattern} alt="" />
        </div>

        <div className="section">
            <div className="left">
                    <h1 className="sub-title">Contact Me</h1>
                    <p><i className="fas fa-paper-plane"></i><a href="mailto:kishortam@gmail.com">kishortam@gmail.com</a></p>
                    <p><i className="fas fa-phone"></i><a href="tel:+919892623219">+91 9892623219</a></p>
                    <div className="social-icons">
                        <a href="http://www.linkedin.com/in/kishor-tambe" target="_blank"><i class="fab fa-linkedin"></i></a>
                        <a href="http://www.github.com/Kishortam" target="_blank"><i class="fab fa-github"></i></a>
                        <a href="https://www.instagram.com/kishor.tambe.96?igsh=MWNhZ3FjOXVobnJhYQ==" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="https://scaler-co.slack.com/team/U04NMJU3XB5" target="blank"><i class="fab fa-slack"></i></a>  
                        <a href="https://wa.me/9892623219" target="blank"><i class="fab fa-whatsapp"></i></a>                      
                    </div>
                    <a href="./CV/My Resume.pdf" download className="btn btn2">Download CV</a>
            </div>

            <form onSubmit={onSubmit} className="right">
                <label htmlFor="">Your Name</label>
                <input type="text" name="your_name" id="" placeholder='Enter your name' />
                
                <label htmlFor="">Your Email</label>
                <input type="email" name="your_email" id="" placeholder='Enter your email'/>

                <label htmlFor="">Write your message here</label>
                <textarea name="message" id="" rows="8" placeholder='Enter your message'></textarea>

                <button type='submit' className="submit">Submit Now</button>
            </form>
        </div>
    </div>
  )
}

export default Contact