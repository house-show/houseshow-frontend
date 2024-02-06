import React from 'react'
import './style.css'
import Current from './Current'

export default function Welcome() {
  return (
    <div className='welcome'>
      <div>Welcome User !</div>
      <div>LEVEL BAR</div>
      <div>TODAYS CHORES</div>
      <Current />
    </div>
  )
}
