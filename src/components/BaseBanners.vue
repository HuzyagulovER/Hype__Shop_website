<template>
  <div class="banners">
    <RouterLink to="/craft" class="banners__banner banner">
      <div class="banner__container">
        <div class="banner__text text">
          <p class="text__subtitle" :class="{ ge: language === 'ge' }">
            {{ $t("shop.banners.banner_1.subtitle") }}
          </p>
          <p class="text__title" :class="{ ge: language === 'ge' }">
            {{ $t("shop.banners.banner_1.title") }}
          </p>
          <div class="text__flex-fill flex-fill"></div>
          <div class="text__link link">
            <p class="link__text" :class="{ ge: language === 'ge' }">
              {{ $t("shop.banners.banner_1.link") }}
            </p>
            <div class="link__icon"><IconLink /></div>
          </div>
        </div>
        <div class="banner__image">
          <BaseImage :src="'./images/wallets.png'" />
        </div>
      </div>
    </RouterLink>
    <RouterLink
      :to="{ path: '/shop', query: { category: 'wallets' } }"
      class="banners__banner banner"
    >
      <div class="banner__container">
        <div class="banner__text text">
          <p class="text__subtitle" :class="{ ge: language === 'ge' }">
            {{ $t("shop.banners.banner_2.subtitle") }}
          </p>
          <p class="text__title" :class="{ ge: language === 'ge' }">
            {{ $t("shop.banners.banner_2.title") }}
          </p>
          <div class="text__flex-fill flex-fill"></div>
          <div class="text__link link">
            <p class="link__text" :class="{ ge: language === 'ge' }">
              {{ $t("shop.banners.banner_2.link") }}
            </p>
            <div class="link__icon"><IconLink /></div>
          </div>
        </div>
        <div class="banner__image">
          <BaseImage :src="'./images/wallets2.png'" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseImage from "../components/BaseImage.vue";
import IconLink from "../components/additionalComponents/IconLink.vue";
export default {
  name: "Banners",
  components: {
    IconLink,
    BaseImage,
  },
  computed: {
    ...mapState(["language"]),
  },
};
</script>

<style lang="scss" scoped>
$linkIconFill: rgb(var(--c_white));
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
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15rem;

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

      &__image {
        height: 25rem;
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

        .component-img {
          width: auto;
        }
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

      &__image {
        display: flex;
        justify-content: center;
        height: auto;
        .component-img {
          width: 70%;
        }
      }
    }
  }

  @media screen and (max-width: 1250px) {
    grid-template: 1fr / 1fr;
    height: auto;
  }
}
</style>