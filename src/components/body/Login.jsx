import React, { useEffect, useState } from 'react'
import { Button, Card, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser } from '../../features/auth/authApi'
import { selectCurrentToken, logOut, setCredentials } from '../../features/auth/authSlice'
import Mascot from '../../assets/templateMascot.png'
import './login.css'

export default function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('jo@jo.com')
  const [password, setPassword] = useState('123')
  const [isInputClicked, setInputClicked] = useState(false)
  const [isPasswordClicked, setPasswordClicked] = useState(false)
  const token = useSelector(selectCurrentToken)

  const getUsernameFromEmail = (email) => email.split('@')[0]

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      dispatch(setCredentials({ user: getUsernameFromEmail(username), accessToken: storedToken }))
    }
  }, [])

  const handleSignIn = () => {
    const userData = { email: username, password }
    dispatch(signinUser(userData))
  }

  const handleSignOut = () => {
    dispatch(logOut())
    message.success('Successfully Logged Out')
  }

  const getEyeClassName = () => {
    if (isInputClicked) {
      return 'input-clicked'
    }
    if (isPasswordClicked) {
      return 'password-clicked'
    }
    return ''
  }

  return (
    <div className='loginContainer'>
      <div className='mascotContainer'>
        <img className='loginImg' src={Mascot} alt='House Show Mascot' />
        <div className={`eye left-eye ${getEyeClassName()}`} />
        <div className={`eye right-eye ${getEyeClassName()}`} />
      </div>

      <Card hoverable style={{ width: 300 }}>
        {token ? (
          <>
            <h2>Hello, {getUsernameFromEmail(username)}!</h2>
            <Button type='primary' onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Input
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ marginBottom: '10px' }}
              onClick={() => setInputClicked(true)}
              onBlur={() => setInputClicked(false)}
            />
            <Input.Password
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '10px' }}
              onClick={() => setPasswordClicked(true)}
              onBlur={() => setPasswordClicked(false)}
            />
            <Button type='primary' onClick={handleSignIn}>
              Sign In
            </Button>
          </>
        )}
      </Card>
    </div>
  )
}
