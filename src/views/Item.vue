<template>
  <section class="product" id="product">
    <div class="wrapper">
      <div class="product__container">
        <div class="product__item item">
          <div class="item__preview preview">
            <div
              class="preview__container"
              ref="previewContainer"
              @mouseover="previewZoom($event)"
              @mousemove="previewZoom($event)"
              @mouseout="previewZoom($event)"
              @touchstart="previewZoom($event)"
              @touchmove="previewZoom($event)"
              @touchend="previewZoom($event)"
            >
              <BaseImage
                :src="currentProduct.images[activeImage]"
                class="preview__image"
                v-if="!isVideoActive"
              />
              <BaseImage
                :src="currentProduct.images[activeImage]"
                class="preview__zoom"
                v-if="!isVideoActive"
                ref="previewZoom"
              />
              <BaseVideo
                :src="currentProduct.images[activeImage]"
                controls="controls"
                v-else-if="isVideoActive"
              />
              <Loader v-else />
            </div>
          </div>
          <div class="item__other">
            <div class="item__info info">
              <div
                class="item__favourite"
                :class="{ favour: favourite }"
                @click="toggleFavourites"
              >
                <IconStar />
              </div>
              <p class="info__title">
                {{ currentProduct.info.name }}
              </p>
              <p class="info__price">
                {{ changePrice(currentProduct.info.price) }} GEL
              </p>
              <div class="info__colors colors" v-if="isColors">
                <p class="colors__text">
                  <span :class="{ ge: language === 'ge' }"
                    >{{ $t("item.color") }}:</span
                  >
                  {{ activeColor }}
                </p>
                <div class="colors__choise">
                  <div
                    class="colors__color"
                    v-for="(color, i) in currentProduct.info.colors"
                    :class="{ active: activeColor == i }"
                    :key="i"
                    :ref="'color' + i"
                    @click="colorChoise(i)"
                  >
                    <div :style="{ background: color }"></div>
                  </div>
                </div>
              </div>
              <div class="info__characteristics characteristics">
                <p
                  class="characteristics__text"
                  v-for="(characteristic, i) in currentProduct.info
                    .characteristics"
                  :key="i"
                >
                  {{ i }} - {{ characteristic }}
                </p>
              </div>
            </div>
            <div class="item__buttons buttons">
              <div class="buttons__amount amount">
                <div class="amount__container">
                  <div class="amount__minus" @click="amountChange(-1)">
                    <p>-</p>
                  </div>
                  <input type="number" class="amount__input" v-model="amount" />
                  <div class="amount__plus" @click="amountChange(1)">
                    <p>+</p>
                  </div>
                </div>
              </div>
              <button
                class="buttons__add add"
                @click="addToCart"
                :class="{ added: added }"
              >
                <p class="add__text" :class="{ ge: language === 'ge' }">
                  {{ $t("item.add_to_cart") }}
                </p>
                <IconTick class="add__tick" />
              </button>
              <button
                class="buttons__buy"
                @click="buyNow"
                :class="{ ge: language === 'ge' }"
              >
                {{ $t("item.buy_now") }}
              </button>
            </div>
          </div>
        </div>
        <div
          class="product__images images"
          ref="images"
          :class="{ 'not-scrolling': !isScrolling }"
        >
          <div
            class="images__left-scroll"
            @click="imagesScroll(1)"
            :class="{ 'not-active': !leftScrolButtonActive }"
          >
            <IconCorner />
          </div>
          <div class="images__container" ref="imagesContainer">
            <div
              class="images__image-container"
              v-for="(image, i) in currentProduct.images"
              :key="i"
              @click="chooseImage(i)"
              :class="{
                active: i == activeImage,
                video: currentProduct.images[i].includes('.mp4'),
              }"
            >
              <BaseImage
                v-if="!currentProduct.images[i].includes('.mp4')"
                :src="currentProduct.images[i]"
                :alt="currentProduct.images[i]"
                class="images__image"
              />
              <BaseVideo
                v-else
                :src="currentProduct.images[i]"
                class="images__video"
              />
            </div>
          </div>
          <div
            class="images__right-scroll"
            @click="imagesScroll(-1)"
            :class="{ 'not-active': !rightScrolButtonActive }"
          >
            <IconCorner />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import BaseImage from "../components/BaseImage.vue";
import BaseVideo from "../components/BaseVideo.vue";
import IconStar from "../components/additionalComponents/IconStar.vue";
import IconCorner from "../components/additionalComponents/IconCorner.vue";
import IconTick from "../components/additionalComponents/IconTick.vue";

export default {
  name: "Item",
  components: {
    BaseImage,
    BaseVideo,
    IconStar,
    IconCorner,
    IconTick,
  },
  inject: ["changePrice"],
  data() {
    return {
      activeColor: "",
      amount: 1,
      name: "",
      activeImage: 0,
      favourite: "",
      isScrolling: false,
      leftScrolButtonActive: false,
      rightScrolButtonActive: true,
      added: false,
    };
  },
  computed: {
    params() {
      return this.$route.params;
    },
    productString() {
      return this.params.category + "_" + this.params.id;
    },
    isVideoActive() {
      return this.currentProduct.images[this.activeImage]?.includes(".mp4");
    },
    isColors() {
      return (
        Object.prototype.hasOwnProperty.call(
          this.currentProduct.info,
          "colors"
        ) && Object.keys(this.currentProduct.info.colors).length
      );
    },
    ...mapState(["language", "currentProduct", "favourites"]),
  },
  methods: {
    addToCart() {
      let productObject = {
        ...this.params,
        color: this.activeColor,
        amount: this.amount,
        name: this.name,
      };
      this.$store.commit("ADD_TO_CART", productObject);
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 1500);
    },
    buyNow() {
      let productObject = {
        ...this.params,
        color: this.activeColor,
        amount: this.amount,
        name: this.name,
      };
      this.$store.commit("SET_PRODUCTS_TO_BUY", productObject);
      this.$router.push({ path: "/order" });
    },
    amountChange(change) {
      this.amount = this.amount + change;
    },
    colorChoise(color) {
      this.activeColor = color;
      this.$refs["color" + color].classList.add("active");
    },
    chooseImage(imageID) {
      if (this.activeImage !== imageID) {
        if (this.currentProduct.images[imageID]?.includes(".mp4")) {
          this.activeImage = "";
          setTimeout(() => {
            this.activeImage = imageID;
          }, 300);
        } else {
          this.activeImage = imageID;
        }
      }
    },
    toggleFavourites() {
      if (this.$store.getters.getFavourites[this.productString]) {
        this.$store.dispatch("changeFavourites", {
          method: "remove",
          productString: this.productString,
          object: { ...this.params },
        });
      } else {
        this.$store.dispatch("changeFavourites", {
          method: "add",
          productString: this.productString,
          object: { ...this.params },
        });
      }

      this.isFavourite();
    },
    isFavourite() {
      this.favourite = Object.prototype.hasOwnProperty.call(
        this.$store.getters.getFavourites,
        this.productString
      );
    },
    previewZoom(e) {
      if (!this.isVideoActive) {
        let zoom = this.$refs.previewZoom.$el,
          container = this.$refs.previewContainer,
          containerSize = {
            w: parseInt(window.getComputedStyle(container).width),
            h: parseInt(window.getComputedStyle(container).height),
          };

        if (e.type == "mouseover") {
          if (!container.classList.contains("active")) {
            container.classList.add("active");
          }
        }
        if (e.type == "mousemove") {
          let mousePoint = {
              x: e.offsetX,
              y: e.offsetY,
            },
            zoomSize = {
              w: parseInt(window.getComputedStyle(zoom).width),
              h: parseInt(window.getComputedStyle(zoom).height),
            };

          zoom.style.left =
            (-mousePoint.x / containerSize.w) * (zoomSize.w - containerSize.w) +
            "px";
          zoom.style.top =
            (-mousePoint.y / containerSize.h) * (zoomSize.w - containerSize.h) +
            "px";
        }
        if (e.type == "mouseout") {
          container.classList.remove("active");
        }

        if (e.type == "touchstart") {
          if (!container.classList.contains("active")) {
            container.classList.add("active");
          }

          let startCoords = container.getBoundingClientRect(),
            mousePoint = {
              x: e.touches[0].clientX - startCoords.x,
              y: e.touches[0].clientY - startCoords.y,
            },
            zoomSize = {
              w: parseInt(window.getComputedStyle(zoom).width),
              h: parseInt(window.getComputedStyle(zoom).height),
            };

          zoom.style.left =
            (-mousePoint.x / containerSize.w) * (zoomSize.w - containerSize.w) +
            "px";
          zoom.style.top =
            (-mousePoint.y / containerSize.h) * (zoomSize.h - containerSize.h) +
            "px";
        }
        if (e.type == "touchmove") {
          document.body.style.overflow = "hidden";
          let startCoords = container.getBoundingClientRect(),
            mousePoint = {
              x: e.touches[0].clientX - startCoords.x,
              y: e.touches[0].clientY - startCoords.y,
            },
            zoomSize = {
              w: parseInt(window.getComputedStyle(zoom).width),
              h: parseInt(window.getComputedStyle(zoom).height),
            };

          if (
            !(
              e.touches[0].clientX > startCoords.x + containerSize.w ||
              e.touches[0].clientY > startCoords.y + containerSize.h ||
              e.touches[0].clientX < startCoords.x ||
              e.touches[0].clientY < startCoords.y
            )
          ) {
            zoom.style.left =
              (-mousePoint.x / containerSize.w) *
                (zoomSize.w - containerSize.w) +
              "px";
            zoom.style.top =
              (-mousePoint.y / containerSize.h) *
                (zoomSize.h - containerSize.h) +
              "px";
          }
        }
        if (e.type == "touchend") {
          document.body.removeAttribute("style");
          container.classList.remove("active");
        }
      }
    },
    imagesScroll(mult) {
      let imagesWidth = this.$refs.images.offsetWidth,
        imagesContainerWidth = this.$refs.imagesContainer.scrollWidth,
        scrollLength = imagesContainerWidth - imagesWidth,
        delta = imagesContainerWidth / 5,
        translateValue = this.$refs.imagesContainer.style.transform
          ? +this.$refs.imagesContainer.style.transform.match(
              /translateX\((.*)px\)/
            )[1]
          : 0;
      if (translateValue + delta * mult > 0) {
        this.$refs.imagesContainer.style.transform = ``;
      } else if (translateValue + delta * mult < -scrollLength) {
        this.$refs.imagesContainer.style.transform = `translateX(${-scrollLength}px)`;
      } else {
        this.$refs.imagesContainer.style.transform = `translateX(${
          translateValue + delta * mult
        }px)`;
      }

      translateValue = this.$refs.imagesContainer.style.transform
        ? +this.$refs.imagesContainer.style.transform.match(
            /translateX\((.*)px\)/
          )[1]
        : 0;

      if (translateValue == 0) {
        this.leftScrolButtonActive = false;
        this.rightScrolButtonActive = true;
      } else if (translateValue == -scrollLength) {
        this.leftScrolButtonActive = true;
        this.rightScrolButtonActive = false;
      } else {
        this.leftScrolButtonActive = true;
        this.rightScrolButtonActive = true;
      }
    },
    isScrollingImages() {
      this.isScrolling =
        this.$refs.imagesContainer.scrollWidth > this.$refs.images.offsetWidth;
    },
  },
  async mounted() {
    await this.$store.dispatch("loadCurrentProduct", this.params);
    this.activeColor = Object.keys(this.currentProduct.info.colors)[0];
    this.name = this.currentProduct.info.name;
    this.isFavourite();
    this.isScrollingImages();
  },
  watch: {
    amount() {
      if (this.amount % 1) {
        this.amount = Math.floor(this.amount);
      }
      if (this.amount <= 0) {
        this.amount = 1;
      }
    },
    favourites() {
      this.favourite = Object.prototype.hasOwnProperty.call(
        this.favourites,
        this.productString
      );
    },
  },
};
</script>

<style lang="scss">
$transparentDarkMain: rgba(var(--c_dark-main), 0.3);
.product {
  width: 100%;

  .item {
    display: grid;
    grid-template: 1fr / 1fr 2fr;
    gap: 4rem;
    background-color: var(--c_transparent-light-main);
    padding: 3rem;
    border-radius: var(--border-radius);
    margin-bottom: 1.5rem;

    .preview {
      border-radius: var(--border-radius);
      overflow: hidden;
      aspect-ratio: 1 / 1;

      @supports not (aspect-ratio: initial) {
        height: 24.63rem;
      }

      &__container {
        position: relative;
        background-color: $transparentDarkMain;
        //   padding: 1.5rem;
        height: 100%;
        width: 100%;
        cursor: crosshair;

        &.active {
          .preview {
            &__zoom {
              opacity: 1;
            }

            &__image {
              opacity: 0;
            }
          }
        }
      }

      &__image {
        opacity: 1;
        transition: opacity 0.3s ease;
        z-index: 2;
      }

      &__zoom {
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1;

        img {
          width: 100%;
          height: 100%;
          pointer-events: none;
          user-select: none;
        }
      }
    }

    &__other {
      display: flex;
      flex-direction: column;
    }

    &__favourite {
      position: absolute;
      top: 0;
      right: 0;
      width: 3.7rem;
      height: 3rem;
      padding: 0.7rem;
      background-color: rgb(var(--c_dark-main));
      border-radius: var(--border-radius);
      cursor: pointer;

      svg {
        transition: all 0.2s ease;
      }

      &:hover {
        svg {
          transform: scale(1.1);
        }
      }

      &:active {
        svg {
          transform: scale(0.98);
        }
      }

      .outer {
        fill: rgb(var(--c_desaturated-graylish-blue));
      }

      .inner {
        fill: transparent;
        transition: all 0.3s ease;
      }

      &.favour {
        .inner {
          fill: rgb(var(--c_desaturated-graylish-blue));
        }
      }
    }

    $marginBottom: 1.2rem;
    .info {
      position: relative;
      flex: 1;
      font-family: "Montserrat Semibold";

      & > * {
        margin-bottom: $marginBottom;
      }

      &__title {
        color: rgb(var(--c_desaturated-graylish-blue));
      }

      .colors {
        &__text {
          color: rgb(var(--c_white));
          margin-right: 0.5rem;
          text-transform: capitalize;
          span {
            color: rgb(var(--c_grey));
          }
        }

        &__choise {
          display: flex;
          align-items: center;
          margin-top: 0.3rem;
        }

        &__color {
          width: 1rem;
          height: 1rem;
          border: 1px solid var(--c_transparent-grey);
          padding: 0.1rem;
          border-radius: 50%;
          margin-right: 0.3rem;
          cursor: pointer;
          position: relative;

          &.active {
            border-color: rgb(var(--c_coral));
          }

          div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            width: 80%;
            height: 80%;
          }
        }
      }

      .characteristics {
        &__text {
          color: rgb(var(--c_grey));

          &:nth-child(3n) {
            margin-bottom: $marginBottom;
          }
        }
      }
    }

    .buttons {
      display: flex;

      & > * {
        height: 3rem;
      }
      .amount {
        margin-right: auto;
        &__container {
          display: flex;
          align-items: stretch;
          background-color: $transparentDarkMain;
          border-radius: var(--border-radius);
          height: 100%;
        }

        &__minus,
        &__plus {
          cursor: pointer;
          padding: 0 0.8rem;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &__minus {
        }
        &__plus {
        }

        &__input {
          width: 5rem;
          background: transparent;
          border: 0;
          text-align: center;
          color: rgb(var(--c_grey));
          font: {
            family: "Montserrat Semibold";
            size: 1rem;
          }
        }
      }

      .add,
      &__buy {
        border-radius: var(--border-radius);
        padding: 0 3rem;
        cursor: pointer;
        font: {
          size: 0.95rem;
          family: "Montserrat Semibold";
        }
      }

      .add {
        margin-right: 0.5rem;
        border: 1px solid rgb(var(--c_pink));
        background-color: transparent;
        color: rgb(var(--c_light-grey));
        z-index: 1;
        position: relative;
        overflow: hidden;
        transition: all 0.5s ease;

        & > * {
          transition: all 0.5s ease;
        }

        &__tick {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          color: rgb(var(--c_white));
        }

        &.added {
          .add {
            &__tick {
              opacity: 1;
            }
            &__text {
              opacity: 0;
            }
          }
        }

        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 110%;
          height: 110%;
          transform: translate(-160%, -50%) skewX(-30deg);
          background-color: rgb(var(--c_coral));
          z-index: -1;
          opacity: 0;
          transition: transform 0s ease 0.5s, opacity 0.5s ease;
        }

        &:hover {
          color: rgb(var(--c_white));

          &::before {
            transform: translate(-50%, -50%) skewX(-30deg);
            opacity: 1;
            transition: transform 0.5s ease, opacity 0s;
          }
        }

        &:active {
          transform: scale(0.98);
        }
      }

      &__buy {
        color: rgb(var(--c_white));
        background-color: rgb(var(--c_coral));
        text-transform: uppercase;
        border: 0;
        position: relative;
        z-index: 1;
        transition: all 0.3s ease;
        overflow: hidden;

        &:active {
          transform: scale(0.98);
        }
        &:hover {
          transform: scale(1.02);

          &::after {
            left: 100%;
            transition: all 0.5s ease;
          }
        }

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: -30%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(var(--c_white), 0.5) 50%,
            transparent 100%
          );
          transform: translateY(-50%) skewX(-30deg);
          width: 20%;
          height: 110%;
          z-index: -1;
          transition: all 0s;
        }
      }
    }
  }

  $imageSize: 12rem;
  $borderRadius: var(--border-radius);
  .images {
    max-width: 100%;
    overflow: hidden;
    height: $imageSize;
    position: relative;

    &__image,
    &__video {
      border-radius: calc($borderRadius * 0.8);
      overflow: hidden;
    }

    &__container {
      display: flex;
      position: relative;
      height: 100%;
      width: auto;
      transition: all 0.4s ease;
    }

    &.not-scrolling {
      .images {
        &__left-scroll,
        &__right-scroll {
          display: none;
        }
      }
    }

    &__left-scroll,
    &__right-scroll {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      fill: rgb(var(--c_coral));
      z-index: 2;
      width: 3rem;
      height: 4rem;
      cursor: pointer;
      padding: 0.5rem;
      transition: all 0.4s ease;
      background-color: rgb(var(--c_main));

      --offset: -3rem;

      &:hover:not(.not-active) {
        transform: translateY(-50%) scale(1.1);
      }

      .not-active {
        cursor: default;
      }
    }

    &:hover {
      .images {
        &__left-scroll,
        &__right-scroll {
          &:not(.not-active) {
            --offset: 0rem;
          }
        }
      }
    }

    &__image-container {
      height: $imageSize;
      width: $imageSize;
      min-height: $imageSize;
      min-width: $imageSize;
      margin-right: 1rem;
      border-radius: var(--border-radius);
      background-color: rgb(var(--c_dark-main));
      transition: all 0.3s ease;
      overflow: hidden;
      cursor: pointer;
      padding: 1.5rem;

      img {
        pointer-events: none;
        user-select: none;
      }

      &.active {
        background-color: rgb(var(--c_light-main));
      }

      &.video {
        & > * {
          overflow: hidden;

          video {
            object-fit: cover !important;
            border-radius: var(--border-radius);
          }

          .component-video__play {
            border-radius: calc(var(--border-radius) - 0.15rem);
          }
        }
      }
    }

    &__left-scroll {
      left: calc(-0.1rem + var(--offset));
      border-radius: 0 $borderRadius $borderRadius 0;
      transform-origin: left center;
      svg {
        transform: rotate(90deg);
      }
    }
    &__right-scroll {
      right: calc(-0.1rem + var(--offset));
      border-radius: $borderRadius 0 0 $borderRadius;
      transform-origin: right center;
      svg {
        transform: rotate(-90deg);
      }
    }
  }
}

@media screen and (max-width: 1050px) {
  .product {
    width: 100%;

    .item {
      padding: 2rem;

      @media screen and (max-width: 750px) {
        grid-template: 1fr / 1fr;
      }

      $marginBottom: 1.5rem;
      .info {
        font-size: 1.2rem;

        & > * {
          margin-bottom: $marginBottom;
        }

        &__title {
          font-size: 1.4rem;
        }

        .colors {
          &__text {
            margin-right: 1rem;
          }

          &__choise {
            margin-top: 0.5rem;
          }

          &__color {
            width: 1.4rem;
            height: 1.4rem;
            padding: 0.2rem;
            margin-right: 0.5rem;
          }
        }
      }

      .buttons {
        display: grid;
        grid-template: 1fr / 1fr 1fr;
        gap: 1.5rem;

        & > * {
          height: 4rem;
        }

        .amount {
          margin-right: auto;
          grid-column: 1 / 3;

          &__minus,
          &__plus {
            padding: 0 0.8rem;
            font-size: 1.2rem;
          }

          &__input {
            width: 8rem;
            font-size: 1.3rem;
          }
        }

        .add,
        &__buy {
          height: 3.3rem;
          font-size: 1.1rem;
        }

        .add {
          margin-right: 0;
        }

        @media screen and (max-width: 750px) {
          .amount {
            width: 100%;
            &__minus,
            &__plus {
              padding: 0 1.8rem;
              font-size: 1.4rem;
            }

            &__input {
              flex: 1;
            }
          }
          .add,
          &__buy {
            grid-column: 1/3;
            height: 3.3rem;

            font-size: 1.2rem;
          }
        }
      }
    }

    .images {
      overflow-x: scroll;
      height: auto;
      padding-bottom: 0.5rem;

      scrollbar-width: thin;
      scrollbar-color: transparent transparent;

      /* Scrollbar style for Chrome/Edge/Safari */
      &::-webkit-scrollbar {
        height: 0.2rem;
        display: block;
      }

      &::-webkit-scrollbar-track {
        background-color: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgb(var(--c_dark-coral));
      }

      &__left-scroll,
      &__right-scroll {
        display: none;
      }
    }
  }
}
</style>