<template>
  <GameOver v-if="isGameOver" @restart="restartGame" />
  <PokemonPage :restart="resetGame" @over="setGameOver" />
</template>

<script>
import GameOver from "./components/GameOver.vue";
import PokemonPage from "./pages/PokemonPage.vue";

export default {
  name: "App",
  data() {
    return {
      isGameOver: false,
      resetGame: false,
    };
  },
  components: {
    GameOver,
    PokemonPage,
  },
  methods: {
    setGameOver() {
      this.isGameOver = true;
    },
    restartGame() {
      this.resetGame = true;
      this.isGameOver = false;
      setTimeout(() => {
        this.resetGame = false;
      }, 500);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(241, 245, 249);
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
