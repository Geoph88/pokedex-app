import React from 'react'
import { useState, useEffect } from 'react'
import PokemonList from './PokemonList'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'


export default function FavouritePokemon ({userId}) {

  const [favouritePokemon, setFavouritePokemon] = useState(null)


  function getFavouritePokemon() {
    fetch(`/api/favouritePokemon/${userId}`)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      setFavouritePokemon(res)
    })
  }

  const deleteFavouritePokemon = indexOfPokemonClicked => {
    indexOfPokemonClicked = indexOfPokemonClicked + 1
    fetch(`/api/favouritePokemon/${indexOfPokemonClicked}`, {
      method: 'DELETE'
    })
    .then(() => {
      const newFavouritePokemon = favouritePokemon.map((pokemon, i) => i !== indexOfPokemonClicked)
      setFavouritePokemon(newFavouritePokemon)
      getFavouritePokemon()
    }) 
  }

  useEffect(getFavouritePokemon, [])



  return (
    <>
    <main className="favourite-pokemon-page">
    <h1>These are the pokemon you've caught</h1>
    <div className='all-favourite-pokemon-container'>
    {favouritePokemon && favouritePokemon.map((pokemon, index) => 
    <div className='pokemon_container' key={index}>
      <h3>{pokemon.pokemon_name}</h3>
      <span>{pokemon.pokedex_id}</span>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.image_url.split('/')[pokemon.image_url.split('/').length - 2]}.png`} alt="" />
    </div>
    )}

    </div>
    </main>
    </>
  )
}