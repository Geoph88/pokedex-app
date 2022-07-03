import logo from './logo.svg';
import './App.css';
import PokemonList from './components/PokemonList';
import {Routes, Route, Link} from 'react-router-dom'
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
  return (
  <>
    <div className="App">
      <Nav />
    </div>
    <Routes>
      <Route path = '/' element={<SignUp/>}>

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
