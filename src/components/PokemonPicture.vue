<template>
  <div class="pokemon-container">
    <img v-if="!showPokemon" :src="imgSrc" class="hidden-pokemon" />
    <img v-else :src="imgSrc" class="fade-in" />
  </div>
</template>

<script>
export default {
  name: "PokemonImage",
  props: {
    pokemonId: {
      type: Number,
      default: 25,
      required: true,
      validator(value) {
        return !isNaN(Number(value)) && value >= 0;
      },
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    },
  },
};
</script>

<style scoped>
/* Pokemon Picture */
.pokemon-container {
  height: 200px;
}
img {
  height: 200px;
  width: 100vw;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>