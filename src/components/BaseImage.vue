<template>
  <div class="component-img">
    <img
      :src="src"
      :alt="alt"
      v-if="src"
      :width="width"
      :height="height"
      :class="{ height_inherit: heightInherit }"
    />
    <Loader v-else />
  </div>
</template>

<script>
import Loader from "../components/Loader";
export default {
  name: "BaseImage",
  props: {
    src: String,
    alt: String,
    width: Number,
    height: Number,
    heightInherit: Boolean,
  },
  components: {
    Loader,
  },
};
</script>

<style lang="scss">
.component-img {
  position: relative;
  height: 100%;
  width: 100%;
  img {
    width: 100%;
    object-fit: contain;

    &:not(.height_inherit) {
      height: 100%;
    }

    @media screen and (max-width: 750px) {
      & {
        height: 100%;
      }
    }
  }
  .loader {
    width: 30%;
  }
}
</style>