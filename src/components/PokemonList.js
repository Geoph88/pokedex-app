import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import pokemonPages from './pokemonPages';
import {Link} from 'react-router-dom';
import './styles/PokemonList.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import pokeball from '../Images/poke_ball.jpeg'

function PokemonList({
  userId,
  updateFavouritePokemon
  }) {
  const [PokemonList, setPokemonList] = useState(null)
  const [pokemonData, setPokemonData] = useState(null)
  const [searchBar, setSearchBar] = useState(null)
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(58)
  const [offset, setOffset] = useState(0)
  

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [type, setType] = useState(' ')

  
  useEffect(() => {
    const getPokemonData = async() => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1154`).then(res => res.json())

    const newPokemonData = response.results
    const endOffset = offset + 20
    const currentPokemonList = newPokemonData.slice(offset, endOffset)
    setPokemonData(newPokemonData)
    setPokemonList(currentPokemonList)
    setSearchBar(response.results)
  }
    getPokemonData()
  }, [])

  // for pagination
  const handleChange = (event, value) => {
    let startOffset = pokemonPages[value] - 20
    let endOffset = pokemonPages[value]

    setPage(value);

    setPokemonList(pokemonData.slice(startOffset, endOffset))
  };

  // for rendering pokemon by type
  const handleTypeChange = (event) => {
    const typeToLowerCase = event.target.value[0].toLowerCase() + event.target.value.slice(1)

    fetch(`https://pokeapi.co/api/v2/type/${typeToLowerCase}`).then(res => res.json()).then(res => {
      const pokemonByType = res.pokemon.map(pokemon => pokemon.pokemon)
      setPokemonList(pokemonByType)
      setPageCount(0)
    })
  };

  const types = ['Bug',	'Dark',	'Dragon',	'Electric',	'Fighting',	'Fire',	'Flying',	'Ghost',
  'Grass',	'Ground',	'Ice',	'Normal',	'Poison',	'Psychic',	'Rock',	'Steel',	'Water']
  
  return (  
  <>
  <section style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5rem',
    marginTop: '2rem'
  }}>
  <div>
  <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Search for a pokemon
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
    <div style={{width: '11rem'}}>
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
    </section>

      <section className="pokemon-list-container">
        {PokemonList && PokemonList.map((pokemon, index) =>
        
        <Card sx={{ maxWidth: 345, margin: '2rem', border: 'solid' }} key={index}>
          <div className='pokemon-container' key={index}>
            <Typography gutterBottom variant="h5" component="div" className='pokedex_id'>
             {pokemon.url.split('/')[pokemon.url.split('/').length - 2]}  
            </Typography>
            <div className='card-header-border' style={{border: 'solid', width:'100%'}}></div>
            <Link to={`/PokemonDetails/${pokemon.name}`} style={{color: 'black'}}>
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
          </div>
          <img className="add-btn" onClick={() => updateFavouritePokemon(pokemon.name, pokemon.url, index)} src={pokeball} style={{
          width: '10%',
          marginLeft: '5px'
          }}/>
          </Card>
          
          
        )}  
        </section>

        <div className='pagination-container'>
          <Stack spacing={2}>
          <Pagination count={pageCount} page={page} onChange={handleChange} />
          </Stack>
        </div>
  </>
  )
}   

export default PokemonList

