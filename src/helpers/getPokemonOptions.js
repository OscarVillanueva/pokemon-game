import pokeAPI from '@/api/pokemonAPI'

const getPokemons = () => {

  const pokemons = Array.from(Array(650));
  return pokemons.map((_, index) => index + 1);

}

const getPokemonNames = async ([a, b, c, d] = []) => {

  try {

    const [aResponse, bResponse, cResponse, dResponse] = await Promise.all([
      pokeAPI.get(`/${a}`),
      pokeAPI.get(`/${b}`),
      pokeAPI.get(`/${c}`),
      pokeAPI.get(`/${d}`),
    ])

    return [
      { name: aResponse.data.name, id: aResponse.data.id },
      { name: bResponse.data.name, id: bResponse.data.id },
      { name: cResponse.data.name, id: cResponse.data.id },
      { name: dResponse.data.name, id: dResponse.data.id },
    ]

  } catch (error) {
    throw new Error()
  }

}

export const getPokemonOptions = () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)
  return getPokemonNames(mixedPokemons.splice(0, 4))
}
