import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import homeGif from '../../assets/home.gif'
import home from '../../assets/homeFrame.gif'

export default function Footer() {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
    }, 2400)
  }

  return (
    <div className='footer'>
      <Link className='footerHomeButton' to='/' type='button' onClick={handleClick}>
        <img className='homeLogoImg' src={isAnimating ? homeGif : home} alt='menu' />
      </Link>
    </div>
  )
}
