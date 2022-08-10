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
      life: 3,
      message: "",
      pokemon: null,
      pokemons: [],
      score: 0,
      showPokemon: false,
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
    checkAnswer(id) {
      this.showPokemon = true;

      if (id === this.pokemon.id) this.score = this.score + 1;
      else this.life = this.life - 1;

      if (this.life >= 0) setTimeout(() => this.next(), 2000);
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
