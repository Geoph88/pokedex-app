import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { createTheme } from '@mui/material/styles'

function PokemonDetails() {
  let params = useParams()
  let pokemonName = params.pokemonName

  const [pokemonInformation, setPokemonInformation] = useState(' ')
  const [pokemonObject, setPokemonObject] = useState ({})
  const [pokemonStats, setPokemonStats] = useState([])
  const [pokemonAbilities, setPokemonAbilities] = useState([])
  const [pokemonTypes, setPokemonTypes] = useState([])
  const [pokedexEntry, setPokedexEntry] = useState({})
  const [eggGroups, setEggGroups] = useState([])

    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(res => res.json())
    .then(res => {
      const PokemonInformation = res
      const pokemonStats = res.stats
      const pokemonTypes = res.types
      const Sprite = res['sprites']['versions']['generation-viii']['icons']['front_default']
      const Image = res['sprites']['other']['official-artwork']['front_default']
      const pokemonAbilities = res.abilities.map(ability => ability.ability.name)
      const shinyFrontSprite = res.sprites['front_shiny']
      const shinyBackSprite = res.sprites['back_shiny']
      
      setPokemonInformation
      (PokemonInformation)
      setPokemonStats(pokemonStats)
      setPokemonTypes(pokemonTypes)
      setPokemonAbilities(pokemonAbilities)
      setPokemonObject({pokemonStats,
        pokemonTypes,
        Sprite,
        Image,
        pokemonAbilities,
        shinyFrontSprite,
        shinyBackSprite
      })    
    })

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
    .then(res => res.json())
    .then (res => {
      const results = res
      const pokedexEntry = res['flavor_text_entries'].filter(entry => entry['language']['name'] === 'en')[0]['flavor_text']
      const eggGroups = res['egg_groups'].map(eggGroup => eggGroup.name)
      const captureRate = res['capture_rate']
      const baseHappiness = res['base_happiness']
      const femaleRate = res["gender_rate"];
      const genderFemaleRatio = 12.5 * femaleRate;
      const genderMaleRatio = 12.5 * (8 - femaleRate)

      setPokedexEntry({pokedexEntry, baseHappiness, captureRate, genderFemaleRatio, genderMaleRatio})
      setEggGroups(eggGroups)
    })
  })

  const style = {
    backgroundColor: '#2196f3'
  }


  return (
    <>
    <section className="pokemon-details-container">
      <h1>{pokemonName[0].slice().toUpperCase() + pokemonName.slice(1)}</h1>
      <div className="image-container">
        <img src={pokemonObject.Sprite}></img>
        <img src={pokemonObject.shinyFrontSprite}></img>
        <img src={pokemonObject.shinyBackSprite}></img>

        <img src={pokemonObject.Image}></img>
      </div>
      {pokemonStats.map((stat, index) => 
      <div className="stats-container" key={index}>
        <div width={stat.base_stat} style={style}>
          <div> {stat.base_stat} </div>
        </div>
        <p> {stat.stat.name} </p>
      </div>
      )}

      {pokemonTypes.map((type, index) => 
        <div className="type-container" key={index}>
        <div className="type-1">{type.type.name}</div>
        <div className="type-2">{type.name}</div>      
      </div> 
      )} 

       <div className="ability_container">
      {pokemonAbilities.map((ability, index) => 
        <div className='ability' key={index}>{ability}</div>
      )}

      </div>  
      <p>Base Experience: {pokemonInformation.base_experience}</p>
      <p>Height: {pokemonInformation.height}</p>
      <p>Pokedex Number: {pokemonInformation.id}</p>
      <p>Weight:{pokemonInformation.weight}</p>
      <p>Capture Rate: {pokedexEntry.captureRate}</p>
      <p>Base Happiness: {pokedexEntry.baseHappiness}</p>

      {eggGroups.map((eggroup, index) => 
      <div className="egg-group" key={index}>{eggroup}</div>
      )}
      <article>
        <p>{pokedexEntry.pokedexEntry}</p>
        <div className="gender-ratio-container">
          <div>{pokedexEntry.genderFemaleRatio}</div>
          <div>{pokedexEntry.genderMaleRatio}</div>
        </div>
      </article>
    </section>
    </>
  )
}
export default PokemonDetails