import React, { useState } from 'react'
import './Login.css'
// import all assets (made a file of assets, no need to import individually)
import assets from '../../assets/assets'

const Login = () => {
    const [currentState, setCurrentState] = useState('Sign Up');
  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className='logo'/>

        <form className='login-form'>
            <h2>{currentState}</h2>
            {/* if current state is SignUp then show username input field */}
            {currentState === "Sign Up" ? <input type="text" placeholder='Username' className='form-input' required/> : null} 
            <input type="email" placeholder='Email' className='form-input' />
            <input type="password" placeholder='Password' className='form-input' />
            <button type='submit'>{currentState === "Sign Up" ? "Create an Account" :"Login Now"}</button>

            <div className="login-term">
                <input type="checkbox" />
                <p>Agree to the terms of use & provacy policy</p>
            </div>
            <div className="login-forgot">
                {/* toggle between login & sign up */}
                {currentState === "Sign Up" ? <p className='login-toggle'>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
                : <p className='login-toggle'>Create an account? <span onClick={()=>setCurrentState("Sign Up")}>click here</span></p>}
                
                
            </div>
        </form>
    </div>
  )
}

export default Login