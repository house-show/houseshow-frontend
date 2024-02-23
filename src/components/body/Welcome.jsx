import React, { useEffect } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import Tasks from './Tasks'
import { selectCurrentToken } from '../../features/auth/authSlice'
import { fetchTasks } from '../../features/chores/taskApi'

export default function Welcome() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.chores.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <div className='body'>
      <div className='welcome'>
        <h1>Welcome houseShow!</h1>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
        <div>
          <h4>LEVEL BAR</h4>
          <h6>in progress-not private</h6>
        </div>
        <div>
          <h4>TODAYS CHORES</h4>
          <h6>in progress-not private</h6>
        </div>
        <Tasks />
      </div>
    </div>
  )
}
