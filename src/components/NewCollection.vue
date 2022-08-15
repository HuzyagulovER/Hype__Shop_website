<template>
  <div class="new-collection">
    <p :class="{ ge: language === 'ge' }">{{ $t("new-collection") }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "NewCollection",
  computed: {
    ...mapState(["language"]),
  },
};
</script>

<style lang="scss" scoped>
$gold: #e2a224;
$bgColor: #101013;
.new-collection {
  position: absolute;
  width: auto;
  height: auto;
  transform-origin: left top;
  transform: rotate(-90deg) translateX(-50%);
  background-color: $gold;
  color: $bgColor;
  left: 0;
  top: 50%;
  font-size: 1rem;
  padding: 0.5rem 2.5rem;
  border-bottom-left-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  cursor: pointer;
  z-index: 5;
}
</style>