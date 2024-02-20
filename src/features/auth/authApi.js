import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'
import { setCredentials } from './authSlice'

const API_URL = {
  SIGNUP: 'http://localhost:3005/auth/signup',
  SIGNIN: 'http://localhost:3005/auth/signin'
}

const fetchInterceptor = (url, options = {}) => {
  const accessToken = localStorage.getItem('accessToken')
  const headers = { ...options.headers }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return fetch(url, { ...options, headers })
}

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await fetchInterceptor(API_URL.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Sign-up failed. Please try again.')
      }

      const data = await response.json()
      dispatch(setCredentials({ user: email, accessToken: null }))
      message.success('Sign-up Successful! Welcome to House Show!')
      return data
    } catch (error) {
      message.error(error.message || 'Sign-up failed. Please try again.')
      throw error
    }
  }
)

export const signinUser = createAsyncThunk(
  'auth/signin',
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await fetchInterceptor(API_URL.SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Sign-in failed. Please try again.')
      }

      const data = await response.json()
      const token = data?.token?.access_token

      if (token) {
        dispatch(setCredentials({ user: email, accessToken: token }))
        localStorage.setItem('accessToken', token)
        message.success('Welcome Back!')
        return data
      }
      throw new Error('Access token not found in the response.')
    } catch (error) {
      message.error(error.message || 'Sign-in failed. Please try again.')
      throw error
    }
  }
)
