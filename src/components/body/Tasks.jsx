import React, { useState } from 'react'
import './tasks.css'
import { useDispatch, useSelector } from 'react-redux'
import TaskCard from './TaskCard'
import { selectCurrentToken } from '../../features/auth/authSlice'

export default function Tasks() {
  const token = useSelector(selectCurrentToken)

  return (
    <div className='body'>
      <div className='approvedContainer'>
        <TaskCard />
      </div>
    </div>
  )
}
