import React from 'react'
import '../Pages/Css/LoginSign.css'

const LoginSign = () => {
  return (
    <div className='login-sign'>
        <div className='logincontainer'>
        <h1>Sign Up</h1>
        <div className='fields'>
            <input type='text' placeholder='Write Your Name '/>
            <input type='text' placeholder='Write Your Email'/>
            <input type='password' placeholder='Write Your Password'/>
        </div>
        <button className='continue'>Continue</button>
        <p className='login-text'>Already have an account?<span>Login Here</span></p>
        <div className='login-agree'>
            <input type='checkbox' name='' id=''/>
            <p>By Continuing you aree to the terms and privacy policy</p>
        </div>
        </div>
      
    </div>
  )
}

export default LoginSign
