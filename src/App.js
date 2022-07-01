import logo from './logo.svg';
import './App.css';
import PokemonList from './components/PokemonList';
import {Routes, Route, Link} from 'react-router-dom'
import PokemonDetails from './components/PokemonDetails';
import FavouritePokemon from './components/FavouritePokemon';
import SignUp from './components/SignUp'

function App() {
  return (
  <>
    <div className="App">
      
    </div>
    <Routes>
      <Route path = '/' element={<SignUp/>}>

      </Route>
      <Route path='/dashboard' element={<PokemonList/>}>
      </Route>
      <Route path='/PokemonDetails/:pokemonName' element={<PokemonDetails />}>
      </Route>
      <Route path='/FavouritePokemon' element={<FavouritePokemon />}>  
      </Route>
    </Routes>
  </>
  );
}

export default App;
