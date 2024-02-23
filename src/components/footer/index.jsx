import React, { useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from 'antd'
import { HeartOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { selectExpirationStatus } from '../../features/auth/authSlice'

export default function Footer() {
  const isTokenExpired = useSelector(selectExpirationStatus)
  const btColor = '#a9a9a9'

  return (
    <div className='footer'>
      <div className='footerHomeButton'>
        <Link className='footer-buttons' to='/'>
          <Button type='text' size='large' style={{ color: btColor }} icon={<HomeOutlined />} />
        </Link>
      </div>
      {!isTokenExpired ? (
        <div className='protectedButtons'>
          <Link className='footer-buttons' to='/deck'>
            <Button type='text' size='large' style={{ color: btColor }} icon={<HeartOutlined />} />
            chores
          </Link>

          <Link className='footer-buttons' to='/login'>
            <Button type='text' size='large' style={{ color: btColor }} icon={<UserOutlined />} />
            profile
          </Link>
        </div>
      ) : (
        <> </>
      )}
    </div>
  )
}
