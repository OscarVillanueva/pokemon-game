
<template>
  <div class="over-container">
    <h1>GAME OVER</h1>
    <button @click="$emit('restart')">Restart</button>
  </div>
</template>

<script>
export default {
  name: "GameOver",
};
</script>

<style scoped>
.over-container {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  position: absolute;
  left: 0;
  top: 0;
}

button {
  color: white;
  text-transform: uppercase;
  background-color: #ad3716;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.7rem 0rem;
  width: 250px;
}
</style>
