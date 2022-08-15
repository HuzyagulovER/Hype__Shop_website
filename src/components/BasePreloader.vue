<template>
  <div class="preloader">
    <Loader class="preloader__loader" />
  </div>
</template>

<script>
import Loader from "./Loader.vue";
export default {
  name: "BasePreloader",
  components: {
    Loader,
  },
};
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #16171b, $alpha: 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  &__loader {
    width: 10%;
    height: 10%;
  }
}
</style>