import React, { useEffect } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import './style.css'
import logo from '../../assets/templateMascot.png'

export default function Header() {
  const token = useSelector(selectCurrentToken)

  return (
    <div className='header'>
      <div className='headerContents'>
        <Link to='/' className='logo'>
          <img className='logoImg' src={logo} alt='House Show Logo' /> houseShow
        </Link>
        {token ? (
          <Button type='primary'>
            <Link to='/login'>Sign Out</Link>
          </Button>
        ) : (
          <Button type='primary'>
            <Link to='/login'>Sign In</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
