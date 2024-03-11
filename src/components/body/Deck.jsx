import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TinderCard from 'react-tinder-card'
import './style.css'
import { Link } from 'react-router-dom'
import { goBack, swiped, outOfFrame, updateApprovedChores } from '../../features/chores/choresSlice'
import { fetchTasks } from '../../features/chores/taskApi'

export default function Deck() {
  const dispatch = useDispatch()
  const { tasks, currentIndex, lastDirection } = useSelector((state) => state.chores)
  const storedApprovedChores = JSON.parse(localStorage.getItem('approvedChores'))

  const canSwipe = currentIndex >= 0 && currentIndex < tasks.length
  const canGoBack = currentIndex < tasks.length - 1
  const disabledButtonColor = '#c3c4d3'
  const btColor = '#a9a9a9'

  const childRefs = useMemo(
    () =>
      Array(tasks.length)
        .fill(0)
        .map(() => React.createRef()),
    [tasks.length]
  )

  const handleSwipe = async (dir) => {
    if (canSwipe) {
      await childRefs[currentIndex].current.swipe(dir)
    }
  }

  const handleGoBack = async () => {
    if (canGoBack) {
      const newIndex = currentIndex + 1
      await childRefs[newIndex].current.restoreCard()
      dispatch(goBack())
    }
  }

  useEffect(() => {
    const storedApprovedChores = JSON.parse(localStorage.getItem('approvedChores')) || []
    dispatch(updateApprovedChores(storedApprovedChores))
    dispatch(fetchTasks())
  }, [dispatch])

  return (
    <div className='swipeBody'>
      <div className='deck'>
        <div className='cardContainer'>
          {tasks.map((task, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={task.id}
              preventSwipe={['up', 'down']}
              onSwipe={(dir) => dispatch(swiped({ direction: dir, nameToDelete: task.id, index }))}
              onCardLeftScreen={() => dispatch(outOfFrame(task.id, index))}
            >
              <div style={{ backgroundImage: `url(${task.imageUrl})` }} className='card'>
                <h3 style={{ color: 'red' }}>{task.name}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
        <div className='buttons'>
          <button
            type='button'
            style={{ backgroundColor: !canSwipe && disabledButtonColor }}
            onClick={() => handleSwipe('left')}
          >
            Swipe left!
          </button>
          <button
            type='button'
            style={{ backgroundColor: !canGoBack && disabledButtonColor }}
            onClick={handleGoBack}
          >
            Undo swipe!
          </button>
          <button
            type='button'
            style={{ backgroundColor: !canSwipe && disabledButtonColor }}
            onClick={() => handleSwipe('right')}
          >
            Swipe right!
          </button>
        </div>
        {lastDirection ? <div /> : <h2 className='infoText'>Swipe a card to get your Chores!</h2>}
        <div className='buttons'>
          {storedApprovedChores && (
            <button
              type='button'
              className='currentButton'
              style={{ backgroundColor: !canSwipe && disabledButtonColor }}
            >
              <Link to='/tasks'>see your current chores</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
