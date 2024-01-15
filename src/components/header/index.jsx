import React from 'react'
import './style.css'
import Sign from './Sign'

export default function Header() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <div>logo</div>
      <div>character stuff</div>
      <Sign />
    </div>
  )
}
