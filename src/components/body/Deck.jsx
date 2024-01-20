import React, { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TinderCard from 'react-tinder-card'
import Card from './Card'
import {
  swipe,
  goBack,
  swiped,
  outOfFrame,
  updateApprovedChores,
  removeAllApprovedChores
} from '../../features/chores/choresSlice'

export default function Deck() {
  const dispatch = useDispatch()
  const { db, currentIndex, lastDirection, approvedChores } = useSelector((state) => state.chores)

  const canSwipe = currentIndex >= 0 && currentIndex < db.length
  const canGoBack = currentIndex < db.length - 1

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    [db.length]
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

  const handleRemoveAllApprovedChores = () => {
    dispatch(removeAllApprovedChores())
  }

  useEffect(() => {
    const storedApprovedChores = JSON.parse(localStorage.getItem('approvedChores')) || []
    dispatch(updateApprovedChores(storedApprovedChores))
  }, [dispatch])

  return (
    <div className='deck'>
      <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) =>
              dispatch(swiped({ direction: dir, nameToDelete: character.name, index }))
            }
            onCardLeftScreen={() => dispatch(outOfFrame(character.name, index))}
          >
            <div style={{ backgroundImage: `url(${character.url})` }} className='card'>
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button
          type='button'
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => handleSwipe('left')}
        >
          Swipe left!
        </button>
        <button
          type='button'
          style={{ backgroundColor: !canGoBack && '#c3c4d3' }}
          onClick={handleGoBack}
        >
          Undo swipe!
        </button>
        <button
          type='button'
          style={{ backgroundColor: !canSwipe && '#c3c4d3' }}
          onClick={() => handleSwipe('right')}
        >
          Swipe right!
        </button>
      </div>
      {lastDirection ? (
        <div>
          <div className='approvedContainer'>
            <h2 className='infoText'>Your Approved Chores:</h2>
            <ul className='approvedChores'>
              {approvedChores.map((chore) => (
                <li key={`${chore.name}-${chore.name}`}>{chore.name}</li>
              ))}
            </ul>
            <button
              style={{
                height: '2rem',
                width: '8rem',
                fontSize: '.75rem'
              }}
              type='button'
              onClick={handleRemoveAllApprovedChores}
            >
              Remove All Approved Chores
            </button>
          </div>
        </div>
      ) : (
        <h2 className='infoText'>Swipe a card to get your Chores!</h2>
      )}
    </div>
  )
}
