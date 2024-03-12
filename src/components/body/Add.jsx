/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Divider, Flex, Input, Rate, Select, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { CameraOutlined, CoffeeOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'

import './login.css'

export default function Add() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.chores.tasks)

  const [message, setMessage] = useState('your message...')
  const [cafeName, setCafeName] = useState('')
  const [rating, setRating] = useState(0)

  const inputRef = useRef(null)
  const onNameChange = (event) => {
    setCafeName(event.target.value)
  }

  const addItem = () => {
    console.log('Cafe added:', cafeName)
    setCafeName('')
  }

  const handleSave = () => {
    const data = {
      message,
      cafeName,
      rating
    }
    console.log('Data to save:', data)
  }

  return (
    <div className='body'>
      <div className='loginContainer'>
        <Card
          hoverable
          style={{ background: 'rgba(55, 55, 55, 0.5)', width: '80vw', height: '100vh' }}
        >
          <Select
            style={{ width: 300 }}
            placeholder='Select or Add a Cafe'
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder='Please enter a Cafe'
                    ref={inputRef}
                    value={cafeName}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
            options={tasks.map((task) => ({
              label: task.name,
              value: task.name
            }))}
            onChange={(value) => setCafeName(value)}
          />

          <Flex vertical gap='middle' style={{ padding: '16px 0px 16px' }}>
            <Rate character={<CoffeeOutlined />} allowHalf value={rating} onChange={setRating} />
          </Flex>

          <TextArea
            autoSize
            onChange={(e) => setMessage(e.target.value)}
            placeholder='your feedback'
            maxLength={100}
          />

          <Button style={{ marginTop: '10px' }} type='secondary' icon={<CameraOutlined />} />

          <Flex>
            <Button style={{ marginTop: '30px' }} type='primary' onClick={handleSave}>
              Save
            </Button>
          </Flex>
        </Card>
      </div>
    </div>
  )
}
