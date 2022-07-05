import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import './PokemonDetails.css'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import { createStyles, ThemeProvider, createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import { borderRadius } from "@mui/system";
import { red } from "@mui/material/colors";
import pokeball from '../Images/poke_ball.png'

function PokemonDetails({updateFavouritePokemon}) {
  let params = useParams()
  let pokemonName = params.pokemonName

  const style = {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '10%'
  }

  const imageBackgroundColor = {
    backgroundColor: 'lightGrey',
    borderRadius: '50px'
  }

  const colorsForTypes = {
  bug: "B1C12E",
  dark: "4F3A2D",
  dragon: "755EDF",
  electric: "FCBC17",
  fairy: "F4B1F4",
  fighting: "8C03128",
  fire: "E73B0C",
  flying: "A890F1",
  ghost: "6060B2",
  grass: "74C236",
  ground: "D3B357",
  ice: "A3E7FD",
  normal: "A8A878",
  poison: "A040A0",
  psychic: "ED4882",
  rock: "B9A156",
  steel: "B5B5C3",
  water: "3295F6",
}

  const tableRowHeading = {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '2px'
  }

  let baseStateStyleBar = ''

  function widthStyle(baseStat) {
    if (baseStat > 100) {
      baseStateStyleBar = {
        width: '100%'
      } 
    } else {
      baseStateStyleBar = {
        width: `${baseStat}%`
      }
    }
  }

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

  

  return (
    <>
      <section className="pokemon-details-container">
        <section style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <header className="pokemon-details-header" style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '8px',
          backgroundColor: 'red',
          width: '80%',
          borderRadius: '5px'
        }}>
          <div>{pokemonInformation.id}</div>
          <h1>{pokemonName[0].slice().toUpperCase() + pokemonName.slice(1)}</h1>
          <img src={pokemonObject.Sprite}></img>
          <div className="type-container">
          {pokemonTypes.map((type, index) => 
          <div key={index}>
          <div className="type-1" style={{
            backgroundColor: `#${colorsForTypes[type.type.name]}`,
            width: '6em',
            textAlign: 'center',
            display: 'inline-block',
            border: '.1em solid transparent',
            padding: '.1em .2em .2em',
            margin: '.1em, .015em',
            borderRadius: '4em',
            color: 'white'
          }}>{type.type.name}</div>
          <div className="type-2" style={{
            backgroundColor: `${colorsForTypes[type.name]}`,
            width: '6em',
            textAlign: 'center',
            display: 'inline-block',
            border: '.1em solid transparent',
            padding: '.1em .2em .2em',
            margin: '.1em, .015em',
            borderRadius: '4em',
            color: 'white'
          }}>{type.name}</div>      
        </div> 
        )} 
        </div>
        <img className="add-btn" onClick={() => updateFavouritePokemon(pokemonName, pokemonObject.Image, pokemonInformation.id - 1)} src={pokeball} style={{
          width: '10%',
          marginLeft: '5px'
        }}/>
        </header>
      </section>

      <Grid container>
        <Grid item xs={12} style={style}>
        <div className="image-container">
        <Grid container>
          <Grid item xs={12} md={12} 
            >
            <img src={pokemonObject.Image}></img>
          </Grid>
          <Grid item xs={6} md={6}>
          <img src={pokemonObject.shinyFrontSprite} style={imageBackgroundColor}></img>
          </Grid>
          <Grid item xs={6} md={6}>
          <img src={pokemonObject.shinyBackSprite} style={imageBackgroundColor}></img>
          </Grid>
          </Grid>
        </div>
      </Grid>

      <Grid item xs={4} md={12}>
      <table style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem'
      }}>
          <tbody>
            <tr>
              <th style={tableRowHeading}>Abilities</th>
              <th style={tableRowHeading}>Height</th>
              <th style={tableRowHeading}>Weight</th>
              <th style={tableRowHeading}>Capture Rate</th>
              <th style={tableRowHeading}>Base Happiness</th>
              <th style={tableRowHeading}>Base Experience</th>
              <th style={tableRowHeading}>Egg Group</th>
              <th style={tableRowHeading}>Gender Ratio</th>
            </tr>
            <tr style={{textAlign: 'center'}}>
              <td>{pokemonAbilities.map((ability, index) =>
                <div key={index}>{ability}</div>
              )}</td>
              <td>{pokemonInformation.height}</td>
              <td>{pokemonInformation.weight}kg</td>
              <td>{pokedexEntry.captureRate}</td>
              <td>{pokedexEntry.baseHappiness}</td>
              <td>{pokemonInformation.base_experience}</td>
              <td>{eggGroups.map((eggroup, index) => 
               <div className="egg-group" key={index}>{eggroup}</div>
              )}</td>
              <td>
                <div className="gender-ratio-container">
                  <div>♀: {pokedexEntry.genderFemaleRatio}</div>
                  <div>♂: {pokedexEntry.genderMaleRatio}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
      <Grid item xs={12} md={12}>
      <table className="pokedex-entry-table" style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem'
      }}>
        <tbody>
          <tr>
            <th style={tableRowHeading}>Pokedex Entry</th>
          </tr>
          <tr>
           <tr>{pokedexEntry.pokedexEntry}</tr>
          </tr>
        </tbody>
      </table>
      </Grid>
      <Grid item xs={4} md={12}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '2%'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '50%'
          }}>
            <header style={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '5px', 
              width: '50%' 
            }}>
              <h4>Stats:</h4>
            </header>
      </div>
      <div className='stats-table-container' style={{
        width: '100%',
        marginLeft: '50%'
      }}>
      {pokemonStats.map((stat, index) => 
        <div className="stats-container" key={index}>
          <p> {stat.stat.name} </p>
          <div className='progress' style={{
            backgroundColor:'lightgray',
            width: '50%'
          }}>
            <div className='progress-bar'
            style={{
              backgroundColor: 'red', 
              width: `${stat.base_stat}%`
            }}
            >
            <small style={{color: 'white'}}> {stat.base_stat} </small>
          </div>
          </div>
        </div>
      )}
      </div>
      </div>
      </Grid>
    </Grid>
    </section>
    </>
  )
}
export default PokemonDetails