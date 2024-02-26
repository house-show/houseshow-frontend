import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Deck from './Deck'
import './style.css'
import Login from './Login'
import Welcome from './Welcome'
import Tasks from './Tasks'
import PrivateRoutes from '../../utils/PrivateRoutes'

export default function Body() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Welcome />} path='/' exact />
        <Route element={<Tasks />} path='/tasks' />
        <Route element={<Deck />} path='/deck' />
      </Route>
      <Route element={<Login />} path='/login' />
    </Routes>
  )
}
