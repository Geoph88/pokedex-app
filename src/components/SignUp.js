import { useState, useEffect } from 'react'
import {Routes, Route, Link, useNavigate, Redirect} from 'react-router-dom'


export default function SignUp (
      {
        name,
        email,
        password,
        userEmail,
        userPassword,
        handleSubmit,
        userId,
        handleUserNameChange,
        handlePasswordChange,
        handleEmailChange,
        handleUserEmailChange,
        handleUserPasswordChange,
        logIn
      }
) {

  return (
    <>
    <section className='dashboard-page'>
    
    <section className='sign-up'></section>
    <h3>Sign up</h3>
      <form onSubmit={(event) => handleSubmit(name, email, password, event)}>
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
        <label htmlFor="'Email">Email:</label>
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
    <h3>Log in</h3>
    <section className='login-section'>
    <form onSubmit={(event) => logIn(userEmail, userPassword, event)}>
        <fieldset>
        <label htmlFor="'email">Email:</label>
        <input 
        type='text' 
        name='email'
        placeholder='email'
        onChange={handleUserEmailChange}
          />
        </fieldset>
        <fieldset>
        <label htmlFor="'username">Password:</label>
        <input 
        type='password' 
        name='password'
        placeholder='password'
        onChange={handleUserPasswordChange}
          />
        </fieldset>
        <button>Log in</button>  
      </form>
    </section>
    </>
  )
}