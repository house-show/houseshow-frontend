/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Deck from './Deck'
import './style.css'
import Login from './Login'

export default function Body() {
  return (
    <Routes>
      <Route
        path='/login'
        element={
          <div className='body'>
            <Login />
          </div>
        }
      />
      <Route
        path='/'
        element={
          <div className='body'>
            <Deck />
          </div>
        }
      />
    </Routes>
  )
}
