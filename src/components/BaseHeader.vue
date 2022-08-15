<template>
  <header class="header" id="header">
    <div class="wrapper">
      <div class="header__container" :class="{ active: menuActive }">
        <div class="header__logotype logotype">
          <div class="header__subcontainer">
            <RouterLink to="/">
              <img
                src="../assets/images/logotype_white.svg"
                alt="Logo"
                width="194"
                height="67"
                class="logotype__image"
              />
            </RouterLink>
          </div>
        </div>
        <nav class="header__nav nav">
          <div class="header__subcontainer">
            <div class="nav__items">
              <div class="nav__item">
                <RouterLink
                  to="/"
                  class="nav__link"
                  :class="{ ge: language === 'ge' }"
                >
                  {{ $t("header.main") }}
                </RouterLink>
              </div>
              <div class="nav__item nav__dropdown-item">
                <div
                  class="nav__link not-link"
                  :class="{ ge: language === 'ge' }"
                >
                  {{ $t("header.shop") }}
                </div>
                <div class="dropdown-target">
                  <div class="nav__dropdown dropdown">
                    <div class="dropdown__container">
                      <RouterLink
                        class="dropdown__item"
                        v-for="category in categories"
                        :key="category"
                        :to="{ path: '/shop', query: { category: category } }"
                      >
                        {{ changeStr(category, "_", " ") }}
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
              <div class="nav__item" :class="{ ge: language === 'ge' }">
                <RouterLink to="/craft" class="nav__link">
                  {{ $t("header.custom") }}</RouterLink
                >
              </div>
              <div class="nav__item" :class="{ ge: language === 'ge' }">
                <RouterLink to="/faq" class="nav__link">{{
                  $t("header.faq")
                }}</RouterLink>
              </div>
              <div class="nav__item" :class="{ ge: language === 'ge' }">
                <RouterLink
                  :to="{ path: '/faq', hash: '#contacts' }"
                  class="nav__link"
                >
                  {{ $t("header.contact") }}
                </RouterLink>
              </div>
            </div>
          </div>
        </nav>
        <div class="header__buttons buttons">
          <div class="header__subcontainer">
            <RouterLink to="/cart" class="buttons__cart-button cart-button">
              <IconCart class="buttons__icon" />
              <p class="buttons__name" :class="{ ge: language === 'ge' }">
                {{ $t("header.cart") }}
              </p>
              <p
                class="cart-button__amount"
                v-show="cartItemsAmount"
                ref="itemsAmount"
              >
                {{ cartItemsAmount }}
              </p>
            </RouterLink>
            <RouterLink to="/admin" class="buttons__sale-button">
              <IconSale class="buttons__icon" />
              <p class="buttons__name" :class="{ ge: language === 'ge' }">
                {{ $t("header.soon") }}
              </p>
            </RouterLink>
          </div>
        </div>
        <div class="header__languages languages">
          <div class="header__subcontainer">
            <div
              class="languages__language"
              v-for="lang in languages"
              :key="lang"
              :class="{ active: lang == language }"
              @click="changeLang(lang)"
            >
              {{ lang }}
            </div>
          </div>
        </div>
        <div class="header__close" @click="menuActiveToggle"></div>
      </div>
      <div class="header__adaptive-container">
        <div class="header__logotype logotype">
          <div class="header__subcontainer">
            <RouterLink to="/">
              <img
                src="../assets/images/logotype_white.svg"
                alt="Logo"
                width="194"
                height="67"
                class="logotype__image"
              />
            </RouterLink>
          </div>
        </div>
        <div class="header__buttons buttons">
          <div class="header__subcontainer">
            <RouterLink to="/cart" class="buttons__cart-button cart-button">
              <IconCart class="buttons__icon" />
              <p class="buttons__name" :class="{ ge: language === 'ge' }">
                {{ $t("header.cart") }}
              </p>
              <p
                class="cart-button__amount"
                v-show="cartItemsAmount"
                ref="itemsAmount"
              >
                {{ cartItemsAmount }}
              </p>
            </RouterLink>
            <RouterLink to="/admin" class="buttons__sale-button">
              <IconSale class="buttons__icon" />
              <p class="buttons__name" :class="{ ge: language === 'ge' }">
                {{ $t("header.soon") }}
              </p>
            </RouterLink>
          </div>
        </div>
        <div class="header__burger burger" @click="menuActiveToggle">
          <div class="burger__line"></div>
          <div class="burger__line"></div>
          <div class="burger__line"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import IconCart from "./additionalComponents/IconCart.vue";
import IconSale from "./additionalComponents/IconSale.vue";
import { mapState } from "vuex";
export default {
  name: "BaseHeader",
  components: {
    IconCart,
    IconSale,
  },
  inject: ["changeStr"],
  data() {
    return {
      cart: localStorage.cart,
      name: "cart",
      lang: "",
      menuActive: false,
    };
  },
  computed: {
    ...mapState(["language", "languages", "categories", "cartItemsAmount"]),
  },
  created() {},
  methods: {
    changeLang(lang) {
      if (this.language != lang) {
        this.$store.dispatch("changeLang", lang);
      }
    },
    changeFont(locale) {
      let body = document.body;
      body.classList.forEach((e) => body.classList.remove(e));
      body.classList.add(locale);
    },
    menuActiveToggle() {
      this.menuActive = !this.menuActive;
    },
  },
  mounted() {},
  watch: {
    cartItemsAmount() {
      if (this.cartItemsAmount > 0) {
        this.$refs.itemsAmount.classList.add("animated");
        setTimeout(() => {
          this.$refs.itemsAmount.classList.remove("animated");
        }, 1000);
      }
    },
    $route() {
      if (this.menuActive) {
        this.menuActiveToggle();
      }
    },
    menuActive() {
      document.body.style.overflow = this.menuActive ? "hidden" : "";
    },
    language() {
      this.changeFont(this.language);
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin hover-line {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -30%;
    width: 0;
    height: 0.2rem;
    transition: all 0.2s ease;
    background: var(--linear-gradient);
  }
  &:hover {
    &:after {
      width: 100%;
    }
  }
}
.header {
  background: transparent;
  padding: 5.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(var(--c_white));
  height: 15rem;
  z-index: 2;

  &__adaptive-container {
    display: none;
  }

  &__container {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    height: 100%;

    & > * {
      position: relative;
      display: flex;
      align-items: center;
      &:not(.languages, .header__close):after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 1px;
        height: 40%;
        background-color: var(--c_transparent-grey);
      }
    }
  }

  &__subcontainer {
    padding: 0 3.13rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    @media screen and (max-width: 1250px) and (min-width: 1050px) {
      padding: 0 1.5rem;
    }
  }

  .logotype {
    .header__subcontainer {
      padding-left: 0;
    }

    a {
      width: 100%;
      height: 100%;
    }

    &__image {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }

  .nav {
    flex: 6;

    &__items {
      display: flex;
      justify-content: space-around;
      width: 100%;
    }

    &__item {
      @include hover-line;
      text-transform: capitalize;
      font-family: "Montserrat Semibold";
    }

    &__link {
      font-size: 1.1rem;

      &.not-link {
        cursor: default;
      }
    }

    .dropdown-target {
      height: 0;
      position: absolute;
      top: 100%;
      width: auto;
      left: 0;
      overflow: hidden;
      transition: all 0.2s ease;
      opacity: 0;
    }

    &__dropdown-item {
      &:after {
        display: none;
      }
    }

    &__dropdown-item:hover .dropdown-target,
    .dropdown-target:hover {
      height: auto;
      padding-top: 0.5rem;
      opacity: 1;
    }

    .dropdown {
      &__container {
        display: flex;
        flex-direction: column;
      }

      &__item {
        font-size: 0.95rem;
        color: var(--c_transparent-grey);
        transition: all 0.2s ease;
        cursor: pointer;
        margin-bottom: 0.3rem;
        white-space: nowrap;

        &:hover {
          color: rgb(var(--c_white));
        }
      }
    }
  }

  .buttons {
    display: flex;
    flex: 2;

    .cart-button {
      margin-right: 2rem;
      position: relative;

      &__amount {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -10%;
        right: -10%;
        padding: 0.25rem;
        aspect-ratio: 1 / 1;
        background-color: rgb(var(--c_coral));
        border-radius: 50%;
        min-height: 0.8rem;
        min-width: 0.8rem;
        font: {
          family: "Montserrat Bold";
          size: 0.6rem;
        }
        color: rgb(var(--c_main));

        &.animated {
          animation: bounce 1s ease-in-out 0s 1;
        }
      }
    }

    .cart-button,
    &__sale-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-transform: capitalize;
      &:hover {
        .buttons__icon {
          transform: scale(1.1);
        }
      }
    }

    &__icon {
      width: 1.88rem;
      height: 1.88rem;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
      fill: rgb(var(--c_white));
    }

    &__name {
      font-family: "Montserrat Semibold";
    }
  }

  .languages {
    display: flex;
    flex: 2;
    &__language {
      cursor: pointer;
      text-transform: uppercase;
      color: rgb(var(--c_desaturated-graylish-blue));
      transition: all 0.3s ease;
      font-family: "Montserrat Bold";

      @include hover-line;

      &:not(:last-child) {
        margin-right: 1.5rem;
      }

      &.active {
        color: rgb(var(--c_white));
        cursor: default;
        &:after {
          display: none;
        }
      }
    }

    .header__subcontainer {
      padding-right: 0;
    }
  }
}

@media screen and (max-width: 1050px) {
  .header {
    z-index: 998;
    padding: 2rem 0;
    height: 10rem;

    &__adaptive-container {
      display: flex;
      align-items: stretch;
      justify-content: stretch;
      height: 100%;

      & > * {
        & > div {
          padding: 0 1.5rem;
        }
      }

      .buttons {
        .cart-button {
          margin-right: 1.5rem;
          &__amount {
          }
        }

        .cart-button,
        &__sale-button {
        }

        &__icon {
          width: 1.5rem;
          height: 1.5rem;
        }

        &__name {
        }
      }
    }

    &__close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 3rem !important;
      height: 3rem !important;
      cursor: pointer;

      &::before,
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 0.2rem;
        background-color: rgb(var(--c_grey));
      }

      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }

    &__container {
      position: fixed;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgb(var(--c_main));
      flex-direction: column;
      align-items: center;
      padding: 3rem;
      opacity: 0;
      visibility: hidden;
      top: -5rem;
      z-index: 2;
      transition: all 0.5s ease;

      & > * {
        width: 60%;

        & > div {
          padding: 0;
        }

        &:not(:last-child):after {
          display: none;
        }
      }

      &.active {
        opacity: 1;
        visibility: visible;
        top: 0;
      }
    }

    .nav {
      &__items {
        flex: 1;
        flex-direction: column;
        align-items: center;
      }

      &__item {
        text-align: center;

        &:not(:last-child) {
          margin-bottom: 2.2rem;
          @media screen and (max-width: 750px) {
            margin-bottom: 1.5rem;
          }
        }
      }

      &__link {
        font-size: 1.9rem;
        @media screen and (max-width: 750px) {
          font-size: 1.1rem;
        }
      }

      .dropdown-target {
        top: 0;
        width: auto;
        left: 100%;
        padding: 0 !important;
      }

      &__dropdown-item {
        min-width: 60%;
      }

      .dropdown {
        &__container {
          display: flex;
          flex-direction: column;
        }

        &__item {
          font-size: 1.7rem;
          &:hover {
            color: rgb(var(--c_white));
          }

          @media screen and (max-width: 750px) {
            font-size: 1.2rem;
          }
        }
      }
    }

    .logotype {
      .header__subcontainer {
        padding: 0;
      }
    }

    .buttons {
      .header__subcontainer {
        padding: 0 2rem;
      }
    }

    &__container {
      .logotype {
        margin-bottom: 2rem;
      }
      .buttons {
        display: flex;
        flex: 2;

        .cart-button {
          margin-right: 2rem;
          position: relative;

          &__amount {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -10%;
            right: -10%;
            padding: 0.25rem;
            aspect-ratio: 1 / 1;
            background-color: rgb(var(--c_coral));
            border-radius: 50%;
            min-height: 0.8rem;
            min-width: 0.8rem;
            font: {
              family: "Montserrat Bold";
              size: 0.6rem;
            }
            color: rgb(var(--c_main));

            &.animated {
              animation: bounce 1s ease-in-out 0s 1;
            }
          }
        }

        .cart-button,
        &__sale-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          &:hover {
            .buttons__icon {
              transform: scale(1.1);
            }
          }
        }

        &__icon {
          width: 1.88rem;
          height: 1.88rem;
          margin-bottom: 0.5rem;
          transition: all 0.3s ease;
          fill: rgb(var(--c_white));
        }

        &__name {
          font-family: "Montserrat Semibold";
        }
      }
    }

    .burger {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.5rem;

      &__line {
        height: 0.2rem;
        width: 100%;
        background-color: rgb(var(--c_white));
        margin-bottom: 0.5rem;
      }
    }
  }
}

@media screen and (max-width: 1050px) and (min-width: 750px) {
  .header {
    .buttons {
      .cart-button {
        &__amount {
          padding: 0.3rem;
          min-height: 0.9rem;
          min-width: 0.9rem;
          font: {
            size: 0.8rem;
          }
        }
      }

      &__icon {
        width: 2.1rem;
        height: 2.1rem;
      }

      &__name {
        font-size: 1.2rem;
      }
    }
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-50%);
  }
  60% {
    transform: translateY(-25%);
  }
}
</style>