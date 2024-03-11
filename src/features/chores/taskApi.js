import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchInterceptor } from '../interceptor/fetchInterceptor'
import { TASK_ERROR } from '../../constants'

const API_URL = {
  TASKS: 'http://localhost:3005/tasks'
}

export const fetchTasks = createAsyncThunk(
  'chores/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await fetchInterceptor(API_URL.TASKS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || TASK_ERROR.failed)
      }

      const data = await response.json()
      console.log(data)

      return data
    } catch (error) {
      return rejectWithValue(error.message || TASK_ERROR.default)
    }
  }
)
