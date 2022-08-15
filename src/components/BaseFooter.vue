<template>
  <footer class="footer">
    <div class="footer__main-container">
      <div class="wrapper">
        <div class="footer__container">
          <div class="footer__shopping-and-returns">
            <p class="footer__subtitle" :class="{ ge: language === 'ge' }">
              {{ $t("footer.shipping-and-returns.title") }}
            </p>
            <ul class="footer__list">
              <li class="footer__list-item" :class="{ ge: language === 'ge' }">
                <RouterLink to="#">
                  {{ $t("footer.shipping-and-returns.policy") }}</RouterLink
                >
              </li>
              <li class="footer__list-item" :class="{ ge: language === 'ge' }">
                <RouterLink to="#">
                  {{ $t("footer.shipping-and-returns.payment") }}</RouterLink
                >
              </li>
              <li class="footer__list-item" :class="{ ge: language === 'ge' }">
                <RouterLink to="#">
                  {{ $t("footer.shipping-and-returns.safety") }}</RouterLink
                >
              </li>
            </ul>
          </div>
          <div class="footer__fast-links">
            <p class="footer__subtitle" :class="{ ge: language === 'ge' }">
              {{ $t("footer.fast-links.title") }}
            </p>
            <ul class="footer__list">
              <li class="footer__list-item" :class="{ ge: language === 'ge' }">
                <RouterLink to="/">{{
                  $t("footer.fast-links.main")
                }}</RouterLink>
              </li>
              <li class="footer__list-item" :class="{ ge: language === 'ge' }">
                <RouterLink :to="{ path: '/faq', hash: '#contacts' }">{{
                  $t("footer.fast-links.contacts")
                }}</RouterLink>
              </li>
              <li class="footer__list-item" :class="{ ge: language === 'ge' }">
                <RouterLink to="/cart">{{
                  $t("footer.fast-links.cart")
                }}</RouterLink>
              </li>
              <li class="footer__list-item" :class="{ ge: language === 'ge' }">
                <RouterLink to="/craft">{{
                  $t("footer.fast-links.craft_wallet")
                }}</RouterLink>
              </li>
            </ul>
          </div>
          <div class="footer__contacts-and-information">
            <p class="footer__subtitle" :class="{ ge: language === 'ge' }">
              {{ $t("footer.contact-information.title") }}
            </p>
            <ul class="footer__list">
              <li class="footer__list-item list-item">
                <a :href="phoneNumber.href">
                  <span class="list-item__icon"><IconPhone /></span>
                  <span class="list-item__text">{{ phoneNumber.text }}</span>
                </a>
              </li>
              <li class="footer__list-item list-item">
                <a :href="email.href">
                  <span class="list-item__icon"><IconAtSign /></span>
                  <span class="list-item__text">{{ email.text }}</span>
                </a>
              </li>
              <li class="footer__list-item list-item">
                <a :href="facebook.href">
                  <span class="list-item__icon"><IconFacebook /></span>
                  <span class="list-item__text">{{ facebook.text }}</span>
                </a>
              </li>
              <li class="footer__list-item list-item">
                <a :href="instagram.href">
                  <span class="list-item__icon"> <IconInstagram /> </span>
                  <span class="list-item__text">{{ instagram.text }}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="footer__flex-fill flex-fill"></div>
          <div class="footer__go-up go-up" @click="scrollUp">
            <div class="go-up__icon">
              <IconUp />
            </div>
            <div class="go-up__text" :class="{ ge: language === 'ge' }">
              {{ $t("footer.go_up") }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__last-container">
      <div class="wrapper">
        <div class="footer__container">
          <div class="footer__rights" :class="{ ge: language === 'ge' }">
            {{ $t("footer.down-line.rights") }} /
            {{ $t("footer.down-line.history") }} {{ nowYear }}
          </div>
          <div class="footer__year">
            <span :class="{ ge: language === 'ge' }">{{
              $t("footer.down-line.powered")
            }}</span>
            HYPE PROJECT
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import IconAtSign from "./additionalComponents/IconAtSign.vue";
import IconFacebook from "./additionalComponents/IconFacebook.vue";
import IconInstagram from "./additionalComponents/IconInstagram.vue";
import IconPhone from "./additionalComponents/IconPhone.vue";
import IconUp from "./additionalComponents/IconUp.vue";
import { mapState } from "vuex";
export default {
  name: "BaseFooter",
  components: {
    IconAtSign,
    IconFacebook,
    IconInstagram,
    IconPhone,
    IconUp,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      "language",
      "phoneNumber",
      "email",
      "facebook",
      "instagram",
      "startYear",
    ]),
    nowYear() {
      let date = new Date(),
        year = date.getFullYear();
      return year;
    },
  },
  methods: {
    yearUpdate() {
      let date = new Date(),
        year = date.getFullYear;
      if (this.startYear > year) {
        this.nowYear = "-" + year;
      }
    },
    scrollUp() {
      document.querySelector(".header").scrollIntoView({
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.yearUpdate();
  },
};
</script>

<style lang="scss" scoped>
.ge {
  .footer {
    .go-up {
      &__text {
      }
    }
  }
}
.footer {
  width: 100%;
  z-index: 2;

  &__main-container,
  &__last-container {
    width: 100%;
  }

  &__main-container {
    background-color: rgb(var(--c_light-main));
    padding: 4rem 0;
    font-family: "Montserrat Medium";
  }

  &__last-container {
    background-color: transparent;
    padding: 1rem 0;

    .footer__container {
      justify-content: space-between;
    }
  }

  &__container {
    display: flex;
  }

  &__shopping-and-returns,
  &__fast-links,
  &__contacts-and-information {
    margin-right: 6rem;
  }

  &__subtitle {
    margin-bottom: 2rem;
  }

  &__list {
    list-style: none;
    color: rgb(var(--c_grey));
  }

  &__list-item {
    font-size: 0.95rem;
    position: relative;
    &:not(:last-child) {
      margin-bottom: 0.8rem;
    }

    a {
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: rgb(var(--c_desaturated-graylish-blue));
      }
    }
  }

  $iconWidth: 1rem;

  .list-item {
    &__icon {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: $iconWidth;
      height: $iconWidth;
      fill: rgb(var(--c_light-pink));
      svg {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }

    &__text {
      margin-left: calc($iconWidth + 0.5rem);
    }
  }

  .go-up {
    display: flex;
    flex-direction: column;
    justify-content: center;
    fill: rgb(var(--c_dark-grey));
    color: rgb(var(--c_dark-grey));
    transition: all 0.3s ease;
    cursor: pointer;
    &__icon {
      width: 6.25rem;
      height: 6.25rem;
      margin-bottom: 1rem;

      svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__text {
      text-align: center;
      text-transform: uppercase;
      font-family: "Montserrat Bold";
    }

    &:hover {
      color: rgb(var(--c_grey));
      fill: rgb(var(--c_grey));
    }
  }

  &__rights {
    font-family: "Montserrat Regular";
    color: var(--c_transparent-grey);
  }

  &__year {
    color: rgb(var(--c_grey));
    font: {
      family: "Montserrat Medium";
      weight: bold;
    }

    text-transform: uppercase;
  }
}

@media screen and (max-width: 1050px) {
  .footer {
    &__shopping-and-returns,
    &__fast-links,
    &__contacts-and-information {
      margin-right: 3rem;
    }
  }
}

@media screen and (max-width: 750px) {
  .footer {
    &__main-container {
      .footer__container {
        display: grid;
        grid-template: 1fr / 1fr 1fr;
        gap: 2rem;
      }
    }
    &__last-container {
      .footer__container {
        display: grid;
        grid-template: 1fr / 1fr;
        gap: 2rem;
        text-align: center;
      }
    }

    &__contacts-and-information,
    .go-up {
      grid-column: 1/3;
    }

    .go-up {
      align-items: center;
    }

    &__shopping-and-returns,
    &__fast-links,
    &__contacts-and-information {
      margin-right: 0;
    }
  }
}
</style>