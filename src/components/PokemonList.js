import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'

function PokemonList() {

  const [pokemonList, setPokemonList] = useState(`https://pokeapi.co/api/v2/pokemon/?${pokemonOffset}/?${pokemonPerPage}`)
  const [pageCount, setPageCount] = useState(0)
  const [pokemonOffset, setPokemonOffset] = useState(0)

  let pokemonPerPage = 20
 

  function getPokemonDataList () {
    fetch(pokemonList)
    .then(res => res.json())
    .then(res => {
      const pokemonResponse = res
      const pokemonResults = pokemonResponse.results
      setPokemonList(pokemonResults)
    })
  }

  useEffect(getPokemonDataList, [])
  // for pagination
  useEffect(() => {
    const endOffset = pokemonOffset + pokemonPerPage
    console.log(`Loading pokemon from ${pokemonOffset} to ${endOffset}`)
    setPokemonList(pokemonList.slice(pokemonOffset, endOffset))
    setPageCount(Math.ceil(1154 / pokemonPerPage))
  }, [pokemonOffset, pokemonPerPage])

  // invoke when user click to request another page
  const handlePageClick = (event) => {
    console.log(event.select)
    const newOffset = (event.select * pokemonPerPage) % pokemonList.length
    console.log(`User request page number ${event.selected}, which is offset ${newOffset}`)
    setPokemonOffset(newOffset)
  }

  return (  
    
  <>
    <h1>Welcome to the pokedex</h1>

      <section className="pokemon-list-container">
        {pokemonList.map((pokemon, index) =>
        <div className='pokemon-container' key={index}>
          <h3>{pokemon.name}</h3>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`} alt="" />
         </div>  
        )}

      <>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
    </>
    </section>
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
