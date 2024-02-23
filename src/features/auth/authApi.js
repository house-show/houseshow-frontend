import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'
import { setCredentials } from './authSlice'
import { API_ERROR, API_SUCCESS } from '../../constants'

const API_URL = {
  SIGNUP: 'http://localhost:3005/auth/signup',
  SIGNIN: 'http://localhost:3005/auth/signin'
}

export const signupUser = createAsyncThunk(
  'auth/signup',
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await fetch(API_URL.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || API_ERROR.SIGNUP)
      }

      const data = await response.json()
      dispatch(setCredentials({ user: email, accessToken: null }))
      message.success(API_SUCCESS.SIGNUP)
      return data
    } catch (error) {
      message.error(error.message || API_ERROR.DEFAULT)
      throw error
    }
  }
)

export const signinUser = createAsyncThunk(
  'auth/signin',
  async ({ email, password }, { dispatch }) => {
    try {
      const response = await fetch(API_URL.SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || API_ERROR.SIGNIN)
      }

      const data = await response.json()
      const token = data?.token?.access_token

      if (token) {
        dispatch(setCredentials({ user: email, accessToken: token }))
        localStorage.setItem('accessToken', token)
        message.success(API_SUCCESS.SIGNIN)
        return data
      }
      throw new Error('Access token not found in the response.')
    } catch (error) {
      message.error(error.message || API_ERROR.DEFAULT)
      throw error
    }
  }
)
