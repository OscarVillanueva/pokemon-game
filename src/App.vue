<template>
  <PokemonPage />
</template>

<script>
import PokemonPage from "./pages/PokemonPage.vue";

export default {
  name: "App",
  components: {
    PokemonPage,
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
  margin-top: 60px;
}
.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
</style>
