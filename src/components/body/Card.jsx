import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import './card.css'

export default function Card({ character, index, swipe, outOfFrame, childRefs }) {
  return (
    <TinderCard
      ref={childRefs[index]}
      className='swipe'
      key={character.name}
      preventSwipe={['up', 'down']}
      onSwipe={(dir) => swipe(dir, character.name, index)}
      onCardLeftScreen={() => outOfFrame(character.name, index)}
    >
      <div style={{ backgroundImage: `url(${character.url})` }} className='card'>
        <h3>{character.name}</h3>
      </div>
    </TinderCard>
  )
}

//    "@react-spring/web": "^9.5.5", upper then 9.5.5 is creating empty blank page error.
