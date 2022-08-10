import pokeAPI from '@/api/pokemonAPI'

class PokemonFactory {

  constructor() {
    this.already = []
  }

  /**
   * It generates four random numbers between 1 and 650, and then checks if they are already in the
   * array. If they are not, it adds them to the array
   */
  generateFourPokemons() {

    let appended = 0
    let id = 0
    let laps = 0

    while (appended < 4 && laps < 50) {

      id = Math.floor((Math.random() * 650) + 1);

      if (!this.already.includes(id)) {
        this.already.push(id)
        appended = appended + 1;
      }

      laps = laps + 1;

    }

  }

  /**
   * It takes an array of pokemon ids, and returns an array of pokemon names and ids
   * @param [] - a, b, c, d: The pokemon's ID.
   * @returns An array of objects with the name and id of the pokemon.
   */
  async getPokemonNames([a, b, c, d] = []) {

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

  /**
   * It generates four random pokemon, gets their names, and returns them
   * @returns An array of four pokemon names
   */
  async getPokemonOptions() {
    this.generateFourPokemons()
    return await this.getPokemonNames(this.already)
  }

}

export default new PokemonFactory();
