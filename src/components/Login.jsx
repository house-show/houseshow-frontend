/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { UseDispatch, useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../features/auth/authApiSlice'

function Login() {
  const userRef = useRef()
  const errRef = useRef()
  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const userData = await Login({ user, pwd }).unwrap()
      dispatch(setCredentials({ ...userData, user }))
      setUser('')
      setPwd('')
      navigate('/welcome')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUser(e.target.value)

  const handlePwdInput = (e) => setPwd(e.target.value)

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className='login'>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} />
      <h1>employee login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username:</label>
        <input
          type='text'
          id='username'
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete='off'
          required
        />
        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' value={pwd} onChange={handlePwdInput} required />
        <button type='button'>Sign In</button>
      </form>
    </section>
  )

  return content
}

export default Login
