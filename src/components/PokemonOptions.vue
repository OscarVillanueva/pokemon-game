<template>
  <div class="options-container">
    <ul>
      <li
        v-for="poke in pokemons"
        :key="poke.id"
        @click="checkAnswer(poke.id)"
        :class="[
          showAnswer &&
            (poke.id === pokemon.id ? 'correct wiggle' : 'error fade-in'),
        ]"
      >
        {{ poke.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PokemonOptions",
  props: {
    pokemons: {
      type: Array,
      required: true,
      default: [],
    },
    pokemon: {
      type: Object,
      required: true,
      default: { id: 800, name: "Dummy" },
    },
  },
  data() {
    return {
      showAnswer: false,
    };
  },
  methods: {
    checkAnswer(id) {
      this.showAnswer = true;
      this.$emit("selection", id);
    },
  },
};
</script>

<style scoped>
/* Pokemon Options */
ul {
  list-style-type: none;
  margin-top: 4rem;
}
li {
  background-color: #ad3716;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.7rem 0rem;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.options-container {
  display: flex;
  justify-content: center;
}

.correct {
  background-color: rgb(21, 128, 61);
}

.correct:hover {
  background-color: rgb(21, 128, 61);
}

.error {
  background-color: rgb(220, 38, 38);
}

.error:hover {
  background-color: rgb(220, 38, 38);
}
</style>