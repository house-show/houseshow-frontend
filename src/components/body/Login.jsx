import React, { useEffect, useState } from 'react'
import { Button, Card, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser } from '../../features/auth/authApi'
import { selectCurrentToken, logOut } from '../../features/auth/authSlice'
import Mascot from '../../assets/templateMascot.png'

export default function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('jo@jo.com')
  const [password, setPassword] = useState('123')
  const [accessTokenString, setAccessTokenString] = useState(null)
  const token = useSelector(selectCurrentToken)

  const getUsernameFromEmail = (email) =>
    // Extracting username from email (assuming email is in the format username@domain.com)
    email.split('@')[0]

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      // If token is stored, you can customize your greeting message here
      const user = getUsernameFromEmail(username)
      message.info(`Hello, ${user}! You are already logged in.`)
    }
  }, []) // Empty dependency array ensures the effect runs only once when component mounts

  const handleSignIn = async () => {
    try {
      const userData = { email: username, password }
      const response = await dispatch(signinUser(userData)).unwrap()

      const token = response?.token?.access_token.toString()

      if (token) {
        setAccessTokenString(`${token.slice(-20)}`)
        message.success('Succesfully Login')
      } else {
        message.error('Access token not found in the response.')
      }
    } catch (error) {
      message.error('Sign-in failed. Please try again.')
    }
  }

  const handleSignOut = () => {
    dispatch(logOut()) // Dispatch the logOut action to reset authentication state
    message.success('Successfully Logged Out')
  }

  return (
    <div className='loginContainer'>
      <img style={{ height: '10rem' }} src={Mascot} alt='House Show Mascot' />
      <Card hoverable style={{ width: 300 }}>
        {token ? (
          // If token exists in local storage
          <>
            <h2>Hello, {getUsernameFromEmail(username)}!</h2>
            <Button type='primary' onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          // If token does not exist in local storage
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
