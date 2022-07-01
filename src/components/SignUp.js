import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function SignUp () {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  function signUp() {
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userName, email, password })
    })
  }

  return (
    <>
    <section className='dashboard-page'>
    
    <section className='sign-up'></section>
    <h3>Sign up</h3>
    <label>Username</label>
    <input 
      type='text'
      name='name'
      onChange={(e) => {setUserName(e.target.value)}}/>
      <label>Email</label>
    <input 
      type='text'
      name='email'
      onChange={(e) => {setEmail(e.target.value)}}/>
      <label>Password</label>
    <input 
      type='password'
      name='password'
      onChange={(e) => {setPassword(e.target.value)}}/>
      <button onClick={() => signUp()}>Sign Up</button>

    
    </section>
    </>
  )
}