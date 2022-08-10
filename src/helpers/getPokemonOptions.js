import pokeAPI from '@/api/pokemonAPI'

class PokemonFactory {

  constructor() {
    this.already = []
  }

  /**
   * It generates a random number between 1 and 650, checks if it's already been used, and if not, it
   * adds it to the array of already used numbers
   * @returns An object with two properties: answer and options.
   */
  generateFourPokemons() {

    let answer = 0
    let id = 0
    let laps = 0
    let options = []
    let ready = false

    while (!ready) {

      id = Math.floor((Math.random() * 650) + 1);

      if (!this.already.includes(id) && answer === 0) {

        answer = id
        this.already.push(id)

      }
      else options.push(id)

      laps = laps + 1;
      if (laps >= 50 || (answer !== 0 && options.length === 3)) ready = true

    }

    return [answer, ...options]

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
    const options = await this.getPokemonNames(this.generateFourPokemons())

    return {
      answer: options.shift(),
      options,
    }
  }

}

export default new PokemonFactory();
