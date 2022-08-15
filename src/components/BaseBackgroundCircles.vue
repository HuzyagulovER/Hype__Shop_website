<template>
  <div class="circles">
    <div class="circles__circle circle circle_1"></div>
    <div class="circles__circle circle circle_2"></div>
    <div class="circles__circle circle circle_3"></div>
    <div class="circles__circle circle circle_4"></div>
    <div class="circles__circle circle circle_5"></div>
  </div>
</template>

<script>
export default {
  name: "Circles",
};
</script>

<style lang="scss" scoped>
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  z-index: 1;
  user-select: none;
  overflow: hidden;

  .circle {
    background-color: rgb(var(--c_white));
    opacity: 0.006;
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    &_1 {
      width: 70vw;
      height: 70vw;
      top: 10vh;
      left: 30vw;
    }

    &_2 {
      width: 60vw;
      height: 60vw;
      top: 15vh;
      left: 90vw;
    }

    &_3 {
      width: 40vw;
      height: 40vw;
      top: 105vh;
      left: 40vw;
    }

    &_4 {
      width: 40vw;
      height: 40vw;
      top: 80vh;
      left: -5vw;
    }

    &_5 {
      width: 40vw;
      height: 40vw;
      top: 95vh;
      left: 105vw;
    }
  }
}
</style>