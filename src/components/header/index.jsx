import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../../features/auth/authSlice'
import './style.css'
import closeIcon from '../../assets/close.png'
import menuIcon from '../../assets/menu.png'

export default function Header() {
  const token = useSelector(selectCurrentToken) || localStorage.getItem('token')
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggle && !event.target.closest('.headerContents')) {
        setToggle(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [toggle])

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className='headerContents'>
      <Link to='/'>
        <h2>Cup Score</h2>
      </Link>
      <button
        className='menu-icon'
        type='button'
        onClick={handleToggle}
        aria-label={toggle ? 'Close Menu' : 'Open Menu'}
      >
        <img className='logoImg' src={toggle ? closeIcon : menuIcon} alt='menu' />
      </button>

      <div className={`menu-items ${toggle ? 'show' : ''}`}>
        <ul className='menu-list'>
          {token ? (
            <>
              <Link to='/login'>
                <Button type='primary' onClick={handleToggle}>
                  Profile
                </Button>
              </Link>
              <Link to='/deck'>
                <Button type='primary' onClick={handleToggle}>
                  to Cafes
                </Button>
              </Link>
            </>
          ) : (
            <Link to='/login'>
              <Button type='primary' onClick={handleToggle}>
                Sign In
              </Button>
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}
