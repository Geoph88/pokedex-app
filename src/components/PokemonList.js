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

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([])
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0)
  const [favouritePokemon, setFavouritePokemon] = useState({
    pokemonName: [],
    pokedex_id: [],
    image: []
  })

  

  useEffect(() => {
    const getPokemonData = async() => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1154`).then(res => res.json())
    
    const endOffset = offset + 20
    const currentPokemonList = response.results.slice(offset, endOffset)
    setPokemonList(currentPokemonList)
  }
    getPokemonData()
  })

  
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

  // useEffect(saveFavouritePokemon, [favouritePokemon])

  const handleChange = (event, value) => {
    setPage(value);
    const newOffset = pokemonPages[value]
    setOffset(newOffset - 20)
  };

  
  const style = {
    boxShadow: '0 1 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important'
  }

  


  return (  
  <>
    <h1>Welcome to the pokedex</h1>
      <section className="pokemon-list-container">
        
        {PokemonList.map((pokemon, index) =>
        <Card sx={{ maxWidth: 345, margin: '2rem' }}>
        <div className='pokemon-container' style={style} key={index}>
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

