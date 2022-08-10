<template>
  <h1 v-if="!pokemon">Cargando . . .</h1>
  <div v-else>
    <h1>¿Quién es este Pokémon?</h1>
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions
      :pokemons="pokemons"
      @selection="checkAnswer"
      :pokemon="pokemon"
    />

    <!-- <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="next">Siguiente</button>
    </template> -->
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import pokemonFactory from "@/helpers/getPokemonOptions";

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
      message: "",
    };
  },
  methods: {
    async getPokemons() {
      const data = await pokemonFactory.getPokemonOptions();

      this.pokemon = data.answer;
      this.pokemons = [data.answer, ...data.options].sort(
        () => Math.random() - 0.5
      );
    },
    checkAnswer() {
      this.showPokemon = true;
      setTimeout(() => this.next(), 2000);
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
