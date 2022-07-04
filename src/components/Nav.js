import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Link} from 'react-router-dom';

const style = {
  display: 'flex',
  flexDirection: 'row',
  position: 'fixed'
}


export default function Nav({handleLogOut}) {

  return (
    <>
      <React.Fragment>
      <AppBar style={style}
      >
        <Link to='/dashboard'>
        <Toolbar>Dashboard</Toolbar>
        </Link>
        <Link to='/FavouritePokemon'>
        <Toolbar>Check out your faves</Toolbar>
        </Link>
        <Toolbar onClick={() => handleLogOut()}>Logout</Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
    </> 
  );
}
