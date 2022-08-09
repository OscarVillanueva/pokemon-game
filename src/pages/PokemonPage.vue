<template>
  <h1>¿Quién es este Pokémon?</h1>
  <PokemonPicture
    :pokemonId="pokemons[0].id"
    :showPokemon="true"
    v-if="pokemons.length"
  />
  <PokemonOptions :pokemos="pokemons" v-if="pokemons.length" />
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import { getPokemonOptions } from "@/helpers/getPokemonOptions";

export default {
  name: "PokémonPage",
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  beforeMount() {
    this.getPokemons();
  },
  data() {
    return {
      pokemons: [],
    };
  },
  methods: {
    async getPokemons() {
      const data = await getPokemonOptions();
      this.pokemons = data;
    },
  },
};
</script>
