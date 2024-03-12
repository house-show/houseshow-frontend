import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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
        <h1 className='welcomeTitle'>Welcome Cup Score!</h1>
        <h3 className='welcomeMsg'>Welcome User lets do stuff bla bla</h3>
      </div>

      <div className='wlcCard'>
        <Link to='/deck'>
          <div className='welcomeTitle'>Cafes to visit</div>
          <ul>
            {tasks.map((task) => (
              <div className='welcomeMsg' key={task.id}>
                {task.name}
              </div>
            ))}
          </ul>
        </Link>
      </div>

      <div className='wlcCard'>
        <Link to='/add'>
          <div className='welcomeTitle'>Add or Rate a Cafe</div>
          <h6>
            products quality ? || Service || Price || is it Loud || Music Type || Childs ? || study
            Areas ?
          </h6>
        </Link>
      </div>

      <div className='wlcCard'>
        <Link to='/tasks'>
          <div className='welcomeTitle'>my Cafes</div>
          <Tasks />
        </Link>
      </div>
    </div>
  )
}
