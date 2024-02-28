import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import Tasks from './Tasks'
import { fetchTasks } from '../../features/chores/taskApi'
import wlc1 from '../../assets/wlc1.png'
import wlc2 from '../../assets/wlc2.png'
import wlc3 from '../../assets/wlc3.png'
import wlc4 from '../../assets/wlc4.png'

export default function Welcome() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.chores.tasks)
  const [randomImage, setRandomImage] = useState(wlc1)

  useEffect(() => {
    dispatch(fetchTasks())

    const randomizeImage = () => {
      const images = [wlc1, wlc2, wlc3, wlc4]
      const remainingImages = images.filter((image) => image !== randomImage)
      const randomIndex = Math.floor(Math.random() * remainingImages.length)
      setRandomImage(remainingImages[randomIndex])
    }

    randomizeImage()
  }, [dispatch])

  return (
    <div className='body'>
      <div className='wlcCard' style={{ backgroundImage: `url(${randomImage})` }}>
        <h1 className='welcomeMsg'>Welcome houseShow!</h1>
        <h3 className='welcomeMsgSec'>Welcome User lets do stuff bla bla</h3>
      </div>
      <div className='wlcCardRow'>
        <div className='wlcCard' to='/deck'>
          <Button type='primary'>
            <Link to='/deck'>Avaible Tasks</Link>
          </Button>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>

        <div className='wlcCard'>
          <h4>LEVEL BAR</h4>
          <h6>in progress-not private</h6>
        </div>
      </div>
      <div to='/tasks' className='wlcCardTasks'>
        <Button type='primary'>
          <Link to='/tasks'>Today&apos;s Tasks</Link>
        </Button>
        <Tasks />
      </div>
    </div>
  )
}
