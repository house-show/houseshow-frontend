/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Deck from './Deck'
import './style.css'
import Login from './Login'
import Welcome from './Welcome'
import Current from './Current'

export default function Body() {
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
          <div className='body'>
            <Deck />
          </div>
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
