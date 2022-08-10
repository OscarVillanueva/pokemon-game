<template>
  <div
    class="scoreboard-container"
    :class="[left ? 'top-left' : 'top-right', bouncing]"
  >
    <span class="material-symbols-outlined"> {{ icon }} </span>
    <h2 :class="{ 'fade-long-in': fade }">
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
    bounce: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fade: false,
    };
  },
  computed: {
    bouncing() {
      return this.bounce ? "bounce" : "";
    },
  },
  watch: {
    score(value, oldValue) {
      if (value !== oldValue) {
        this.fade = true;

        setTimeout(() => {
          this.fade = false;
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
  top: 0;
  left: 20px;
}

@media (min-width: 768px) {
  .top-left {
    top: 0;
    left: 40px;
  }
}

.top-right {
  position: absolute;
  top: 0;
  right: 20px;
}

@media (min-width: 768px) {
  .top-right {
    top: 0;
    right: 40px;
  }
}

span {
  font-size: 48px !important;
}
</style>