import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialChores = [
  {
    name: 'Dishes',
    url: 'https://images.unsplash.com/photo-1581622558663-b2e33377dfb2?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Ironing',
    url: 'https://images.unsplash.com/photo-1604762434310-c6def6a3d844?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Clean Up',
    url: 'https://images.unsplash.com/photo-1550963295-019d8a8a61c5?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Laundry',
    url: 'https://plus.unsplash.com/premium_photo-1664372899525-d99a419fd21a?q=80&w=1594&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    name: 'Dinner',
    url: 'https://images.unsplash.com/photo-1549716679-efce92a6bd12?q=80&w=1602&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]
const initialState = {
  db: initialChores,
  currentIndex: initialChores.length - 1,
  lastDirection: null,
  childRefs: Array(initialChores.length)
    .fill(0)
    .map(() => React.createRef()),
  approvedChores: []
}
const choresSlice = createSlice({
  name: 'chores',
  initialState,
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

      if (direction === 'right' && index >= 0 && index < state.db.length) {
        const approvedChore = state.db[index]
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
      if (canSwipe && state.currentIndex < state.db.length) {
        await state.childRefs[state.currentIndex].current.swipe(dir)
      }
    },
    goBack: (state) => {
      const canGoBack = state.currentIndex < state.db.length - 1
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
    removeAllApprovedChores: (state) => {
      const newState = { ...state }

      newState.approvedChores = []

      localStorage.removeItem('approvedChores')

      return newState
    }
  }
})

export const {
  updateCurrentIndex,
  swiped,
  outOfFrame,
  swipe,
  goBack,
  updateApprovedChores,
  removeAllApprovedChores
} = choresSlice.actions

export default choresSlice.reducer
