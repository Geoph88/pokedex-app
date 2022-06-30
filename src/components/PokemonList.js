import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import pokemonPages from './pokemonPages';
import PokemonDetails from './PokemonDetails';
import {Routes, Route, Link} from 'react-router-dom'

function PokemonList() {
  const [PokemonList, setPokemonList] = useState([])
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0)

  

  useEffect(() => {
    const getPokemonData = async() => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1154`).then(res => res.json())
    const endOffset = offset + 20
    const currentPokemonList = response.results.slice(offset, endOffset)
    setPokemonList(currentPokemonList)
  }
    getPokemonData()
  })

  const handleChange = (event, value) => {
    setPage(value);
    const newOffset = pokemonPages[value]
    setOffset(newOffset - 20)
  };


  return (  
  <>
    <h1>Welcome to the pokedex</h1>
      <section className="pokemon-list-container">
        {PokemonList.map((pokemon, index) =>
        <div className='pokemon-container' key={index}>
          <Link to={`/PokemonDetails/${pokemon.name}`}>
          <h3 className='pokemon-name'>{`${pokemon.name[0].slice().toUpperCase() + pokemon.name.slice(1)}`}</h3>
          </Link>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[pokemon.url.split('/').length - 2]}.png`} alt="" />
          
          
         </div>  
          
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

// componentDidMount() {
//   const pokemonList = this.state.pokemonList
//   this.getPokemonDataList().then(pokemons => this.setState({
//     pokemonList: pokemons.results
//     })
//   )
// }

// {this.state.pokemonList.map((pokemon, index) => 
//   <div key={index}>
//   <h3>{pokemon.name}</h3>
//   <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} alt="" />
//   <button onClick={pokemonInformation(index + 1)}>more info</button>
// </div>
// )}



  // const handleChange = event => {
  //   console.log(Number(event.target.ariaLabel.slice(10)))
  // }
  
  // // for pagination
  // useEffect(() => {
  //   fetch(`https://pokeapi.co/api/v2/pokemon/?${pokemonOffset}`)
  //   .then(res => res.json())
  //   .then( res => {
  //   const pokemonResponse = res
  //   const pokemonResults = pokemonResponse.results
  //   const endOffset = pokemonOffset + pokemonPerPage
  //   console.log(`Loading pokemon from ${pokemonOffset} to ${endOffset}`)
  //   setPokemonList(pokemonList.slice(pokemonOffset, endOffset))
  //   setPageCount(Math.ceil(1154 / pokemonPerPage))
  // }, [pokemonOffset, pokemonPerPage])
  // })

  // invoke when user click to request another page
  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * 25) % 20
  //   console.log(`User request page number ${event.selected}, which is offset ${newOffset}`)
  //   setPokemonOffset(newOffset)
  // }

   // const fetchPokemonData = async (page) => {
  //   let offset = (0 + page) * 20
  //   const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`)
  //   const data = res.json()
  //   return data
  // }

