<template>
  <section class="slider">
    <div class="slider__container">
      <div class="slider__wrapper">
        <TransitionGroup name="transition">
          <div
            class="slider__slide"
            v-for="(item, i) in slides"
            :key="i"
            v-show="activeSlide === i"
          >
            <div class="slider__text text">
              <p class="text__submain">{{ item.firstString }}</p>
              <p class="text__main">{{ item.secondString }}</p>
              <p class="text__small">{{ item.thirdString }}</p>
              <RouterLink :to="item.linkTo" class="text__link link">
                <p class="link__text">{{ item.buttonString }}</p>
                <IconLink class="link__icon" />
              </RouterLink>
            </div>
            <div class="slider__image">
              <img
                :src="`./images/${item.imageSrc}.png`"
                :alt="item.buttonString"
              />
            </div>
          </div>
        </TransitionGroup>
      </div>
      <div class="slider__dots dots">
        <div class="dots__container">
          <div class="dots__wrapper">
            <div
              class="dots__dot"
              v-for="(item, i) in slides"
              :key="i"
              :class="{ active: activeSlide === i }"
              @click="activeSlide = i"
            ></div>
          </div>
          <div class="dots__line"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import IconLink from "../components/additionalComponents/IconLink.vue";
export default {
  name: "BaseSlider",
  components: {
    IconLink,
  },
  data() {
    return {
      activeSlide: 0,
    };
  },
  computed: {
    ...mapState(["slides"]),
    activeContent() {
      return this.slides[this.activeSlide];
    },
  },
  methods: {
    sliderAnimation() {
      setTimeout(() => {
        if (!document.hidden) {
          if (this.activeSlide + 1 >= this.slides.length) {
            this.activeSlide = 0;
          } else {
            this.activeSlide++;
          }
        }
        this.sliderAnimation();
      }, 5000);
    },
  },
  mounted() {
    this.sliderAnimation();
  },
};
</script>

<style lang="scss" scoped>
$linkIconWidth: 4rem;
$linkIconFill: rgb(var(--c_white));
$mainTextSize: 2.8rem;

.slider {
  margin-bottom: 1.5rem;

  &__container {
    display: flex;
    align-items: stretch;
    width: 100%;
  }

  &__wrapper {
    flex: 1;
    display: grid;
    grid-template: 1fr / 1fr;
    margin-right: 2rem;

    @media screen and (max-width: 750px) {
      margin-right: 0;
    }
  }

  &__slide {
    display: flex;
    grid-row: 1/2;
    grid-column: 1/2;
    width: 100%;
    height: 100%;
    justify-content: space-between;

    @media screen and (max-width: 750px) {
      flex-direction: column;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    &__submain {
      font: {
        family: "Montserrat Semibold";
        size: $mainTextSize;
      }
      margin-bottom: 1rem;
    }

    &__main {
      font: {
        family: "Montserrat Bold";
        size: $mainTextSize;
      }
      margin-bottom: 1.5rem;
    }

    &__small {
      color: rgb(var(--c_light-pink));
      margin-bottom: 2.5rem;
      font-size: 1.1rem;
    }

    .link {
      display: flex;
      align-items: center;
      opacity: 0.5;
      transition: all 0.3s ease;

      &__icon {
        display: flex;
        align-items: center;
        width: $linkIconWidth;
        fill: $linkIconFill;
        position: relative;
        transition: all 0.3s ease;

        &::after {
          content: "HYPE";
          position: absolute;
          top: 50%;
          left: 90%;
          font: {
            family: "Montserrat Bold";
            size: 0.8rem;
          }
          color: $linkIconFill;
          transform: translateY(-50%) rotate(90deg);
          text-align: center;
        }
      }

      &__text {
        font: {
          family: "Montserrat Bold";
        }
        letter-spacing: 0.2rem;
        color: $linkIconFill;
        margin-right: 1rem;
        text-transform: uppercase;
      }

      &:hover {
        opacity: 1;
        .link__icon {
          transform: translateX(20%);
        }
      }
    }
  }

  &__image {
    max-width: 40vw;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    @media screen and (max-width: 750px) {
      max-width: unset;
    }
  }

  .dots {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 0 1rem;

    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 50%;

      @media screen and (max-width: 1050px) {
        height: 65%;
      }
    }

    &__wrapper {
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    &__dot {
      width: 0.6rem;
      height: 0.6rem;
      background-color: rgb(var(--c_grey));
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover,
      &.active {
        background-color: rgb(var(--c_coral));
      }
    }

    &__line {
      height: 50%;
      width: 1px;
      background-color: rgb(var(--c_grey));
      margin: 1rem 0;
    }
  }
}

@media screen and (max-width: 750px) {
  .slider {
    &__container {
      flex-direction: column;
    }

    &__wrapper {
      margin-right: 0;
      margin-bottom: 1rem;
    }

    &__slide {
      flex-direction: column;
    }

    &__image {
      max-width: unset;
    }

    .text {
      margin-bottom: 2rem;
    }

    .dots {
      &__container {
        height: auto;
        width: 80%;
        flex-direction: row;
      }

      &__wrapper {
        flex-direction: row;
      }

      &__dot {
        margin-right: 1rem;
      }

      &__line {
        height: 1px;
        width: 40%;
      }
    }
  }
}

$transitionTime: 1s;
$transitionOffset: 20%;
.transition {
  &-leave-active {
    z-index: 1;
    transition: all $transitionTime ease;
  }
  &-enter-active {
    z-index: 3;
    transition: all $transitionTime ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
  }
  &-enter-from {
    transform: translateY(-$transitionOffset) scale(0.9);
  }
  &-leave-to {
    transform: translateY($transitionOffset) scale(0.9);
  }
}
</style>