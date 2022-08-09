<template>
  <h1 v-if="!pokemon">Cargando . . .</h1>
  <div v-else>
    <h1>¿Quién es este Pokémon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemons" @selection="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="next">Siguiente</button>
    </template>
  </div>
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
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async getPokemons() {
      const data = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = data[rndInt];
      this.pokemons = data;
    },
    checkAnswer(selectedID) {
      this.showPokemon = true;

      if (selectedID === this.pokemon.id)
        this.message = `Correcto, ${this.pokemon.name}`;
      else this.message = `Oopps, era ${this.pokemon.name}`;

      this.showAnswer = true;
    },
    async next() {
      this.pokemon = null;
      this.showPokemon = false;
      this.showAnswer = false;
      this.message = "";

      await this.getPokemons();
    },
  },
};
</script>
