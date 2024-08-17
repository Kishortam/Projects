import React, { useState } from 'react'
import './Login.css'
// import all assets (made a file of assets, no need to import individually)
import assets from '../../assets/assets'
import { signup , login} from '../../config/firebase'

const Login = () => {
    const [currentState, setCurrentState] = useState('Sign Up');

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        if(currentState === "Sign Up"){
            signup(username, email, password)
        }
        else{
            login(email, password)
        }
    }

  return (
    <div className='login'>
        <img src={assets.logo_big} alt="" className='logo'/>

        <form onSubmit={onSubmitHandler} className='login-form'>
            <h2>{currentState}</h2>
            {/* if current state is SignUp then show username input field */}
            {currentState === "Sign Up" ? <input onChange={(e)=> setUsername(e.target.value)} value={username} type="text" placeholder='Username' className='form-input' required/> : null} 
            <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='form-input' />
            <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='form-input' />
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