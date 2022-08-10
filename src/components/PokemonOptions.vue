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
}
li {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
}

.correct {
  background-color: rgb(154, 207, 74);
}

.correct:hover {
  background-color: rgb(154, 207, 74);
}

.error {
  background-color: rgba(255, 0, 0, 0.72);
}

.error:hover {
  background-color: rgba(255, 0, 0, 0.72);
}
</style>