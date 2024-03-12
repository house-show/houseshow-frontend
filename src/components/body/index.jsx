import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoutes from '../../utils/PrivateRoutes'
import Deck from './Deck'
import Login from './Login'
import Welcome from './Welcome'
import Tasks from './Tasks'
import './style.css'
import Add from './Add'

export default function Body() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Welcome />} path='/' exact />
        <Route element={<Tasks />} path='/tasks' />
        <Route element={<Deck />} path='/deck' />
        <Route element={<Add />} path='/add' />
      </Route>
      <Route element={<Login />} path='/login' />
    </Routes>
  )
}
