import logo from './logo.svg';
import './App.css';
import PokemonList from './components/PokemonList';
import {Routes, Route, Link, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import PokemonDetails from './components/PokemonDetails';
import FavouritePokemon from './components/FavouritePokemon';
import SignUp from './components/SignUp'
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Nav from './components/Nav'


function App() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userId, setUserId] = useState(0)

  // for sign-up
  const handleUserNameChange = (event) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (name, email, password, event) => {
    event.preventDefault()
    const data = {
      name: name,
      email: email,
      password: password
    }
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(user => user.json())
    .then(user => {
      setUserId(user.userId)
      navigate('/dashboard')
    })
  } 

  // for log-in

  const handleUserEmailChange = (event) => {
    setUserEmail(event.target.value)
  }

  const handleUserPasswordChange = (event) => {
    setUserPassword(event.target.value)
  }

  const logIn = (userEmail, userPassword, event) => {
    event.preventDefault()
    const data = {
      userEmail: userEmail,
      userPassword: userPassword
    }
    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(user => user.json())
    .then(user => {
      setUserId(user.userId)
      navigate('/dashboard')
    })
  }


  return (
  <>
    <div className="App">
      <Nav />
    </div>
    <Routes>
      <Route path = '/' element={<SignUp
      name={name}
      email={email}
      password={password}
      userPassword={userPassword}
      userEmail={userPassword}
      userId={userId}
      handleSubmit={handleSubmit}
      handleUserNameChange = {handleUserNameChange}
      handlePasswordChange = {handlePasswordChange}
      handleEmailChange = {handleEmailChange}
      handleUserEmailChange = {handleUserEmailChange}
      handleUserPasswordChange = {handleUserPasswordChange}
      logIn = {logIn}
      
      />}>
      </Route>
      <Route path='/dashboard' element={<PokemonList/>}>
      </Route>
      <Route path='/PokemonDetails/:pokemonName' element={<PokemonDetails />}>
      </Route>
      <Route path='/FavouritePokemon' element={<FavouritePokemon />}>  
      </Route>
    </Routes>
  </>
  );
}

export default App;
