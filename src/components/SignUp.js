import { useState, useEffect } from 'react'
import {Routes, Route, Link, useNavigate, Redirect} from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './styles/home-page.css'
import pokeball from '../Images/poke_ball.jpeg'
import geoffdex from '../Images/Geoffdex.png'

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
    <section className='home-page'>
      <header>
        <img src={geoffdex} alt="" />
      </header>
      <main>
        <section className='sign-up'>
          <header>
        <h3>Sign up</h3>
          </header>
          <form onSubmit={(event) => handleSubmit(name, email, password, event)}>
            <fieldset>
            <label htmlFor="'username">Username: </label>
            <input 
            type='text' 
            name='name'
            placeholder='username'
            onChange={handleUserNameChange}
              />
            </fieldset>
            <fieldset>
            <label htmlFor="'Email">Email: </label>
            <input 
            type='text' 
            name='email'
            placeholder='email'
            onChange={handleEmailChange}
              />
            </fieldset>
            <fieldset>
            <label htmlFor="'username">Password: </label>
            <input 
            type='password' 
            name='password'
            placeholder='password'
            onChange={handlePasswordChange}
              />
            </fieldset>
            <button className='signup-btn'>Sign Up</button>  
          </form>
        </section>
      
    
        <section className='login-section'>
          <header>
            <h3>Log in</h3>
          </header>
          <form onSubmit={(event) => logIn(userEmail, userPassword, event)}>
            <fieldset>
            <label htmlFor="'email">Email: </label>
            <input 
            type='text' 
            name='email'
            placeholder='email'
            onChange={handleUserEmailChange}
              />
            </fieldset>
            <fieldset>
            <label htmlFor="'username">Password: </label>
            <input 
            type='password' 
            name='password'
            placeholder='password'
            onChange={handleUserPasswordChange}
              />
            </fieldset>
            <button className='login-btn'>Log in</button>  
          </form>
        </section>
      </main>
      <section className='about'>
          <article>
            <p>Welcome to the Geoffdex! This project interacts with <a href="https://pokeapi.co/">PokeApi</a> to make an app that allows users to sign up and see more information about pokemon from the popular gaming franchise Pokemon. Users can also click on the <img src={pokeball} alt="image of a pokeball"/> to save their favourite Pokemon. More information on the project is on my <a href="https://github.com/Geoph88/pokedex-app/">Github</a>.
            </p>
          </article>
        </section>
    </section>
    </>
  )
}