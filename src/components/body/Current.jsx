import React from 'react'
import './current.css'
import { useDispatch, useSelector } from 'react-redux'
import { Card } from 'antd'
import { removeAllApprovedChores } from '../../features/chores/choresSlice'

export default function Current() {
  const dispatch = useDispatch()
  const { approvedChores } = useSelector((state) => state.chores)

  const handleRemoveAllApprovedChores = () => {
    dispatch(removeAllApprovedChores())
  }

  function generatePoints() {
    const points = []
    for (let i = 0; i < 10; i += 1) {
      const randomValue = Math.floor(Math.random() * 11) * 5
      points.push(randomValue)
    }
    return points
  }

  return (
    <div className='approvedContainer'>
      <h4 className='choresText'>My Tasks</h4>
      <div className='approvedChores'>
        {approvedChores.map((chore) => (
          <Card className='approvedChoresCard' key={`${chore.name}-${chore.name}`}>
            <div className='approvedChoresCardContents'>
              <div className='approvedChoresCardContentsCred'>
                <Card />
                {chore.name}
              </div>
              <div>+ {generatePoints()[0]} points</div>
            </div>
          </Card>
        ))}
      </div>
      <button className='buttonRemove' type='button' onClick={handleRemoveAllApprovedChores}>
        Remove All Approved Chores
      </button>
    </div>
  )
}
