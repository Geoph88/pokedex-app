import gengar from './Images/gengar.png'
import gyaradosPikachu from './Images/gyarados-pikachu-image.webp'
import gyarados from './Images/gyarados.png'
import kyogre from './Images/kyogre.png'
import porygonZ from './Images/porygon-z.png'
import regice from './Images/regice.png'
import shinyMagikarp from './Images/shiny-magikarp.png'
import solosis from './Images/solosis.png'
import solrock from './Images/solrock.png'
import volcarona from './Images/volcarona.png'


const pokemonImages = [gengar, gyaradosPikachu, gyarados, kyogre, porygonZ, regice, shinyMagikarp, solosis, solrock, volcarona]

function randomPokemonImage(pokemonImages) {
  return pokemonImages[Math.floor(Math.random() * pokemonImages.length)]
}

randomPokemonImage(pokemonImages)

export {pokemonImages, randomPokemonImage}