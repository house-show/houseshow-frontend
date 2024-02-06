/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import './style.css'
import logo from '../../assets/templateMascot.png'

export default function Header() {
  return (
    <div className='header'>
      <div className='headerContents'>
        <Link to='/' className='logo'>
          <img className='logoImg' src={logo} alt='House Show Logo' /> houseShow
        </Link>
        <Button type='primary'>
          <Link to='/login'>Sign In</Link> {/* Wrap Button inside Link */}
        </Button>
      </div>
    </div>
  )
}
