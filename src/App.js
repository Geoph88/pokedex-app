import logo from './logo.svg';
import './App.css';
import PokemonList from './components/PokemonList';
import {Routes, Route, Link} from 'react-router-dom'
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
  <>
    <div className="App">
      {/* <PokemonList /> */}
    </div>
    <Routes>
      <Route path='/' element={<PokemonList/>}>
      </Route>
      <Route path='/PokemonDetails/:pokemonName' element={<PokemonDetails />}>
      </Route>
    </Routes>
  </>
  );
}

export default App;
