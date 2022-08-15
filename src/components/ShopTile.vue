<template>
  <div
    class="shop-tile"
    :data-category="category"
    :data-id="product.id"
    @click="moreDetails($event)"
    ref="shopTile"
  >
    <div class="shop-tile__container">
      <p class="shop-tile__category">{{ category }}</p>
      <div class="shop-tile__image">
        <BaseImage
          :src="
            base +
            '/product_images/' +
            category +
            '/' +
            changeStr(product.name, [' ', '#'], ['_', '%23']) +
            '/1.png'
          "
          :alt="product.name"
          :width="250"
          :height="250"
          :heightInherit="true"
          :class="{ hoverNotAvailable: !product.double_image }"
        />
        <BaseImage
          :src="
            base +
            '/product_images/' +
            category +
            '/' +
            changeStr(product.name, [' ', '#'], ['_', '%23']) +
            '/' +
            product.double_image +
            '.png'
          "
          :alt="product.name"
          :width="250"
          :height="250"
          v-if="product.double_image"
        />
      </div>
      <p class="shop-tile__description">
        {{ changeStr(product.name, "_", " ") }}
      </p>
      <div class="shop-tile__divider"></div>
      <div class="shop-tile__wrapper">
        <div class="shop-tile__info info">
          <p class="info__price">{{ changePrice(product.price) }} GEL</p>
          <p class="info__more" :class="{ ge: language === 'ge' }">
            {{ $t("shop.tile.more-details") }}
          </p>
        </div>
        <div
          class="shop-tile__button button"
          @click="addToCart"
          :class="{ added: added }"
        >
          <IconToCartButtonBackground class="button__background">
            <template #innerIcon>
              <IconToCart class="button__cart" />
              <IconTick class="button__tick" />
            </template>
          </IconToCartButtonBackground>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseImage from "../components/BaseImage.vue";
import IconToCartButtonBackground from "../components/additionalComponents/IconToCartButtonBackground.vue";
import IconToCart from "../components/additionalComponents/IconToCart.vue";
import IconTick from "../components/additionalComponents/IconTick.vue";

export default {
  name: "ShopTile",
  components: {
    BaseImage,
    IconToCartButtonBackground,
    IconToCart,
    IconTick,
  },
  props: {
    product: Object,
    category: String,
  },
  inject: ["changeStr"],
  data() {
    return {
      added: false,
    };
  },
  computed: {
    ...mapState(["language", "cart", "base"]),
  },
  methods: {
    moreDetails(e) {
      if (!e.target.closest(".button")) {
        this.$router.push({
          name: "Item",
          params: { category: this.category, id: this.product.id },
        });
      }
    },
    changePrice(price) {
      let output = +price;
      if (output % 1 == 0) {
        output += ".00";
      } else {
        output = output.toFixed(2);
      }
      return output;
    },
    addToCart() {
      let productObject = {
        category: this.category,
        id: this.product.id,
        color: Object.keys(this.product.colors)[0],
        amount: 1,
        name: this.product.name,
      };
      this.$store.commit("ADD_TO_CART", productObject);
      this.added = true;
      setTimeout(() => {
        this.added = false;
      }, 1500);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.shop-tile {
  height: auto;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  background-color: rgb(var(--c_light-main));
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    background-color: rgb(var(--c_dark-grey));
  }

  &__container {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__category {
    position: absolute;
    top: 0;
    left: 0;
    text-transform: capitalize;
    color: var(--c_transparent-grey);
    font: {
      family: "Montserrat Semibold";
      size: 0.9rem;
    }
  }

  &:hover {
    .shop-tile__image {
      & > div:not(.hoverNotAvailable) {
        opacity: 0;
        &:last-child {
          opacity: 1;
        }
      }
    }
  }

  &__image {
    flex: 1;
    width: 100%;
    text-align: center;
    margin-bottom: 0.5rem;
    display: grid;
    grid-template: 1fr / 1fr;

    & > div {
      grid-column: 1/2;
      grid-row: 1/2;
      transition: all 0.3s ease;

      img {
        height: auto;
      }

      &:not(.hoverNotAvailable):last-child {
        opacity: 0;
      }
    }
  }

  &__description {
    color: rgb(var(--c_desaturated-graylish-blue));
    font-size: 0.95rem;
  }

  &__divider {
    width: 20%;
    margin: 1.3rem 0;
    height: 0.15rem;
    background: var(--linear-gradient);
  }

  &__wrapper {
    display: flex;
    align-items: center;
  }

  .info {
    flex: 3;
    &__price {
      font: {
        family: "Montserrat Bold";
        size: 1.2rem;
      }
    }

    &__more {
      color: rgb(var(--c_light-pink));
      cursor: pointer;
      font: {
        family: "Montserrat Semibold";
        size: 0.8rem;
      }

      &.ge {
        font-size: 0.6rem;
      }

      &:hover {
        color: rgb(var(--c_graylish-blue));
      }
    }
  }

  .button {
    flex: 2;
    position: relative;

    &__background {
      position: relative;
      fill: rgb(var(--c_dark-coral));
      z-index: 1;
      transition: all 0.5s ease, transform 0.2s ease;
      cursor: pointer;
      transition: all 0.3s ease;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 10%;
        z-index: -1;
        border-radius: 20%;
        box-shadow: 0 0 1rem 0rem rgb(var(--c_pink));
        transition: box-shadow 0.5s ease;
      }
      &:hover {
        fill: rgb(var(--c_desaturated-graylish-blue));
      }
      &:hover::before {
        box-shadow: 0 0 1rem 0.7rem rgb(var(--c_desaturated-graylish-blue));
        transition: box-shadow 0.25s ease;
      }

      &:active {
        transform: scale(0.96);
      }
    }

    &__cart,
    &__tick {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 55%;
      width: auto;
      pointer-events: none;
      z-index: 3;
      transition: all 0.3s ease;
      transform: translate(-50%, -50%);
    }

    &__cart {
      fill: rgb(var(--c_white));
    }

    &__tick {
      stroke: rgb(var(--c_white));
      opacity: 0;
    }

    &.added {
      .button {
        &__background {
          fill: rgb(0, 184, 0) !important;
          &::before {
            box-shadow: 0 0 1rem 0.7rem rgb(0, 184, 0);
          }
        }
        &__cart {
          opacity: 0;
        }
        &__tick {
          opacity: 1;
        }
      }
    }
  }
}
</style>