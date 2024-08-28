import React from 'react'
import './LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>

      <div className="container">
        <h1>Sign Up</h1>
        <div className="fields">
          <input type="text" placeholder='Your name' />
          <input type="email" placeholder='Your email' />
          <input type="password" placeholder='Password'/>
        </div>
        {/* <button>Continue</button> */}

        <p className='login'>Already have an account? <span>Login here</span></p>

        <div className="agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to terms of use & conditions</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup