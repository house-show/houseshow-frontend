import { configureStore } from '@reduxjs/toolkit'
import choresReducer from './features/chores/choresSlice'

const store = configureStore({
  reducer: {
    chores: choresReducer
  }
})

export default store
