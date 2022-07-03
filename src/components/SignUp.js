import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function SignUp () {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUserNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = {name, email, password}

    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => console.log(response))
  }

  return (
    <>
    <section className='dashboard-page'>
    
    <section className='sign-up'></section>
    <h3>Sign up</h3>
      <form onSubmit={handleSubmit}>
        <fieldset>
        <label htmlFor="'username">Username:</label>
        <input 
        type='text' 
        name='name'
        placeholder='username'
        onChange={handleUserNameChange}
          />
        </fieldset>
        <fieldset>
        <label htmlFor="'username">Email:</label>
        <input 
        type='text' 
        name='email'
        placeholder='email'
        onChange={handleEmailChange}
          />
        </fieldset>
        <fieldset>
        <label htmlFor="'username">Password:</label>
        <input 
        type='password' 
        name='password'
        placeholder='password'
        onChange={handlePasswordChange}
          />
        </fieldset>
        <button>Sign Up</button>  
      </form>
    </section>
    </>
  )
}