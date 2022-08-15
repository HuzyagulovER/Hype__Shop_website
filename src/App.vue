<template>
  <BaseHeader />
  <main class="main">
    <router-view />
  </main>
  <BaseFooter />
  <Transition name="preloader">
    <BasePreloader v-if="$store.getters.getPreloaderState" />
  </Transition>
  <BaseBackgroundCircles />
</template>

<script>
import BaseBackgroundCircles from "./components/BaseBackgroundCircles.vue";
import BasePreloader from "./components/BasePreloader.vue";
import BaseHeader from "./components/BaseHeader.vue";
import BaseFooter from "./components/BaseFooter.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    BaseHeader,
    BaseFooter,
    BasePreloader,
    BaseBackgroundCircles,
  },
  provide: {
    changePrice(price) {
      let output = +price;
      if (output % 1 == 0) {
        output += ".00";
      } else {
        output = output.toFixed(2);
      }
      return output;
    },
    changeStr(in_what, what, to_what) {
      let str = in_what;
      if (what.length !== to_what.length) {
        return new Error("Lengths of the arrays are not equal!");
      }
      if (typeof what !== typeof to_what) {
        return new Error("Types of parameters should be the same!");
      }
      if (Array.isArray(what) && Array.isArray(to_what)) {
        for (let i = 0; i < what.length; i++) {
          str = str.replace(new RegExp(`${what[i]}`, "g"), to_what[i]);
        }
      } else if (typeof what === "string" && typeof to_what === "string") {
        str = str.replace(new RegExp(`${what}`, "g"), to_what);
      }

      return str;
    },
  },
  data() {
    return {
      admin: "",
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
  computed: {
    ...mapState(["cart", "language", "imagesListLoaded", "productsLoaded"]),
    preloaderTime() {
      return this.imagesListLoaded ? 1000 : 5000;
    },
  },
  methods: {
    preloaderKill() {
      setTimeout(() => {
        this.$store.commit("TOGGLE_PRELOADER_STATE", false);
      }, this.preloaderTime);
    },
  },
  async created() {
    if (this.$router.options.history.base == "/site") {
      this.$store.commit("SET_BASE", "");
    } else {
      this.$store.commit("SET_BASE", this.$router.options.history.base);
    }

    this.$store.dispatch("isMobile");
    await this.$store.dispatch("loadImagesList");
    await this.$store.dispatch("loadSlides");
    await this.$store.dispatch("loadCategoriesSettings");
    await this.$store.dispatch("loadCategories");
    await this.$store.dispatch("checkIP");
    await this.$store.dispatch("loadLang");
    await this.$store.dispatch("loadCart");
    await this.$store.dispatch("loadFavourites");
    this.$store.dispatch("loadModels");
  },
  async mounted() {
    //  await this.$store.dispatch("getFullCartInfo");
  },
  watch: {
    $route(to, from) {
      if (from.name !== undefined) {
        this.$store.commit("TOGGLE_PRELOADER_STATE", true);

        if (
          this.isMobile.any() ||
          document.querySelector("html").offsetWidth < 801
        ) {
          document.querySelector("html").scrollTop = "0";
        }
        // if (from.name == undefined) {
        //   setTimeout(() => {
        //     this.$store.commit("TOGGLE_PRELOADER_STATE", false);
        //   }, 5000);
        // } else {
        setTimeout(() => {
          this.$store.commit("TOGGLE_PRELOADER_STATE", false);
        }, this.preloaderTime);
        // }
      }
    },
    cart: {
      deep: true,
      handler: function () {
        this.$store.dispatch("setCookies", {
          cookie: "cart",
          object: this.cart,
        });

        this.$store.commit("UPDATE_CART_ITEMS_AMOUNT");
      },
    },
    language() {
      this.$i18n.locale = this.language;
    },
    productsLoaded() {
      this.preloaderKill();
    },
  },
};
</script>

<style lang="scss">
@import url("assets/css/style.css");
@font-face {
  font-family: "Axis";
  src: local("Axis"), url("assets/fonts/AXIS-Extra-Bold.woff");
  font-display: swap;
}

@font-face {
  font-family: "BPG";
  src: local("BPG"), url("assets/fonts/BPGBannerExtraSquareCaps.woff");
  font-display: swap;
}

@font-face {
  font-family: "Montserrat Bold";
  src: local("Montserrat"), url("assets/fonts/Montserrat_Bold.woff");
  font-display: swap;
}

@font-face {
  font-family: "Montserrat Semibold";
  src: local("Montserrat"), url("assets/fonts/Montserrat_Semibold.woff");
  font-display: swap;
}

@font-face {
  font-family: "Montserrat Medium";
  src: local("Montserrat"), url("assets/fonts/Montserrat_Medium.woff");
  font-display: swap;
}

@font-face {
  font-family: "Montserrat Regular";
  src: local("Montserrat"), url("assets/fonts/Montserrat_Regular.woff");
  font-display: swap;
}

.main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0 6rem;
  z-index: 2;

  svg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
