import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
import Current from './Current'
import { selectCurrentToken } from '../../features/auth/authSlice'

export default function Welcome() {
  const token = useSelector(selectCurrentToken)
  return (
    <div className='welcome'>
      <h1>Welcome houseShow!</h1>
      {token ? (
        <>
          <div>LEVEL BAR</div>
          <div>TODAYS CHORES</div>
          <Current />
        </>
      ) : (
        <h2>You must login to see Stuff</h2>
      )}
    </div>
  )
}
