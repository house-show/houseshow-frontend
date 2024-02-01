import React, { useState } from 'react'
import { Button, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { signinUser } from '../../features/auth/authApi'
import { selectCurrentToken } from '../../features/auth/authSlice'

export default function Login() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('jo@jo.com')
  const [password, setPassword] = useState('123')
  const [accessTokenString, setAccessTokenString] = useState(null)
  const token = useSelector(selectCurrentToken)

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

  return (
    <div>
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
    </div>
  )
}
