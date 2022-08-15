<template>
  <section class="craft" id="craft">
    <div class="wrapper">
      <div class="craft__container">
        <div class="craft__other mobile">
          <div class="craft__preview preview">
            <div class="preview__container">
              <p class="preview__title" :class="{ ge: language === 'ge' }">
                {{ $t("custom.preview.title") }}
              </p>
              <div class="preview__image">
                <BaseImage
                  :src="
                    base +
                    '/craft_images/models_images/' +
                    craft.models[modelsActive].name +
                    '.png'
                  "
                  :alt="craft.models[modelsActive].name"
                  :width="378"
                  :height="337"
                />
              </div>
              <p class="preview__total">
                <span :class="{ ge: language === 'ge' }">{{
                  $t("custom.preview.total_text")
                }}</span
                >: {{ changePrice(totalPrice) }} GEL
              </p>
            </div>
          </div>
        </div>
        <div class="craft__selection">
          <div class="craft__model model">
            <p class="model__title" :class="{ ge: language === 'ge' }">
              {{ $t("custom.model_title") }}
            </p>
            <div class="model__items">
              <div
                class="model__item"
                v-for="(model, j) in craft.models"
                :key="j"
                :ref="'models__' + model.name"
                @click="choose('models', j)"
                :class="{ active: modelsActive == j }"
              >
                <BaseImage
                  :src="
                    base + '/craft_images/models_images/' + model.name + '.png'
                  "
                  :alt="model.name"
                  :width="122"
                  :height="109"
                />
              </div>
            </div>
          </div>
          <div class="craft__primary primary">
            <p class="primary__title" :class="{ ge: language === 'ge' }">
              {{ $t("custom.primary_title") }}
            </p>
            <div class="primary__items">
              <div
                class="primary__item"
                v-for="(texture, j) in craft.primary_texture"
                :key="j"
                :ref="'primary__' + texture.name"
                @click="choose('primary_texture', j)"
                :class="{ active: primary_textureActive == j }"
              >
                <BaseImage
                  :src="
                    base +
                    '/craft_images/primary_texture/' +
                    texture.name +
                    '.png'
                  "
                  :alt="texture.name"
                  :width="114"
                  :height="114"
                />
              </div>
            </div>
          </div>
          <div class="craft__secondary secondary">
            <p class="secondary__title" :class="{ ge: language === 'ge' }">
              {{ $t("custom.secondary_title") }}
            </p>

            <div class="secondary__items">
              <div
                class="secondary__item"
                v-for="(texture, j) in craft.secondary_texture"
                :key="j"
                :ref="'secondary__' + texture.name"
                @click="choose('secondary_texture', j)"
                :class="{ active: secondary_textureActive == j }"
              >
                <BaseImage
                  :src="
                    base +
                    '/craft_images/secondary_texture/' +
                    texture.name +
                    '.png'
                  "
                  :alt="texture.name"
                  :width="114"
                  :height="114"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="craft__other desktop">
          <div class="craft__preview preview">
            <div class="preview__container">
              <p class="preview__title" :class="{ ge: language === 'ge' }">
                {{ $t("custom.preview.title") }}
              </p>
              <div class="preview__image">
                <BaseImage
                  :src="
                    base +
                    '/craft_images/models_images/' +
                    craft.models[modelsActive].name +
                    '.png'
                  "
                  :alt="craft.models[modelsActive].name"
                  :width="378"
                  :height="337"
                />
              </div>
              <p class="preview__total">
                <span :class="{ ge: language === 'ge' }">{{
                  $t("custom.preview.total_text")
                }}</span
                >: {{ changePrice(totalPrice) }} GEL
              </p>
            </div>
          </div>
          <div class="craft__comment comment">
            <div class="comment__title">
              <p :class="{ ge: language === 'ge' }">
                {{ $t("custom.comment.title") }}
              </p>
            </div>
            <textarea
              class="comment__input"
              v-model="comment"
              :placeholder="$t('custom.comment.placeholder')"
              :class="{ ge: language === 'ge' }"
            ></textarea>

            <div
              class="comment__button button"
              :class="{ added: added }"
              @click="addToCart"
            >
              <p :class="{ ge: language === 'ge' }">
                {{ $t("custom.comment.order_button") }}
              </p>
              <IconTick class="button__tick" />
            </div>
          </div>
          <div class="craft__gallery gallery">
            <div class="gallery__title">
              <p :class="{ ge: language === 'ge' }">
                {{ $t("custom.gallery_title") }}
              </p>
            </div>
            <div class="gallery__images images">
              <div
                class="images__image"
                v-for="(image, j) in craft.gallery"
                :key="j"
              >
                <BaseImage
                  :src="base + '/' + image.src"
                  :alt="image.name"
                  :width="205"
                  :height="176"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import IconTick from "../components/additionalComponents/IconTick.vue";
import BaseImage from "../components/BaseImage.vue";
import { mapState } from "vuex";
export default {
  name: "Craft",
  components: {
    BaseImage,
    IconTick,
  },
  inject: ["changePrice", "changeStr"],
  computed: {
    ...mapState(["language", "base", "craft"]),
    totalPrice() {
      return (
        +this.craft.models[this.modelsActive].price +
        +this.craft.primary_texture[this.primary_textureActive].price +
        +this.craft.secondary_texture[this.secondary_textureActive].price
      );
    },
  },
  data() {
    return {
      modelsActive: 0,
      primary_textureActive: 0,
      secondary_textureActive: 0,
      added: false,
      comment: "",
    };
  },
  methods: {
    choose(part, index) {
      this[part + "Active"] = index;
    },
    addToCart() {
      let productObject = {
        category: "craft",
        id: `${this.modelsActive}${this.primary_textureActive}${this.secondary_textureActive}`,
        amount: 1,
        price: this.totalPrice,
        name: `Wallet #${this.modelsActive}${this.primary_textureActive}${this.secondary_textureActive}`,
        modelID: +this.modelsActive + 1,
        model: this.craft.models[this.modelsActive].name,
        primary_texture:
          this.craft.primary_texture[this.primary_textureActive].name,
        secondary_texture:
          this.craft.secondary_texture[this.secondary_textureActive].name,
        comment: this.comment,
      };
      this.$store.commit("ADD_TO_CART", productObject);
      this.added = true;
      setTimeout(() => {
        this.added = false;
        this.comment = "";
      }, 1500);
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss">
.craft {
  width: 100%;
  height: 100%;

  &__container {
    display: grid;
    grid-template: 1fr / 11fr 10fr;
    gap: 2.5rem;

    @media screen and (max-width: 750px) {
      grid-template: 1fr / 1fr;
      gap: 0;
    }
  }

  &__selection,
  &__other {
    display: flex;
    flex-direction: column;

    & > * {
      margin-bottom: 3rem;
    }
  }

  &__other {
    padding-top: 2rem;

    &.mobile {
      position: absolute;

      .preview {
        display: none;
      }

      @media screen and (max-width: 750px) {
        position: relative;
        .preview {
          display: flex;

          &__container {
            flex: 1;
          }
        }
      }
    }

    &.desktop {
      .preview {
        @media screen and (max-width: 750px) {
          position: absolute;
          display: none;
        }
      }
    }
  }

  .model,
  .primary,
  .secondary,
  .comment,
  .gallery {
    display: flex;
    flex-direction: column;

    &__title {
      display: inline;
      position: relative;
      margin-bottom: 2rem;
      align-self: start;
      line-height: 1rem;
      font-size: 1.1rem;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: calc(100% + 1rem);
        width: 8rem;
        height: 0.1rem;
        background-color: rgba(var(--c_white), 0.1);
        transform: translateY(-50%);
      }
    }
  }

  .model {
    &__items {
      display: grid;
      grid-template: 1fr / repeat(4, 1fr);
      gap: 0.3rem;
    }

    &__item {
      background-color: rgb(var(--c_dark-main));
      border-color: rgba(var(--c_desaturated-graylish-blue), 0.5);
      aspect-ratio: 1/1;
      border-radius: var(--border-radius);
      padding: 1rem;
      cursor: pointer;
      opacity: 0.5;
      transition: all 0.3s ease;

      // img {
      //   opacity: 0.5;
      //   transition: all 0.3s ease;
      // }

      // &:hover img {
      // }
    }
  }

  .model,
  .primary,
  .secondary {
    &__item {
      border-width: 0.15rem;
      border-style: solid;
      &.active {
        opacity: 1;
      }
    }
  }

  .primary,
  .secondary {
    &__items {
      display: grid;
      grid-template: 1fr / repeat(6, 1fr);
      gap: 0.3rem;
    }

    &__item {
      aspect-ratio: 1/1;
      border-radius: var(--border-radius);
      overflow: hidden;
      opacity: 0.3;
      cursor: pointer;
      transition: all 0.3s ease;
      border-color: transparent;

      &:hover {
        opacity: 1;
      }

      &.active {
        border-color: rgba(var(--c_desaturated-graylish-blue), 0.5);
      }
    }
  }

  .primary {
    &__items {
    }

    &__item {
    }
  }

  .secondary {
    &__items {
    }

    &__item {
    }
  }

  .preview {
    &__container {
      background-color: rgb(var(--c_light-main));
      display: flex;
      flex-direction: column;
      border-radius: var(--border-radius);
      overflow: hidden;
      padding: 1.5rem;
    }

    &__title,
    &__image {
      margin-bottom: 1.5rem;
      position: relative;
    }

    &__title,
    &__total {
      text-align: center;
    }

    &__image {
      padding: 5% 18%;
    }

    &__total {
    }
  }

  .comment {
    &__input {
      padding: 1.2rem;
      background-color: rgb(var(--c_light-main));
      border-radius: var(--border-radius);
      border-width: 0;
      color: rgb(var(--c_grey));
      line-height: 1.2rem;
      margin-bottom: 1.5rem;
      height: 7.2rem;
      min-height: 7.2rem;
      max-height: 10.8rem;
      resize: none;
      font: {
        family: "Montserrat Medium";
        size: 0.95rem;
      }
    }

    .button {
      border-radius: var(--border-radius);
      border-width: 0;
      background-color: rgb(var(--c_dark-coral));
      padding: 1.5rem;
      text-transform: uppercase;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      z-index: 1;
      transition: all 0.5s ease;
      font: {
        family: "Montserrat Semibold";
      }

      p {
        z-index: 3;
        text-align: center;
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: -30%;
        background: linear-gradient(
          to right,
          transparent 0%,
          rgba(var(--c_white), 0.5) 50%,
          transparent 100%
        );
        transform: translateY(-50%) skewX(-30deg);
        width: 20%;
        height: 110%;
        z-index: -1;
        transition: all 0s;
      }

      &:hover {
        transform: scale(1.02);
        &::after {
          left: 100%;
          transition: all 0.5s ease;
        }
      }

      &__tick {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 55%;
        width: auto;
        pointer-events: none;
        z-index: 3;
        transition: all 0.3s ease;
        transform: translate(-50%, -50%);
      }

      &__tick {
        stroke: rgb(var(--c_white));
        opacity: 0;
      }

      &.added {
        background-color: rgb(0, 184, 0) !important;
        p {
          opacity: 0;
        }
        .button__tick {
          opacity: 1;
        }
      }
    }
  }

  .gallery {
    .images {
      display: grid;
      grid-template: repeat(2, 1fr) / repeat(3, 1fr);
      gap: 0.3rem;

      &__image {
        overflow: hidden;
        border-radius: var(--border-radius);
        aspect-ratio: 5/4;

        img {
          object-fit: cover !important;
        }
      }
    }
  }
}
</style>