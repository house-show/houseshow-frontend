/* eslint-disable import/no-extraneous-dependencies */
import { useLocation, Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'

function RequiredAuth() {
  const token = useSelector(selectCurrentToken)
  const location = useLocation()

  return token ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
}

export default RequiredAuth
