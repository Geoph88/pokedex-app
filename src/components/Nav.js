import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';
import {randomPokemonImage, pokemonImages} from '../randomPokemonImage'
import '../components/styles/nav.css'

const style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  position: 'fixed',
  backgroundColor: 'red',
  color: 'white'
}

const toolbarStyle = {
  color: 'white'
}

const navImages = {
  width: '3rem'
}


export default function Nav({handleLogOut}) {

  return (
    <>
      <React.Fragment>
      <AppBar style={style}
      >
        <div style={{
          display: 'flex',
        }}>
          <Link to='/dashboard'>
            <Toolbar style={toolbarStyle}>Dashboard</Toolbar>
          </Link>
          <Link to='/FavouritePokemon'>
            <Toolbar style={toolbarStyle}>Faves</Toolbar>
          </Link>
        </div>
        <div style={{
          display: 'flex',
        }}>
          <Toolbar><img src={randomPokemonImage(pokemonImages)} alt="a random image of a pokemon from their pokemon shuffle icon" style={navImages} className='nav-image'/></Toolbar>
          <Toolbar>Welcome to the Geoffdex</Toolbar>
          <Toolbar><img src={randomPokemonImage(pokemonImages)} alt="a random image of a pokemon from their pokemon shuffle icon" style={navImages} className='nav-image'/></Toolbar>
        </div>
        <Toolbar onClick={() => handleLogOut()}>Logout</Toolbar>
        
      </AppBar>
      <Toolbar />
    </React.Fragment>
    </> 
  );
}
