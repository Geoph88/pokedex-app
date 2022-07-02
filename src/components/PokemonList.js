import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import pokemonPages from './pokemonPages';
import PokemonDetails from './PokemonDetails';
import {Link} from 'react-router-dom';
import './PokemonList.css';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import FavouritePokemon from './FavouritePokemon';
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader';
import SearchPokemon from './SearchPokemon'
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';


function PokemonList() {
  const [PokemonList, setPokemonList] = useState(null)
  const [searchBar, setSearchBar] = useState(null)
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0)
  const [favouritePokemon, setFavouritePokemon] = useState
  ({
    pokemonName: [],
    pokedex_id: [],
    image: []
  })
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [type, setType] = useState(' ')

  const handleClick = (event) => {
    console.log(event.value)
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const getPokemonData = async() => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1154`).then(res => res.json())
    
    const endOffset = offset + 20
    const currentPokemonList = response.results.slice(offset, endOffset)
    setPokemonList(currentPokemonList)
    setSearchBar(response.results)
  }
    getPokemonData()
  }, [])
  
  function saveFavouritePokemon (pokemon, id, image) {
    if (favouritePokemon !== null) {
    id = id + 1
    // const favouritePokemon = {pokemon, id, image}
    fetch('/api/favouritePokemon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pokemon, id, image })
      }).then(res => console.log(res)).catch(err => console.log(err))
    }
  }

  const handleChange = (event, value) => {
    setPage(value);
    const newOffset = pokemonPages[value]
    setOffset(newOffset - 20)
  };

  const handleTypeChange = (event) => {
    const typeToLowerCase = event.target.value[0].toLowerCase() + event.target.value.slice(1)

    fetch(`https://pokeapi.co/api/v2/type/${typeToLowerCase}`).then(res => res.json()).then(res => {
      const pokemonByType = res.pokemon.map(pokemon => pokemon.pokemon)
      setPokemonList(pokemonByType)
    })
  };


  const types = ['Bug',	'Dark',	'Dragon',	'Electric',	'Fighting',	'Fire',	'Flying',	'Ghost',
  'Grass',	'Ground',	'Ice',	'Normal',	'Poison',	'Psychic',	'Rock',	'Steel',	'Water']
  


  return (  
  <>
    <h1>Welcome to the pokedex</h1>
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
        <Link to={`/PokemonDetails/${pokemon.name}`}>
        <MenuItem key={index}>{pokemon.name}</MenuItem>
        </Link>
        )}
      </Menu>
    </div>
          {/* for searching for pokemon based on type */}
    <div>
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Search for a type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={''}
          label="Search for a type"
          onChange={ handleTypeChange }
        >
          {types.map((oneType, index) => 
          <MenuItem value={oneType} key={index}>{oneType}</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
    </div>

      <section className="pokemon-list-container">
        {PokemonList && PokemonList.map((pokemon, index) =>
        <Card sx={{ maxWidth: 345, margin: '2rem' }}>
        <div className='pokemon-container' key={index}>
          <Typography gutterBottom variant="h5" component="div" className='pokedex_id'>
              {pokemon.url.split('/')[pokemon.url.split('/').length - 2]}
            </Typography>
            <Link to={`/PokemonDetails/${pokemon.name}`}>
            <CardMedia
            component='img'
            height='140'
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[pokemon.url.split('/').length - 2]}.png`}
            alt='image of a pokemon'
            />
          <CardContent>
          <h3 className='pokemon-name'>{`${pokemon.name[0].slice().toUpperCase() + pokemon.name.slice(1)}`}</h3>
          </CardContent>
          </Link>
          <CardActions>
          <Button variant="contained" onClick={() => {saveFavouritePokemon(pokemon.name, index, pokemon.url)}}>Catch this Pokemon</Button>
          </CardActions>
          </div>   
          </Card>
        )}  
        
        </section>
        <>
        <Stack spacing={2}>
        <Typography>Page: {page}</Typography>
        <Pagination count={58} page={page} onChange={handleChange} />
        </Stack>
          
          </>
  </>
  )
}   

export default PokemonList

