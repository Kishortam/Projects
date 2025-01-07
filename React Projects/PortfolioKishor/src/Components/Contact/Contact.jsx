import React from 'react'
import './Contact.css'
import theme_pattern from '../../assets/theme_pattern.svg'
// import mail_icon from '../../assets/mail_icon.svg'
// import location_icon from '../../assets/location_icon.svg'
// import call_icon from '../../assets/call_icon.svg'


const Contact = () => {

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
                {/* <h1>Let's Talk</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, non? Corrupti nesciunt ut eaque iure?</p>

                <div className="contact-details">
                    <div className="detail">
                        <img src={mail_icon} alt="" /> <p>kishortam@gmail.com</p>
                    </div>
                    <div className="detail">
                        <img src={call_icon} alt="" /> <p>+91 9737732898979</p>
                    </div>
                    <div className="detail">
                        <img src={location_icon} alt="" /> <p>Cuffe Parade, Mumbai</p>
                    </div> */}

            <div className="left">
                    <h1 className="sub-title">Contact Me</h1>
                    <p><i className="fas fa-paper-plane"></i>kishortam@gmail.com</p>
                    <p><i className="fas fa-phone"></i>+91 9892623219</p>
                    <div className="social-icons">
                        <a href=""><i className="fab fa-linkedin"></i></a>
                        <a href=""><i className="fab fa-github"></i></a>
                        <a href=""><i className="fab fa-instagram"></i></a>
                        <a href=""><i className="fab fa-facebook"></i></a>
                        <a href=""><i className="fab fa-slack"></i></a>
                    </div>
                    <a href="./images/my-cv.pdf" download className="btn btn2">Download CV</a>
            </div>

            <div onSubmit={onSubmit} className="right">
                <label htmlFor="">Your Name</label>
                <input type="text" name="your_name" id="" placeholder='Enter your name' />
                
                <label htmlFor="">Your Email</label>
                <input type="email" name="your_email" id="" placeholder='Enter your email'/>

                <label htmlFor="">Write your message here</label>
                <textarea name="message" id="" rows="8" placeholder='Enter your message'></textarea>

                <button type='submit' className="submit">Submit Now</button>
            </div>
        </div>
    </div>
  )
}

export default Contact