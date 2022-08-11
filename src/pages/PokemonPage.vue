<template>
  <div class="container">
    <Board :score="score" />

    <Board
      v-if="highScore > 0"
      :score="highScore"
      icon="sports_score"
      className="high-score-container"
    />

    <Board :score="life" :left="false" :icon="icon" :bounce="bounceLife" />

    <h1 v-if="!pokemon" class="h-screen sm-mt-10">Cargando . . .</h1>

    <div v-else class="sm-mt-10">
      <h1>¿Quién es este Pokémon?</h1>
      <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <PokemonOptions
        :pokemons="pokemons"
        @selection="checkAnswer"
        :pokemon="pokemon"
      />
    </div>
  </div>
</template>

<script>
import Board from "@/components/Board.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";

import pokemonFactory from "@/helpers/getPokemonOptions";
import storageManager from "@/helpers/storageManager";

export default {
  name: "PokémonPage",
  props: {
    restart: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Board,
    PokemonOptions,
    PokemonPicture,
  },
  beforeMount() {
    this.getPokemons();
    this.highScore = storageManager.getScore();
  },
  watch: {
    restart(value, old) {
      if (value !== old && value) {
        this.life = 3;
        this.score = 0;
        this.icon = "favorite";
        this.bounceLife = false;
        this.next();
      }
    },
  },
  data() {
    return {
      bounceLife: false,
      icon: "favorite",
      life: 3,
      message: "",
      pokemon: null,
      pokemons: [],
      score: 0,
      showPokemon: false,
      highScore: 0,
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

      if (this.life >= 0) {
        setTimeout(() => this.next(), 2000);

        if (this.score > this.highScore && this.highScore !== 0)
          this.highScore = this.score;
      } else {
        this.icon = "heart_broken";

        if (this.score > this.highScore) {
          storageManager.saveScore(this.score);
          this.highScore = this.score;
        }

        setTimeout(() => {
          this.$emit("over");
        }, 1200);
      }

      if (this.life === 0) this.bounceLife = true;
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

<style scoped>
.sm-mt-10 {
  padding-top: 5rem;
}

@media (min-width: 768px) {
  .sm-mt-10 {
    padding-top: 0;
  }
}

.container {
  position: relative;
}

.h-screen {
  height: 100vh;
}

.high-score-container {
  display: flex;
  align-items: center;
  gap: 1rem;

  position: absolute;
  top: 40px;
  left: 20px;
}

@media (min-width: 768px) {
  .high-score-container {
    left: 40px;
  }
}
</style>
