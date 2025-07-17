import React from 'react'
import './NewsLetter.css';

const NewsLetter = () => {
  return (
    <div>
      <div className='newsletter'>
        <h1>Get Exclusive Offers On Your E-mail</h1>
        <p> Subscribe To Our Newsletter And Stay Updated</p>
     
      <div>
        <input className='email' type='email' placeholder='Please Enter Your Email'/>
        <button className='btn'>Subscribe</button>
     </div>
    </div>
    </div>
  )
}

export default NewsLetter
