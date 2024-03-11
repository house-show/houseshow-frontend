import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isExpired: null,
    loading: false
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload
      state.user = user
      state.token = accessToken
      localStorage.setItem('token', accessToken)
    },
    logOut: (state, action) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    setExpirationStatus: (state, action) => {
      const { exp, iat, accessToken } = action.payload
      const now = Date.now()
      const expirationTime = iat * 1000 + (exp - iat) * 1000

      const remainingTime = expirationTime - now
      const remainingSeconds = Math.floor(remainingTime / 1000) - 895 // Subtracting 895 seconds

      if (remainingSeconds < 0) {
        state.isExpired = true
        state.token = null
        localStorage.removeItem('token')
        console.log('belowzero')
      } else {
        state.isExpired = false
        console.log('upper zero')
      }

      console.log('remaining seconds', remainingSeconds)
    }
  }
})

export const { setCredentials, logOut, setExpirationStatus } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token
export const selectExpirationStatus = (state) => state.auth.isExpired
