import React, { useEffect, useState } from 'react'
import './tasks.css'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button } from 'antd'
import {
  removeAllApprovedChores,
  removeChore,
  updateApprovedChores
} from '../../features/chores/choresSlice'
import { selectCurrentToken } from '../../features/auth/authSlice'

export default function TaskCard() {
  const dispatch = useDispatch()
  const { approvedChores } = useSelector((state) => state.chores)
  const [clickedCard, setClickedCard] = useState(null)
  const token = useSelector(selectCurrentToken)
  const storedApprovedChores = JSON.parse(localStorage.getItem('approvedChores'))

  useEffect(() => {
    const storedApprovedChores = JSON.parse(localStorage.getItem('approvedChores')) || []
    dispatch(updateApprovedChores(storedApprovedChores))
  }, [dispatch])

  const handleRemoveSelectedChore = (index) => {
    dispatch(removeChore(index))
  }

  const handleCardClick = (index) => {
    setClickedCard(index === clickedCard ? null : index)
  }

  const handleRemoveAllApprovedChores = () => {
    dispatch(removeAllApprovedChores())
  }

  return (
    <div className='approvedChores'>
      <h4 className='choresText'>My Tasks</h4>
      {approvedChores.map((chore, index) => (
        <Card
          className={`approvedChoresCard ${clickedCard === index ? 'selected' : ''}`}
          key={`${chore.name}-${chore.index}`}
          onClick={() => handleCardClick(index)}
        >
          <div className='approvedChoresCardContents'>
            <div className='approvedChoresCardContentsCred'>
              <Card />
              {chore.name}
            </div>
            <div>+ {chore.points} points</div>
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
      {storedApprovedChores ? (
        <button className='buttonRemove' type='button' onClick={handleRemoveAllApprovedChores}>
          Remove All Approved Chores
        </button>
      ) : null}
    </div>
  )
}
