import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className='loginsignup'>
        <div className="container">
        <h1>{state}</h1>
        <div className="fields">
          {/* if state is SignUp, then only user name field will be shown */}
          {state === "Sign Up" ? <input type="text" placeholder='Your name' name='username' value={formData.username} onChange={changeHandler}/> : <></>}
          <input type="email" placeholder='Your email' name='email' value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder='Password' name='password' value={formData.password} onChange={changeHandler}/>
        </div>

        {/* if state is login, execute login function, else signup function */}
        <button onClick={()=> {state === "Login"? login() : signup()}}>Continue</button>

        {state === "Sign Up"
        ? <p className='login'>Already have an account? <span onClick={()=> setState("Login")}>Login here</span></p>
        : <p className='login'>Create an account? <span onClick={()=> setState("Sign Up")}>Click here</span></p>
        }

        
        <div className="agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to terms of use & conditions</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup