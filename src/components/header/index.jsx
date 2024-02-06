/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentToken, setCredentials } from '../../features/auth/authSlice'
import './style.css'
import logo from '../../assets/templateMascot.png'

export default function Header() {
  const dispatch = useDispatch()

  const token = useSelector(selectCurrentToken)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      dispatch(setCredentials({ user: null, accessToken: storedToken }))
    }
  }, [dispatch])

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
