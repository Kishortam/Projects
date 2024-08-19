import React, { useState } from 'react'
import assets from '../../assets/assets'
import './Login.css'
import { signup, login, resetPassword} from '../../config/firebase'


// Login page / default starting page  : can use in any app for login functionality
const Login = () => {

  const [currentState, setCurrentState] = useState("Sign Up");

  // whenever we enter a values in input field, these variables stores it.
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) =>{
    event.preventDefault();
    if(currentState === "Sign Up"){
      signup(userName, email, password);
    }
    else{
      login(email, password);
    }
  }

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="" className='logo' />
      <form onSubmit={onSubmitHandler} className='login-form'>
        <h2>{currentState}</h2>
        {/* if current state is signup then show all input field, including username */}
        {currentState === "Sign Up" ? <input onChange={(e) => setUserName(e.target.value)} value={userName} type="text" placeholder='username' className='form-input' required /> : null}
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='email' className='form-input' required />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='password' className='form-input' required />
        
        {/* button : if state is signup => "create account", else 'login now' */}
        <button type='submit'>{currentState === "Sign Up" ? "Create an account" : "Login now"}</button>

        <div className="login-term">
          <input type="checkbox"/>
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {/* it will toggle the state and form structure depend upon if you are new to, create an account by Sign up.
          or if you already have an account it will toggle to login  */}
          {currentState === "Sign Up" ?
          <p className='login-toggle'> Already have an account <span onClick={() => setCurrentState("Login")}>Clicke here</span></p>
          :<p className='login-toggle'> Create an account <span onClick={() => setCurrentState("Sign Up")}>Clicke here</span></p>
          }
          {currentState === "Login" ?<p className='login-toggle'> Forgot password? <span onClick={() => resetPassword(email)}>Reset here</span></p> : null}
        </div>
      </form>
    </div>
  )
}

export default Login