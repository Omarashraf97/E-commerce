import React from 'react'
import hand_icon from '../Assets/hand_icon.png'
import './Hero.css'
import hero_image from '../Assets/hero_image.png'
import arrow_icon from '../Assets/arrow.png'

const Hero = () => {
  return (
    <div className='hero'>
     <div className='hero-left'>
        <h1>NEW ARRIVALS ONLY</h1>
     
     <div>
     <div className='hand-icon'>
        <p>NEW</p>
        <img src={hand_icon} alt='hand icon' />
     </div>
     <p>collections</p>
     <p>for everyone</p>
     </div>
     <div className='hero-btn'>           
     <div> Latest Collection</div>
     <img src={arrow_icon} alt=''/>
     </div>
     </div> 
     <div className='hero-right'>
          <img src={hero_image} alt='' />
     </div>
    </div>
  )
}

export default Hero
