<template>
  <section class="faq-and-contacts" id="faq-and-contacts">
    <div class="wrapper">
      <div class="faq-and-contacts__container">
        <div class="faq-and-contacts__faq faq">
          <p class="faq__title" :class="{ ge: language === 'ge' }">
            {{ $t("faq.title") }}
          </p>
          <p class="faq__subtitle" :class="{ ge: language === 'ge' }">
            {{ $t("faq.subtitle") }}
          </p>
          <div class="faq__container">
            <div class="faq__question-blocks question-blocks">
              <div
                class="question-blocks__question-block question-block"
                v-for="i in 4"
                :key="i"
              >
                <div class="question-block__container">
                  <p
                    class="question-block__question"
                    :class="{ ge: language === 'ge' }"
                  >
                    {{ $t("faq.questions." + i + ".question") }}
                  </p>
                  <p
                    class="question-block__answer"
                    :class="{ ge: language === 'ge' }"
                  >
                    {{ $t("faq.questions." + i + ".answer") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="faq-and-contacts__contacts contacts" id="contacts">
          <div class="contacts__title" :class="{ ge: language === 'ge' }">
            {{ $t("contact.title") }}
          </div>
          <div class="contacts__subtitle" :class="{ ge: language === 'ge' }">
            {{ $t("contact.subtitle") }}
          </div>
          <div class="contacts__container">
            <div class="contacts__info info">
              <div class="info__address">
                <div class="info__title-container">
                  <div class="info__icon">
                    <IconLocation />
                  </div>
                  <p class="info__title" :class="{ ge: language === 'ge' }">
                    {{ $t("contact.address.title") }}
                  </p>
                </div>
                <p class="info__text" :class="{ ge: language === 'ge' }">
                  {{ $t("contact.address.text") }}
                </p>
              </div>
              <div class="info__phone">
                <div class="info__title-container">
                  <div class="info__icon">
                    <IconPhone />
                  </div>
                  <p class="info__title" :class="{ ge: language === 'ge' }">
                    {{ $t("contact.help.title") }}
                  </p>
                </div>
                <div class="info__icon"></div>
                <a :href="phoneNumber.href" class="info__link">{{
                  phoneNumber.text
                }}</a>
              </div>
              <div class="info__email">
                <div class="info__title-container">
                  <div class="info__icon">
                    <IconAtSign />
                  </div>
                  <p class="info__title" :class="{ ge: language === 'ge' }">
                    {{ $t("contact.email.title") }}
                  </p>
                </div>
                <div class="info__icon"></div>
                <a :href="email.href" class="info__link">{{ email.text }}</a>
              </div>
            </div>
            <div class="contacts__image">
              <BaseImage
                src="./images/logotype_white_2.svg"
                :width="451"
                :height="383"
                class="placeholder__image"
              />
            </div>
          </div>
        </div>
        <div class="faq-and-contacts__video">
          <BaseVideo
            src="videos/video.mp4"
            controls="controls"
            :poster="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import IconLocation from "../components/additionalComponents/IconLocation.vue";
import IconPhone from "../components/additionalComponents/IconPhone.vue";
import IconAtSign from "../components/additionalComponents/IconAtSign.vue";
import BaseImage from "../components/BaseImage.vue";
import BaseVideo from "../components/BaseVideo";
import { mapState } from "vuex";
export default {
  name: "Faq",
  components: {
    BaseImage,
    IconLocation,
    IconPhone,
    IconAtSign,
    BaseVideo,
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
  },
  methods: {
    classChange(el, cl, mode) {
      if (mode == "add") el.classList.add(cl);
      if (mode == "remove") el.classList.remove(cl);
      if (!mode) el.classList.toggle(cl);
    },
    async getFaq() {
      await this.axios({ method: "get", url: "/php/getFaq.php" }).then((r) => {
        this.questions = r.data;
        this.imageAnimation();
      });
    },
    listAnimation() {
      let list = document.querySelectorAll(".info__list .item"),
        offset = 50;
      list.forEach((el) => {
        setTimeout(() => {
          el.classList.add("animated");
        }, offset);
        offset = offset + 50;
      });
    },
    imageAnimation() {
      document.querySelector(".faq .image").classList.add("animated");
    },
  },
  created() {},
  async mounted() {},
};
</script>

<style lang="scss" scoped>
.faq-and-contacts {
  .faq,
  .contacts {
    margin-bottom: 2.5rem;

    &__title {
      display: inline-block;
      position: relative;
      margin-bottom: 0.2rem;

      font: {
        family: "Montserrat Medium";
        size: 1.3rem;
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: calc(100% + 2.5rem);
        width: 12rem;
        height: 1px;
        background-color: rgb(var(--c_dark-grey));
      }
    }

    &__subtitle {
      color: rgb(var(--c_grey));
      margin-bottom: 6rem;

      font: {
        family: "Montserrat Semibold";
        size: 0.9rem;
      }
    }
  }

  .faq {
    &__container {
    }

    .question-blocks {
      display: grid;
      grid-template: 1fr 1fr / 1fr 1fr;
      row-gap: 5rem;
      column-gap: 10rem;
      width: 100%;

      .question-block {
        &__container {
        }

        &__question {
          color: rgb(var(--c_desaturated-graylish-blue));
          padding-left: 2rem;
          position: relative;
          margin-bottom: 1rem;

          font: {
            family: "Montserrat Semibold";
            size: 1.1rem;
          }

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 50%;
            height: 80%;
            width: 1.3rem;
            background: linear-gradient(
              to right,
              rgb(var(--c_desaturated-graylish-blue)) 0%,
              transparent 100%
            );
            transform: translateY(-50%);
          }
        }

        &__answer {
          line-height: 1.5rem;
          font: {
            family: "Montserrat Regular";
            size: 0.9rem;
          }
        }
      }
    }
  }

  .contacts {
    padding-top: 2.5rem;
    margin-bottom: 5rem;
    &__container {
      background-color: rgb(var(--c_light-main));
      border-radius: var(--border-radius);
      padding: 2rem 6rem;
      display: grid;
      grid-template: 1fr / 10fr 7fr;
      gap: 35%;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem 0;
      &__title {
        color: rgb(var(--c_desaturated-graylish-blue));
        margin-left: 1.5rem;
        margin-bottom: 1rem;
        font: {
          family: "Montserrat Bold";
          size: 1.05rem;
        }

        &-container {
          position: relative;
        }
      }

      &__text,
      &__link {
        color: rgb(var(--c_grey));
        font-family: "Montserrat Semibold";
      }

      &__link {
        transition: all 0.3s ease;

        &:hover {
          color: rgb(var(--c_white));
        }
      }

      &__icon {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 1rem;
        height: 1rem;
        fill: rgb(var(--c_desaturated-graylish-blue));
      }

      &__address,
      &__phone {
        margin-bottom: 3rem;
      }

      &__address,
      &__phone,
      &__email {
      }
    }

    &__image {
      display: flex;
      justify-content: center;
    }
  }

  &__video {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--border-radius);
    overflow: hidden;
    @supports not (aspect-ratio: initial) {
      height: 47.2rem;
    }
  }
}

@media screen and (max-width: 750px) {
  .faq-and-contacts {
    .faq,
    .contacts {
      margin-bottom: 2.5rem;

      &__title {
        font-size: 1.5rem;
      }

      &__subtitle {
        margin-bottom: 3rem;
        font-size: 1.1rem;
      }
    }
    .faq {
      .question-blocks {
        grid-template: auto / 1fr;
        row-gap: 5rem;
        column-gap: unset;

        .question-block {
          &__question {
            color: rgb(var(--c_desaturated-graylish-blue));
            padding-left: 2rem;
            position: relative;
            margin-bottom: 1rem;

            font: {
              family: "Montserrat Semibold";
              size: 1.1rem;
            }

            &::before {
              content: "";
              position: absolute;
              left: 0;
              top: 50%;
              height: 80%;
              width: 1.3rem;
              background: linear-gradient(
                to right,
                rgb(var(--c_desaturated-graylish-blue)) 0%,
                transparent 100%
              );
              transform: translateY(-50%);
            }
          }

          &__answer {
            line-height: 1.5rem;
            font: {
              family: "Montserrat Regular";
              size: 0.9rem;
            }
          }
        }
      }
    }

    .contacts {
      &__container {
        padding: 2rem 4rem;
        display: block;
      }

      .info {
        padding: 1rem 0;
      }

      &__image {
        display: none;
      }
    }
  }
}
</style>