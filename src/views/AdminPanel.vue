<template>
  <section class="admin" id="admin">
    <div class="wrapper">
      <div class="admin__container">
        <TransitionGroup name="list" tag="ul" class="admin__orders orders">
          <li
            class="orders__order order"
            v-for="order in orders"
            :key="order.id"
          >
            <div class="order__container">
              <p class="order__title">
                Order №{{ order.id }}
                <span
                  class="order__remove"
                  @click="removeOrder(order.id)"
                ></span>
              </p>
              <div class="order__info info">
                <ul class="info__container">
                  <li
                    class="info__item"
                    v-for="(infoItem, j) in order.info"
                    :key="j"
                    :class="j"
                  >
                    <p class="info__text">
                      <span class="info__subtitle"
                        >{{ splitStringByCapitalLetters(j) }}:
                      </span>
                      <br class="info__br" />
                      <span class="info__value">{{
                        j == "subtotal"
                          ? changePrice(+infoItem) + " GEL"
                          : infoItem
                      }}</span>
                    </p>
                  </li>
                </ul>
              </div>

              <p class="order__order-subtitle">Products:</p>

              <ul class="order__products products">
                <li
                  class="products__product product"
                  v-for="(product, i) in order.products"
                  :key="i"
                >
                  <ul class="product__container">
                    <li
                      class="product__item"
                      v-for="(point, i) in product"
                      :key="i"
                      :class="i"
                      v-show="point != ''"
                    >
                      <p class="product__text">
                        <span class="product__subtitle">{{ i }}: </span>
                        <span class="product__value">{{ point }}</span>
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </TransitionGroup>
        <div class="admin__empty" v-if="!ordersAmount">
          <p>There is not orders yet</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AdminPanel",
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["orders"]),
    ordersAmount() {
      return Object.keys(this.orders).length;
    },
  },
  methods: {
    changePrice(price) {
      return price.toFixed(2);
    },
    splitStringByCapitalLetters(string) {
      return string.split(/(?=[A-Z])/).join(" ");
    },
    removeOrder(id) {
      if (confirm("Do you really want to remove this order?")) {
        this.$store.dispatch("removeOrder", id);
      }
    },
  },
  created() {
    this.$store.dispatch("loadOrders");
  },
  async mounted() {},
};
</script>

<style lang="scss" scoped>
.admin {
  &__container {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  ul {
    list-style: none;
  }

  .orders {
    display: flex;
    flex-direction: column-reverse;

    .order {
      flex-grow: 1;
      margin-bottom: 2rem;
      position: relative;

      &:not(:last-child) {
        margin-top: 2rem;

        &::before {
          content: "";
          position: absolute;
          top: -2rem;
          left: 0;
          width: 100%;
          height: 0.1rem;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgb(var(--c_grey)) 50%,
            transparent 100%
          );
        }
      }

      &__order-subtitle {
        color: rgb(var(--c_pink));
        text-decoration: underline;
        margin-bottom: 0.5rem;
        font: {
          family: "Montserrat Semibold";
          size: 1.1rem;
        }
      }

      &__title {
        display: inline-block;
        color: rgb(var(--c_desaturated-graylish-blue));
        text-decoration: underline;
        margin-bottom: 1rem;
        margin-left: 3rem;
        position: relative;

        font: {
          size: 1.5rem;
          family: "Montserrat Bold";
        }
      }

      &__remove {
        width: 1rem;
        height: 1rem;
        position: absolute;
        top: 50%;
        right: -2rem;
        transform: translateY(-50%);
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;

        &:hover {
          transform: translateY(-50%) scale(1.1);
          opacity: 1 !important;
        }

        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          height: 0.1rem;
          width: 100%;
          background-color: red;
        }

        &::before {
          transform: rotate(45deg);
        }

        &::after {
          transform: rotate(-45deg);
        }
      }

      .info {
        margin-bottom: 1rem;

        &__item {
          &.comment {
            grid-column: 1/4;
          }
        }

        &__container {
          display: grid;
          grid-template: 1fr / repeat(3, 1fr);
          gap: 0.5rem;
        }

        &__subtitle {
          text-transform: capitalize;
          color: rgb(var(--c_grey));
          font-family: "Montserrat Semibold";
        }

        &__value {
          color: rgb(var(--c_light-grey));
        }

        &__br {
          display: none;
        }
      }

      .products {
        list-style: disc;
        display: grid;
        grid-template: 1fr / repeat(4, 1fr);
        gap: 1rem;

        .product {
          color: rgb(var(--c_dark-coral));
          &__container {
            color: rgb(var(--c_white));
            display: flex;
            flex-direction: column;
          }

          &__item {
            margin-bottom: 0.3rem;

            &.category {
              order: 1;
            }
            &.name {
              order: 2;
            }
            &.color {
              order: 3;
            }
            &.amount {
              order: 4;
            }
          }

          &__text {
            text-transform: capitalize;
          }

          &__subtitle {
            color: rgb(var(--c_grey));
          }

          &__value {
            color: rgb(var(--c_light-grey));
          }
        }
      }

      &:hover {
        .order__remove {
          opacity: 0.7;
        }
      }
    }
  }

  &__empty {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;

    p {
      color: rgb(var(--c_grey));
      font: {
        family: "Montserrat Bold";
        size: 2rem;
      }
    }
  }
}

@media screen and (max-width: 1050px) {
  .admin {
    .orders {
      .order {
        &__remove {
          opacity: 1;

          &:hover {
            opacity: unset;
          }
        }

        .info {
          margin-bottom: 2rem;

          &__container {
            row-gap: 1rem;
          }

          &__br {
            display: block;
          }
        }

        &:hover {
          .order__remove {
            opacity: unset;
          }
        }

        .products {
          grid-template: 1fr / 1fr 1fr;
        }
      }
    }

    &__empty {
      display: flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center;

      p {
        color: rgb(var(--c_grey));
        font: {
          family: "Montserrat Bold";
          size: 2rem;
        }
      }
    }
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-3rem);
}
.list-leave-active {
  position: absolute;
}
</style>