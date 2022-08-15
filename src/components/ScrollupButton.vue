<template>
  <div class="scroll-up" @click="scrollUp">
    <div class="scroll-up__container">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 315.66 315.66">
        <g>
          <g>
            <path
              d="M157.83,0A157.83,157.83,0,1,0,315.66,157.83,157.83,157.83,0,0,0,157.83,0Zm0,289.36A131.53,131.53,0,1,1,289.36,157.83,131.53,131.53,0,0,1,157.83,289.36Z"
            />
            <path
              d="M224.89,191.35h0a11.67,11.67,0,0,1-16.51,0L160.5,143.47a5.75,5.75,0,0,0-8.12,0l-47.87,47.88a11.67,11.67,0,0,1-16.51,0h0a11.67,11.67,0,0,1,0-16.51l60.19-60.19a11.67,11.67,0,0,1,16.51,0l60.19,60.19A11.69,11.69,0,0,1,224.89,191.35Z"
            />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollupButton",
  data() {
    return {
      isMobile: {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          if (
            this.Android() ||
            this.BlackBerry() ||
            this.iOS() ||
            this.Opera() ||
            this.Windows()
          ) {
            return true;
          }
          return false;
        },
      },
    };
  },
  methods: {
    scrollUp() {
      if (
        this.isMobile.any() ||
        document.querySelector("html").offsetWidth < 801
      ) {
        document.querySelector("html").scrollTop = "0";
      } else {
        document.querySelector(
          ".main [class$=__container]:not([class*=scroll])"
        ).scrollTop = "0";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$middle-grey: #2d2d32;
$gold: #e2a224;
$dark-grey: #18181d;

.scroll-up {
  width: 100%;
  height: 100%;
  position: relative;
  &__container {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 1.13rem;
    top: -0.94rem;
    left: 0;
    width: 100%;
    height: 300%;
    background-color: $dark-grey;
    border-radius: 1.25rem;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover {
      background-color: $gold;
      top: -3.13rem;
    }

    svg {
      width: 60%;
      height: auto;
      fill: $middle-grey;
    }
  }
}
</style>