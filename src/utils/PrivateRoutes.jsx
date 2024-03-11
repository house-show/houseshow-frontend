import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import { selectCurrentToken } from '../features/auth/authSlice'

function PrivateRoutes() {
  const token = useSelector(selectCurrentToken) || localStorage.getItem('token')

  return token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
