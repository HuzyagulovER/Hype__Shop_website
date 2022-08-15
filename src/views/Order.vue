<template>
  <section class="order" id="order">
    <div class="wrapper">
      <div class="order__container">
        <form class="order__form form" autocomplete="autocomplete" ref="form">
          <div class="form__container">
            <div class="form__cell">
              <div class="form__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.first_name") }}
              </div>
              <input
                type="text"
                class="form__input"
                v-model="form.firstName"
                name="firstName"
                ref="firstName"
              />
            </div>
            <div class="form__cell">
              <div class="form__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.last_name") }}
              </div>
              <input
                type="text"
                class="form__input"
                v-model="form.lastName"
                name="lastName"
                ref="lastName"
              />
            </div>
            <div class="form__cell">
              <div class="form__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.phone") }}
              </div>
              <input
                type="number"
                class="form__input"
                pattern="+[0-9]{11}"
                v-model="form.phoneNumber"
                name="phoneNumber"
                ref="phoneNumber"
              />
            </div>
            <div class="form__cell">
              <div class="form__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.alt_phone") }}
              </div>
              <input
                type="text"
                class="form__input"
                v-model="form.alternativeNumber"
                name="alternativeNumber"
                ref="alternativeNumber"
              />
            </div>
            <div class="form__cell">
              <div class="form__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.address") }}
              </div>
              <input
                type="text"
                class="form__input"
                v-model="form.address"
                name="address"
                ref="address"
              />
            </div>
            <div class="form__cell">
              <div class="form__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.address_opt") }}
              </div>
              <input
                type="text"
                class="form__input"
                v-model="form.optionalAddress"
                name="optionalAddress"
                ref="optionalAddress"
              />
            </div>

            <div class="form__cell cell-2">
              <div class="form__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.comment") }}
              </div>
              <textarea
                class="form__textarea"
                v-model="form.comment"
                name="comment"
                ref="comment"
              ></textarea>
            </div>

            <div class="form__cell cell cell-2">
              <div class="form__subtitle" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.payment.title") }}
              </div>
              <div class="cell__container">
                <label class="form__label" :class="{ ge: language === 'ge' }">
                  {{ $t("order.form.payment.cash") }}
                  <input
                    type="radio"
                    class="form__input"
                    value="cash"
                    name="paymentMethod"
                    v-model="form.paymentMethod"
                    checked
                  />
                  <div class="cell__radio"></div>
                </label>
                <label class="form__label" :class="{ ge: language === 'ge' }">
                  {{ $t("order.form.payment.card") }}
                  <input
                    type="radio"
                    class="form__input"
                    value="credit card"
                    name="paymentMethod"
                    v-model="form.paymentMethod"
                  />

                  <div class="cell__radio"></div>
                </label>
              </div>
            </div>

            <div class="form__cell">
              <p class="form__problem" :class="{ ge: language === 'ge' }">
                {{ $t("order.form.problem.text") }}
                <RouterLink :to="{ path: '/faq', hash: '#contacts' }">{{
                  $t("order.form.problem.link")
                }}</RouterLink>
              </p>
            </div>
            <div class="form__cell">
              <button
                class="form__submit"
                type="submit"
                @click.prevent="submit"
                :class="{ ge: language === 'ge' }"
              >
                {{ $t("order.form.order_button") }}
              </button>
            </div>
          </div>
        </form>
        <div class="order__placeholder">
          <BaseImage src="./images/ImageOrderPlaceholder.png" />
        </div>
      </div>
    </div>
    <Loader v-if="loading" />
  </section>
</template>

<script>
import { mapState } from "vuex";
import BaseImage from "../components/BaseImage.vue";
import Loader from "../components/Loader.vue";

export default {
  name: "Order",
  components: {
    BaseImage,
    Loader,
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        alternativeNumber: "",
        address: "",
        optionalAddress: "",
        comment: "",
        paymentMethod: "",
      },
      necessaryFields: ["firstName", "lastName", "phoneNumber", "address"],
      loading: false,
    };
  },
  computed: {
    ...mapState(["language", "base", "productsToBuy"]),
    pageFrom() {
      return this.$router.options.history.state.back.split("/")[1];
    },
  },
  methods: {
    checkForm() {
      let errorCounter = 0;
      this.necessaryFields.forEach((field) => {
        if (this.form[field] == "") {
          this.$refs[field].classList.add("error");
          errorCounter++;
        }
      });

      if (!errorCounter) {
        return true;
      } else {
        setTimeout(() => {
          this.necessaryFields.forEach((field) => {
            this.$refs[field].classList.remove("error");
          });
        }, 2000);
        return false;
      }
    },
    submit() {
      if (this.checkForm()) {
        this.loading = true;

        let fd = new FormData(this.$refs.form),
          date = new Date(),
          dateString = "";

        dateString = `${date.getHours()}:${
          (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
        } ${date.getDate()}-${
          (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1)
        }-${date.getFullYear()} UTC${
          (date.getTimezoneOffset() <= 0 ? "+" : "-") +
          -date.getTimezoneOffset() / 60
        }`;

        fd.append("products", JSON.stringify(this.productsToBuy));
        fd.append("orderTime", dateString);

        this.axios({
          method: "post",
          url: this.base + "/php/addOrder.php",
          data: fd,
        }).then((r) => {
          if (r.data == 1) {
            this.$router.push({ path: "/thanks" });
            if (this.pageFrom === "cart") {
              this.$store.commit("SET_CART", {});
            }
          } else {
            this.loading = false;
          }
        });
      } else {
        console.log("There is some errors!");
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.order {
  &__container {
    width: 100%;
    display: grid;
    grid-template: 1fr / 1fr 1fr;
    gap: 5rem;
    padding: 2rem 3rem;
    border: 0.1rem solid rgb(var(--c_grey));
    border-radius: var(--border-radius);
  }

  .form {
    width: 100%;
    display: flex;
    align-items: center;

    &__container {
      width: 100%;
      display: grid;
      grid-template: 1fr / 1fr 1fr;
      gap: 2rem;
    }

    &__cell {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      justify-content: center;

      &.fd-row {
        flex-direction: row;
        justify-content: start;
        align-items: center;
      }
    }

    .cell-2 {
      grid-column: 1 / 3;
    }

    .cell {
      &__container {
        display: flex;
      }

      &__radio {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 100%;
        aspect-ratio: 1 / 1;

        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
        }
        &::before {
          height: 70%;
          width: 70%;
          border-radius: 50%;
          border: 0.1rem solid rgb(var(--c_grey));
          transform: translate(-50%, -50%);
        }
        &::after {
          height: 45%;
          width: 45%;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: all 0.3s ease;
          background-color: rgb(var(--c_desaturated-graylish-blue));
        }
      }
    }

    &__subtitle {
      margin-bottom: 0.8rem;
      color: rgb(var(--c_desaturated-graylish-blue));
      font-family: "Montserrat Semibold";
    }

    &__input,
    &__textarea {
      background-color: rgb(var(--c_light-main));
      border: 0.1rem solid rgb(var(--c_light-main));
      border-radius: 0.3rem;
      color: rgb(var(--c_grey));
      padding: 0.5rem 0.8rem;
      font: {
        family: "Montserrat Semibold";
        size: 1rem;
      }

      &.error {
        border-color: red;
      }
    }

    &__textarea {
      resize: vertical;
      min-height: 5rem;
      max-height: 10rem;
      padding: 1rem 1rem;
    }

    &__label {
      display: inline-flex;
      align-items: center;
      color: rgb(var(--c_light-grey));
      cursor: pointer;
      position: relative;

      &:not(:last-child) {
        margin-right: 1.5rem;
      }

      input[type="radio"] {
        margin-left: 0.8rem;
        visibility: hidden;

        &:checked + .cell__radio {
          &::after {
            transform: translate(-50%, -50%) scale(1);
          }
        }
      }
    }

    &__problem {
      color: rgb(var(--c_grey));
      a {
        color: rgb(var(--c_desaturated-graylish-blue));
      }
    }

    &__submit {
      text-transform: uppercase;
      background-color: rgb(var(--c_dark-coral));
      color: rgb(var(--c_white));
      border-radius: var(--border-radius);
      border: 0;
      padding: 0.7rem;
      cursor: pointer;
      font: {
        size: 1.05rem;
        family: "Montserrat Semibold";
      }
    }
  }
}

@media screen and (max-width: 1050px) {
  .order {
    &__container {
      display: flex;
      flex-direction: column;
      gap: unset;
    }

    .form {
      margin-bottom: 5rem;

      &__subtitle {
        font-size: 1.2rem;
      }

      &__input,
      &__textarea {
        font-size: 1.1rem;
      }

      &__label {
        font-size: 1.1rem;
      }

      &__submit {
        padding: 1rem;
        font-size: 1.2rem;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .order {
    &__container {
      padding: 2rem;
    }

    .form {
      .cell-2 {
        grid-column: 1/2;
      }

      &__container {
        grid-template: 1fr / 1fr;
      }

      &__label {
        font-size: 0.95rem;
      }
    }
  }
}
</style>

