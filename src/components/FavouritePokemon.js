import React from 'react'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import PokemonList from './PokemonList'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './styles/favourite-pokemon.css'
import { shadows } from '@mui/system';


export default function FavouritePokemon ({userId}) {

  const [favouritePokemon, setFavouritePokemon] = useState(null)


  function getFavouritePokemon() {
    fetch(`/api/favouritePokemon/${userId}`)
    .then(res => res.json())
    .then(res => {setFavouritePokemon(res)
    })
  }

  const deleteFavouritePokemon = id => {
    console.log(id)
    fetch(`/api/favouritePokemon/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const newFavouritePokemon = favouritePokemon.filter((pokemon) => pokemon.id !== id)
      console.log(newFavouritePokemon)
      setFavouritePokemon(newFavouritePokemon)
      // getFavouritePokemon()
    }) 
  }

  useEffect(getFavouritePokemon, [])



  return (
    <>
    <section className="favourite-pokemon-page">
    <h1>These are the pokemon you've caught</h1>
    <div className='all-favourite-pokemon-container'> 
      
      {favouritePokemon && favouritePokemon.map((pokemon, index) => 
      <Card sx={{ maxWidth: 300 }} className='box-shadow' ley={index} >
      <div className='pokemon_container' key={index}>
        <Typography gutterBottom variant='h5' component='div'>
          <span className='pokedex-id'>{pokemon.pokedex_id}</span>
          <button onClick={() => deleteFavouritePokemon(pokemon.id)}>release</button>
        </Typography>

        <Link to={`/PokemonDetails/${pokemon.pokemon_name}`} style={{color: 'black'}}>
        <CardMedia
          component='img'
          height='40%'
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedex_id}.png`} 
          alt='image of a pokemon'
          key={index}
          />
          <div className='card-header-border' style={{border: 'solid', width:'100%'}}></div>
        <CardContent>
          <h3 key={index}>{pokemon.pokemon_name[0].slice().toUpperCase() + pokemon.pokemon_name.slice(1)}</h3>
        </CardContent>
        </Link> 
      </div>
      </Card>
      )}
    </div>
    </section>
    </>
  )
}