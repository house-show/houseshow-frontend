/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import './style.css'

export default function Header() {
  return (
    <div className='header'>
      <div>logo</div>
      <Button type='primary'>
        <Link to='/login'>Sign In</Link> {/* Wrap Button inside Link */}
      </Button>
    </div>
  )
}
