import React, { useEffect, useState } from 'react'
import './current.css'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button } from 'antd'
import {
  removeAllApprovedChores,
  removeChore,
  updateApprovedChores
} from '../../features/chores/choresSlice'
import { selectCurrentToken } from '../../features/auth/authSlice'

export default function Current() {
  const dispatch = useDispatch()
  const { approvedChores } = useSelector((state) => state.chores)
  const [clickedCard, setClickedCard] = useState(null)
  const token = useSelector(selectCurrentToken)

  useEffect(() => {
    const storedApprovedChores = JSON.parse(localStorage.getItem('approvedChores')) || []
    dispatch(updateApprovedChores(storedApprovedChores))
  }, [dispatch])

  const handleRemoveAllApprovedChores = () => {
    dispatch(removeAllApprovedChores())
  }

  const handleRemoveSelectedChore = (index) => {
    dispatch(removeChore(index))
  }

  function generatePoints() {
    const points = []
    for (let i = 0; i < 10; i += 1) {
      const randomValue = Math.floor(Math.random() * 11) * 5
      points.push(randomValue)
    }
    return points
  }

  const handleCardClick = (index) => {
    setClickedCard(index === clickedCard ? null : index)
  }

  return (
    <div className='approvedContainer'>
      {token ? (
        <>
          <h4 className='choresText'>My Tasks</h4>
          <div className='approvedChores'>
            {approvedChores.map((chore, index) => (
              <Card
                className={`approvedChoresCard ${clickedCard === index ? 'selected' : ''}`}
                key={`${chore.name}-${chore.name}`}
                onClick={() => handleCardClick(index)}
              >
                <div className='approvedChoresCardContents'>
                  <div className='approvedChoresCardContentsCred'>
                    <Card />
                    {chore.name}
                  </div>
                  <div>+ {generatePoints()[0]} points</div>
                </div>
                {clickedCard === index && (
                  <Button
                    type='primary'
                    className='additionalButton'
                    onClick={() => handleRemoveSelectedChore(index)}
                  >
                    Remove
                  </Button>
                )}
              </Card>
            ))}
          </div>
          <button className='buttonRemove' type='button' onClick={handleRemoveAllApprovedChores}>
            Remove All Approved Chores
          </button>
        </>
      ) : (
        <div>You must login to see</div>
      )}
    </div>
  )
}
