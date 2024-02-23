import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import Deck from './Deck'
import './style.css'
import Login from './Login'
import Welcome from './Welcome'
import Tasks from './Tasks'
import PrivateRoutes from '../../utils/PrivateRoutes'

export default function Body() {
  const token = useSelector(selectCurrentToken)

  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Welcome />} path='/' exact />
        <Route element={<Deck />} path='/deck' />
        <Route element={<Tasks />} path='/tasks' />
      </Route>
      <Route element={<Login />} path='/login' />
    </Routes>
  )
}
