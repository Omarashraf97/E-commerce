import React , { useState }from 'react'
import '../Pages/Css/LoginSign.css'


const LoginSign = () => {
const [state, setState] = useState('login')
const [formData, setFormData] = useState({
  username:'',
  password:'',
  email:''
})
const changeHandler = (e) =>{
  setFormData({...formData , [e.target.name]:e.target.value})
  
}
const login = async ()=>{
  console.log('login function excuted ',formData);
  let responseData 
  await fetch ('http://localhost:4000/login',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData),
  }).then((res)=>res.json()).then((data)=>responseData=data)
if (responseData.success){
  localStorage.setItem('auth-token',responseData.token)
  window.location.replace('/')
}else{
  alert(responseData.errors)
}
}
const signup = async ()=>{
  console.log('sign up function excuted ',formData);
  let responseData 
  await fetch ('http://localhost:4000/signup',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData),
  }).then((res)=>res.json()).then((data)=>responseData=data)
if (responseData.success){
  localStorage.setItem('auth-token',responseData.token)
  window.location.replace('/')
}else{
  alert(responseData.errors)
}
}

  return (
    <div className='login-sign'>
        <div className='logincontainer'>
        <h1>{state}</h1>
        <div className='fields'>
            {state==='sign up'?<input type='text' name='username' value={formData.username} onChange={changeHandler} placeholder='Write Your Name '/>:null}
            <input type='email' name='email' value={formData.email} onChange={changeHandler} placeholder='Write Your Email'/>
            <input type='password' name='password' value={formData.password} onChange={changeHandler} placeholder='Write Your Password'/>
        </div>
        <button onClick={()=>{state==='login'?login():signup()}}  className='continue'>Continue</button>
        {state==='sign up'
        ?<p className='login-text'>Already have an account?<span onClick={() => setState('login')}>Login Here</span></p>
        :
        <p className='login-text'>create an account<span onClick={() => setState('sign up')}>sign up Here</span></p>}
        {state==='sign up'?<div className='login-agree'>
            <input type='checkbox' name='' id=''/>
            <p>By Continuing you aree to the terms and privacy policy</p>
        </div>:null}
        </div>
      
    </div>
  )
}

export default LoginSign
