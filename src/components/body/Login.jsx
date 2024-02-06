import React, { useEffect, useState } from 'react'
import { Button, Card, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser } from '../../features/auth/authApi'
import { selectCurrentToken, logOut, setCredentials } from '../../features/auth/authSlice'
import Mascot from '../../assets/templateMascot.png'

export default function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('jo@jo.com')
  const [password, setPassword] = useState('123')
  const [accessTokenString, setAccessTokenString] = useState(null)
  const token = useSelector(selectCurrentToken)

  const getUsernameFromEmail = (email) => email.split('@')[0]

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      dispatch(setCredentials({ user: getUsernameFromEmail(username), accessToken: storedToken }))
    }
  }, [])

  const handleSignIn = async () => {
    try {
      const userData = { email: username, password }
      await dispatch(signinUser(userData))
      message.success('Successfully Logged In')
    } catch (error) {
      message.error('Sign-in failed. Please try again.')
    }
  }

  const handleSignOut = () => {
    dispatch(logOut())
    message.success('Successfully Logged Out')
  }

  return (
    <div className='loginContainer'>
      <img style={{ height: '10rem' }} src={Mascot} alt='House Show Mascot' />
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
            />
            <Input.Password
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '10px' }}
            />
            <Button type='primary' onClick={handleSignIn}>
              Sign In
            </Button>
            <div>
              {accessTokenString && <h3>Tokens last 20 char is:</h3>}
              <p>{accessTokenString}</p>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
