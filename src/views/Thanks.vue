<template>
  <section class="thanks" id="thanks">
    <div class="wrapper">
      <div class="thanks__container">
        <p class="thanks__text" ref="text" :class="{ ge: language === 'ge' }">
          {{ $t("thanks.text") }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Thanks",
  components: {},
  data() {
    return {
      duration: 4,
      delay: 0.3,
    };
  },
  methods: {},
  computed: {
    ...mapState(["language"]),
  },
  mounted() {
    setTimeout(() => {
      this.$refs.text.classList.add("show");
    }, this.delay * 1000);

    setTimeout(() => {
      this.$refs.text.classList.remove("show");
    }, this.duration * 1000);

    setTimeout(() => {
      this.$router.replace("/");
    }, (this.duration + this.delay) * 1000);
  },
};
</script>

<style lang="scss" scoped>
.thanks {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  &__text {
    color: rgb(var(--c_desaturated-graylish-blue));
    transition: all 0.5s ease;
    opacity: 0;
    transform: translateY(20%);

    &.show {
      opacity: 1;
      transform: translateY(0);
    }
    font: {
      family: "Montserrat Bold";
      size: 5rem;
    }
  }
}
</style>