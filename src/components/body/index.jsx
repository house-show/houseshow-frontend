import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import Deck from './Deck'
import './style.css'
import Login from './Login'
import Welcome from './Welcome'
import Current from './Current'

export default function Body() {
  const token = useSelector(selectCurrentToken)

  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className='body'>
            <Welcome />
          </div>
        }
      />
      <Route
        path='/deck'
        element={
          token ? (
            <div className='body'>
              <Deck />
            </div>
          ) : (
            <div className='body' style={{ flexDirection: 'column' }}>
              <h2>You must login to see the Deck</h2>
              <p>Please login to access this feature.</p>
              <Link to='/login'>
                <button type='button'>Login</button>
              </Link>
            </div>
          )
        }
      />
      <Route
        path='/current'
        element={
          <div className='body'>
            <Current />
          </div>
        }
      />
      <Route
        path='/login'
        element={
          <div className='body'>
            <Login />
          </div>
        }
      />
    </Routes>
  )
}
