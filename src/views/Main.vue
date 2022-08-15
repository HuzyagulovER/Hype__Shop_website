<template>
  <div class="shop" id="shop">
    <div class="wrapper">
      <div class="shop__container">
        <BaseSlider class="shop__slider" />
        <div class="shop__categories categories">
          <div
            class="categories__category category"
            v-for="(category, i) in mainCategories"
            :key="category"
          >
            <div class="category__title title">
              <p class="title__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("shop.titles.category") }}
              </p>
              <p class="title__title">{{ changeStr(category, "_", " ") }}</p>
            </div>
            <div class="category__wrapper" :ref="`categoryContainer_${i}`">
              <div class="category__container">
                <ShopTile
                  v-for="(product, i) in categoryProducts[category]"
                  :key="product.id"
                  :product="product"
                  :category="category"
                  class="category__item"
                  :ref="i == 0 ? 'shopTile' : ''"
                />
              </div>
            </div>
          </div>
        </div>
        <BaseBanners class="shop__banners" />
        <div class="shop__placeholder placeholder">
          <BaseImage
            src="./images/logotype_white_2.svg"
            :width="451"
            :height="383"
            class="placeholder__image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ShopTile from "../components/ShopTile.vue";
import BaseImage from "../components/BaseImage.vue";
import BaseSlider from "../components/BaseSlider.vue";
import BaseBanners from "../components/BaseBanners.vue";
export default {
  name: "Main",
  components: {
    ShopTile,
    BaseImage,
    BaseSlider,
    BaseBanners,
  },
  inject: ["changeStr"],
  data() {
    return {
      containerStyle: {},
    };
  },
  computed: {
    ...mapState(["language", "products", "mainCategories", "categories"]),
    category() {
      return this.$route.query.category
        ? this.$route.query.category
        : "watches";
    },
    categoryProducts() {
      let products = {};
      this.mainCategories.forEach((p) => {
        products[p] = this.products[p];
      });
      return products;
    },
  },
  methods: {
    changeTitle(in_what, what, to_what) {
      return in_what.replace(new RegExp(`${what}`, "g"), to_what);
    },
    categoryContainerHeight() {
      try {
        let g,
          mxh,
          rem = parseFloat(
            window.getComputedStyle(document.querySelector("html")).fontSize
          );

        for (const key in this.$refs) {
          if (key.includes("categoryContainer_")) {
            let cont = this.$refs[key];
            g = parseFloat(
              window.getComputedStyle(
                cont.querySelector(".category__container")
              ).gap
            );
            mxh = parseFloat(
              window.getComputedStyle(cont.querySelector(".shop-tile")).height
            );
            cont.style.maxHeight = 2 * mxh + 2 * g - rem + "px";
          }
        }
      } catch (error) {
        setTimeout(() => {
          this.categoryContainerHeight();
        }, 50);
      }
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.categoryContainerHeight();
    });
    //  this.$nextTick(() => {
    this.categoryContainerHeight();
    //  });
  },
  watch: {
    products() {
      if (Object.keys(this.products).length) {
        this.categoryContainerHeight();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.shop {
  width: 100%;
  padding-top: 1rem;

  &__slider {
    margin-bottom: 3rem;
  }

  .categories {
    margin-bottom: 3rem;
    .title {
      text-transform: capitalize;
      position: relative;
      display: inline-block;
      margin-bottom: 3rem;

      &__subtitle {
        color: rgb(var(--c_grey));
        font: {
          family: "Montserrat Bold";
          size: 0.89rem;
        }
      }

      &__title {
        font: {
          family: "Montserrat Semibold";
          size: 1.3rem;
        }
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 120%;
        transform: translateY(-50%);
        width: 15rem;
        height: 0.05rem;
        background-color: rgb(var(--c_grey));
        opacity: 0.2;
      }
    }

    .category {
      margin-bottom: 3rem;

      &__wrapper {
        overflow: scroll;
        padding: 1rem;
        width: calc(100% + 2rem);
        margin-left: -1rem;

        /* Scrollbar style for Firefox */
        scrollbar-width: thin !important;
        scrollbar-color: rgb(var(--c_coral)) transparent;

        &::-moz-scrollbar-button,
        ::-webkit-scrollbar-button {
          width: 0;
        }

        &::-moz-scrollbar-thumb {
          border-radius: 0.15rem;
        }

        /* Scrollbar style for Chrome/Edge/Safari */
        &::-webkit-scrollbar {
          width: 0.3rem;
          display: block;
        }

        &::-webkit-scrollbar-thumb {
          background-color: rgb(var(--c_coral));
          border-radius: 0.15rem;
        }
      }
      &__container {
        display: grid;
        grid-template: 1fr / repeat(4, 1fr);
        gap: 1.5rem;
        margin-top: -0.5rem;

        @media screen and (max-width: 1250px) {
          grid-template: 1fr / repeat(3, 1fr);
        }
        @media screen and (max-width: 1050px) {
          grid-template: 1fr / repeat(2, 1fr);
        }
        @media screen and (max-width: 750px) {
          grid-template: 1fr / repeat(1, 1fr);
        }
      }
      &__item {
      }
    }
  }

  .popular {
    margin-bottom: 3rem;
    .title {
      position: relative;
      display: inline-block;
      margin-bottom: 3rem;

      &__subtitle {
        color: rgb(var(--c_grey));
        text-transform: capitalize;
        font: {
          family: "Montserrat Bold";
          size: 0.89rem;
        }
      }

      &__title {
        font: {
          family: "Montserrat Semibold";
          size: 1.3rem;
        }
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 120%;
        transform: translateY(-50%);
        width: 15rem;
        height: 0.05rem;
        background-color: rgb(var(--c_grey));
        opacity: 0.2;
      }
    }

    .pop {
      &__container {
        display: grid;
        grid-template: 1fr / repeat(4, 1fr);
        gap: 1.5rem;

        @media screen and (max-width: 1250px) {
          grid-template: 1fr / repeat(3, 1fr);
        }
        @media screen and (max-width: 1050px) {
          grid-template: 1fr / repeat(2, 1fr);
        }
        @media screen and (max-width: 750px) {
          grid-template: 1fr / repeat(1, 1fr);
        }
      }
      &__item {
      }
    }
  }

  .placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 23rem;
    width: 100%;
    background-color: rgb(var(--c_dark-main));
    padding: 2rem;
    border-radius: var(--border-radius);
    &__image {
      height: 100%;
      width: auto;
      object-fit: contain;
    }
  }
}
</style>
