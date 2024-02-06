import React from 'react'
import './style.css'
import { Button } from 'antd'
import {
  AppstoreOutlined,
  HeartOutlined,
  HomeOutlined,
  MenuOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

export default function Footer() {
  const btColor = '#a9a9a9'
  return (
    <div className='footer'>
      <Link className='footer-buttons' to='/'>
        <Button type='text' size='large' style={{ color: btColor }} icon={<HomeOutlined />} />
        home
      </Link>
      <Link className='footer-buttons' to='/deck'>
        <Button type='text' size='large' style={{ color: btColor }} icon={<HeartOutlined />} />
        chores
      </Link>
      <Link className='footer-buttons' to='/current'>
        <Button type='text' size='large' style={{ color: btColor }} icon={<MenuOutlined />} />
        current
      </Link>

      <Link className='footer-buttons' to='/login'>
        <Button type='text' size='large' style={{ color: btColor }} icon={<UserOutlined />} />
        profile
      </Link>
    </div>
  )
}
