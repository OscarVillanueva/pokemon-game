<template>
  <div class="scoreboard-container" :class="[left ? 'top-left' : 'top-right']">
    <span class="material-symbols-outlined"> {{ icon }} </span>
    <h2 :class="{ 'fade-long-in': bounce }">
      {{ score }}
    </h2>
  </div>
</template>

<script>
export default {
  name: "Board",
  props: {
    icon: {
      type: String,
      default: "scoreboard",
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    left: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      bounce: false,
    };
  },
  watch: {
    score(value, oldValue) {
      if (value !== oldValue) {
        this.bounce = true;

        setTimeout(() => {
          this.bounce = false;
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
.scoreboard-container {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.top-left {
  position: absolute;
  top: -70px;
  left: 20px;
}

@media (min-width: 768px) {
  .top-left {
    top: -40px;
    left: 40px;
  }
}

.top-right {
  position: absolute;
  top: -70px;
  right: 20px;
}

@media (min-width: 768px) {
  .top-right {
    top: -40px;
    right: 40px;
  }
}

span {
  font-size: 48px !important;
}
</style>