<template>
  <div class="component-video" @click="videoManage">
    <div class="component-video__play" ref="videoPlay">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 161.78 184.72">
        <g>
          <g>
            <path
              d="M155,80.6,20.54,1.89A13.63,13.63,0,0,0,0,13.66l0,157.4a13.64,13.64,0,0,0,20.53,11.77L155,104.14A13.64,13.64,0,0,0,155,80.6ZM141.85,94.8l-123,72a2.81,2.81,0,0,1-4.23-2.42l0-144a2.81,2.81,0,0,1,4.23-2.43l123,72A2.81,2.81,0,0,1,141.85,94.8Z"
            />
          </g>
        </g>
      </svg>
    </div>
    <video
      v-if="src"
      ref="video"
      preload="preload"
      :poster="poster ? 'images/videoPreview.jpg' : ''"
    >
      <source :src="src" />
    </video>
    <Loader v-else />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "../components/Loader";
export default {
  name: "BaseVideo",
  props: {
    src: String,
    controls: String,
    poster: Boolean,
  },
  components: {
    Loader,
  },
  computed: {
    ...mapState(["base"]),
  },
  methods: {
    videoManage() {
      if (this.controls) {
        this.$refs.video.setAttribute("controls", "controls");
        this.$refs.video.play();
        this.$refs.videoPlay.classList.add("played");
        let video = event.currentTarget;
        video.removeEventListener("click", this.videoManage);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.component-video {
  position: relative;
  height: 100%;
  width: 100%;
  cursor: pointer;
  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 1;
  }
  &__play {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #16171b, $alpha: 0.75);
    fill: rgb(var(--c_coral));
    z-index: 2;
    &.played {
      visibility: hidden;
    }
    svg {
      position: absolute;
      width: 10%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.2s ease;
    }
  }
  &:hover {
    .component-video__play {
      svg {
        width: 15%;
      }
    }
  }
}
.loader {
  width: 30%;
}
</style>