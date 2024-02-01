import { configureStore } from '@reduxjs/toolkit'
import choresReducer from './features/chores/choresSlice'
import authReducer from './features/auth/authSlice'

const store = configureStore({
  reducer: {
    chores: choresReducer,
    auth: authReducer
  },
  devTools: true // replace it to false before production
})

export default store
