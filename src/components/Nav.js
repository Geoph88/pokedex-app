import * as React from 'react';
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
import {Link} from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



export default function Nav({searchBar}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
               {/* for searching for a specific pokemon */}
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  Search for a Pokemon
                </Button>
                
                <Menu
                  id="contained"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'search-by-types',
                  }}
                >
                  {searchBar && searchBar.map((pokemon, index) =>
                  <Link to={`/PokemonDetails/${pokemon.name}`} key={index}>
                  <MenuItem key={index}>{pokemon.name}</MenuItem>
                  </Link>
                  )}
                </Menu>
              </div>
              </> 
  );
}
