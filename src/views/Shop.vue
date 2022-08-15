<template>
  <div class="shop" id="shop">
    <div class="wrapper">
      <div class="shop__container">
        <BaseSlider class="shop__slider" />
        <div class="shop__categories categories">
          <div class="categories__category category">
            <div class="category__title title">
              <p class="title__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("shop.titles.category") }}
              </p>
              <p class="title__title">{{ changeStr(category, "_", " ") }}</p>
            </div>
            <div class="category__container">
              <ShopTile
                v-for="product in categoryProducts"
                :key="product.id"
                :product="product"
                :category="category"
                class="category__item"
              />
            </div>
          </div>
        </div>

        <BaseBanners class="shop__banners" />

        <div
          class="shop__popular popular"
          v-if="Object.keys(popularCategoryProducts).length"
        >
          <div class="popular__pop pop">
            <div class="pop__title title">
              <p class="title__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("shop.titles.most_popular") }}
              </p>
              <p class="title__title">
                <span :class="{ ge: language === 'ge' }">{{
                  $t("shop.titles.in")
                }}</span>
                {{ changeStr(category, "_", " ") }}
              </p>
            </div>
            <div class="pop__container">
              <ShopTile
                v-for="product in popularCategoryProducts"
                :key="product.id"
                :product="product"
                :category="category"
                class="pop__item"
              />
            </div>
          </div>
        </div>
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
  name: "Shop",
  components: {
    ShopTile,
    BaseImage,
    BaseSlider,
    BaseBanners,
  },
  inject: ["changeStr"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["language", "products", "categories", "popularProducts"]),
    category() {
      return this.$route.query.category
        ? this.$route.query.category
        : "watches";
    },
    categoryProducts() {
      return this.products[this.category];
    },
    popularCategoryProducts() {
      return this.popularProducts[this.category] || [];
    },
  },
  methods: {
    changeTitle(in_what, what, to_what) {
      return in_what.replace(new RegExp(`${what}`, "g"), to_what);
    },
  },
  async mounted() {},
};
</script>

<style lang="scss" scoped>
$linkIconFill: rgb(var(--c_white));

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

  .banners {
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    gap: 1rem;
    height: 20rem;
    margin-bottom: 4rem;

    .banner {
      height: 100%;
      border-radius: var(--border-radius);
      padding: 2.5rem 0.5rem 2.5rem 4rem;
      overflow: hidden;
      cursor: pointer;

      &:hover {
        .text {
          .link {
            opacity: 1;
            .link__icon {
              transform: translateX(20%);
            }
          }
        }
      }

      &__container {
        position: relative;
        width: 100%;
        height: 100%;
        display: grid;
        grid-template: 1fr / 1fr 1fr;
      }

      &:first-child {
        background-color: rgb(var(--c_dark-coral));
        position: relative;
        z-index: 1;

        &:after,
        &:before {
          content: "";
          position: absolute;
          border-radius: 50%;
          background-color: rgb(var(--c_coral));
          transform: translate(-50%, -50%);
          z-index: -1;
        }

        &:after {
          top: 10%;
          left: 5%;
          width: 15rem;
          height: 15rem;
        }

        &:before {
          top: 90%;
          left: 90%;
          width: 11rem;
          height: 11rem;
        }
      }
      &:last-child {
        background-color: rgb(var(--c_pink));
      }

      .text {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 0;

        &__subtitle {
          opacity: 0.6;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        &__title {
          font: {
            family: "Montserrat Bold";
            size: 1.7rem;
          }
        }

        .link {
          display: flex;
          align-items: center;
          opacity: 0.6;
          transition: all 0.3s ease;
          &__icon {
            display: flex;
            align-items: center;
            width: 3rem;
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
            color: $linkIconFill;
            margin-right: 2rem;
          }
        }
      }

      &__image {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      @media screen and (max-width: 1250px) {
        height: 30rem;

        .text {
          &__subtitle {
            font-size: 2rem;
          }

          &__title {
            font-size: 3rem;
          }

          .link {
            &__icon {
              width: 5rem;
              &::after {
                font-size: 1.3rem;
              }
            }
            &__text {
              font-size: 1.7rem;
            }
          }
        }
      }
      @media screen and (max-width: 1050px) {
        height: 30rem;

        .text {
          &__subtitle {
            font-size: 1.7rem;
          }

          &__title {
            font-size: 2.5rem;
          }

          .link {
            &__icon {
              width: 4rem;
              &::after {
                font-size: 1.3rem;
              }
            }
            &__text {
              font-size: 1.5rem;
            }
          }
        }
        &__image {
          position: relative;
          right: unset;
          top: unset;
          transform: unset;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
      }
      @media screen and (max-width: 750px) {
        height: auto;
        padding: 1.3rem 2.5rem;

        &__container {
          grid-template-columns: 1fr;
        }

        .text {
          &__subtitle {
            font-size: 1.3rem;
          }

          &__title {
            font-size: 2rem;
            margin-bottom: 1.5rem;
          }

          .link {
            margin-bottom: 1rem;
            &__icon {
              width: 3rem;
              &::after {
                font-size: 1rem;
              }
            }
            &__text {
              font-size: 1.2rem;
            }
          }
        }
      }
    }

    @media screen and (max-width: 1250px) {
      grid-template: 1fr / 1fr;
      height: auto;
    }
  }

  .popular {
    margin-bottom: 3rem;
    .title {
      text-transform: capitalize;
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
