import { createAsyncThunk } from '@reduxjs/toolkit'

const API_URL = {
  SIGNUP: 'http://localhost:3005/auth/signup',
  SIGNIN: 'http://localhost:3005/auth/signin'
}

export const signupUser = createAsyncThunk('auth/signup', async (userData) => {
  const response = await fetch(API_URL.SIGNUP, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()
  return data
})

export const signinUser = createAsyncThunk('auth/signin', async (userData) => {
  const response = await fetch(API_URL.SIGNIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  const data = await response.json()
  return data
})

// SIGNUP: 'https://house-show-api-58791b32d5a5.herokuapp.com/auth/signup',
// SIGNIN: 'https://house-show-api-58791b32d5a5.herokuapp.com/auth/signin'
