import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { fetchTasks } from './taskApi'

const choresSlice = createSlice({
  name: 'chores',
  initialState: {
    tasks: [],
    isLoading: false,
    error: null,
    currentIndex: -1,
    lastDirection: null,
    childRefs: [],
    approvedChores: []
  },
  reducers: {
    updateCurrentIndex: (state, action) => {
      const val = action.payload
      state.currentIndex = val
      state.currentIndexRef.current = val
    },
    swiped: (state, action) => {
      const { direction, nameToDelete, index } = action.payload

      const newState = {
        ...state,
        lastDirection: direction,
        currentIndex: index - 1,
        approvedChores: [...state.approvedChores]
      }

      if (direction === 'right' && index >= 0 && index < state.tasks.length) {
        const approvedChore = state.tasks[index]
        newState.approvedChores.push(approvedChore)

        localStorage.setItem('approvedChores', JSON.stringify(newState.approvedChores))
      }

      return newState
    },

    outOfFrame: (state, action) => {
      const { name, idx } = action.payload
      if (state.currentIndexRef && state.currentIndexRef.current >= idx) {
        if (state.childRefs[idx] && state.childRefs[idx].current) {
          state.childRefs[idx].current.restoreCard()
        }
      }
    },
    swipe: async (state, action) => {
      const dir = action.payload
      const canSwipe = state.currentIndex >= 0
      if (canSwipe && state.currentIndex < state.tasks.length) {
        await state.childRefs[state.currentIndex].current.swipe(dir)
      }
    },
    goBack: (state) => {
      const canGoBack = state.currentIndex < state.tasks.length - 1
      if (!canGoBack) return state

      const newIndex = state.currentIndex + 1
      const newChildRefs = state.childRefs.map((ref, index) =>
        index === newIndex ? ref.current : ref
      )

      return {
        ...state,
        currentIndex: newIndex,
        childRefs: newChildRefs
      }
    },
    updateApprovedChores: (state, action) => {
      const newState = { ...state }

      newState.approvedChores = action.payload

      return newState
    },
    removeChore: (state, action) => {
      const choreIndexToRemove = action.payload

      state.approvedChores = state.approvedChores.filter((_, index) => index !== choreIndexToRemove)

      localStorage.setItem('approvedChores', JSON.stringify(state.approvedChores))
    },
    removeAllApprovedChores: (state) => {
      const newState = { ...state }

      newState.approvedChores = []

      localStorage.removeItem('approvedChores')

      return newState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false
        state.tasks = action.payload
        state.currentIndex = action.payload.length - 1
        state.childRefs = Array(action.payload.length)
          .fill(0)
          .map(() => React.createRef())
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {
  updateCurrentIndex,
  swiped,
  outOfFrame,
  swipe,
  goBack,
  updateApprovedChores,
  removeChore,
  removeAllApprovedChores
} = choresSlice.actions

export default choresSlice.reducer
