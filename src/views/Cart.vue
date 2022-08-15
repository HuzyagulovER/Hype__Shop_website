<template>
  <section class="cart" id="cart">
    <div class="wrapper">
      <div class="cart__container">
        <div class="cart__items items">
          <TransitionGroup name="list" tag="ul" class="items__container">
            <li
              class="items__item item"
              v-for="(item, j) in cart"
              :key="j"
              :data-item="j"
            >
              <div class="item__container">
                <div class="item__image">
                  <BaseImage
                    :src="
                      base +
                      '/craft_images/models_images/model_' +
                      item.modelID +
                      '.png'
                    "
                    :alt="j"
                    :width="232"
                    :height="285"
                    v-if="item.category === 'craft_wallets'"
                  />
                  <BaseImage
                    :src="base + products[item.category][item.id].image"
                    :alt="j"
                    :width="232"
                    :height="285"
                    v-else
                  />
                </div>
                <div class="item__info info">
                  <div class="info__container">
                    <div class="info__top-line top-line">
                      <div class="top-line__left">
                        <div class="top-line__title">
                          <p>
                            <span v-if="item.category === 'craft_wallets'">{{
                              item.name
                            }}</span>
                            <RouterLink
                              :to="'/item/' + item.category + '/id' + item.id"
                              v-else
                              >{{
                                products[item.category][item.id].name
                              }}</RouterLink
                            >
                          </p>
                        </div>
                        <div class="top-line__price">
                          <p>
                            {{
                              item.category === "craft_wallets"
                                ? changePrice(item.price)
                                : changePrice(
                                    products[item.category][item.id].price
                                  )
                            }}
                            GEL
                          </p>
                        </div>
                        <div class="top-line__color" v-if="item.color">
                          <p>
                            <span :class="{ ge: language === 'ge' }"
                              >{{ $t("item.color") }}:</span
                            >
                            {{ item.color }}
                          </p>
                        </div>
                      </div>
                      <div class="top-line__right">
                        <div class="top-line__amount amount">
                          <div class="amount__container">
                            <div
                              class="amount__minus"
                              @click="amountChange(item.amount - 1)"
                            >
                              <p>-</p>
                            </div>
                            <input
                              type="number"
                              class="amount__input"
                              :value="item.amount"
                              @keyup="amountChange(item.amount)"
                              @blur="amountChange(item.amount)"
                            />
                            <div
                              class="amount__plus"
                              @click="amountChange(item.amount + 1)"
                            >
                              <p>+</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="info__description">
                      <p v-if="item.category !== 'craft_wallets'">
                        {{ products[item.category][item.id].description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item__remove" @click="removeItem(j)"></div>
            </li>
          </TransitionGroup>
          <div class="items__empty" v-if="Object.keys(cart).length == 0">
            <p :class="{ ge: language === 'ge' }">
              {{ $t("cart.empty.title") }}
            </p>
          </div>
        </div>
        <div class="cart__total total">
          <div class="total__container">
            <div class="total__body">
              <div class="total__summary">
                <p class="total__title" :class="{ ge: language === 'ge' }">
                  {{ $t("cart.total.summary.title") }}
                </p>
                <div class="total__info-container">
                  <p class="total__subtitle" :class="{ ge: language === 'ge' }">
                    {{ $t("cart.total.summary.amount") }}:
                  </p>
                  <p class="total__value">
                    {{ changePrice(total.amount) }} GEL
                  </p>
                </div>
                <div class="total__info-container">
                  <p class="total__subtitle" :class="{ ge: language === 'ge' }">
                    {{ $t("cart.total.summary.shipping") }}:
                  </p>
                  <p class="total__value" :class="{ ge: language === 'ge' }">
                    {{ total.shipping }}
                  </p>
                </div>
              </div>
              <div class="total__subtotal">
                <p class="total__title" :class="{ ge: language === 'ge' }">
                  {{ $t("cart.total.subtotal.title") }}
                </p>
                <div class="total__info-container">
                  <p class="total__subtitle" :class="{ ge: language === 'ge' }">
                    {{ $t("cart.total.subtotal.subtotal") }}:
                  </p>
                  <p class="total__value">
                    {{ changePrice(total.subtotal) }} GEL
                  </p>
                </div>
              </div>
              <div class="total__promocode">
                <p class="total__title" :class="{ ge: language === 'ge' }">
                  {{ $t("cart.total.promo.title") }}
                </p>
                <input
                  type="text"
                  class="total__input"
                  :placeholder="$t('cart.total.promo.placeholder')"
                  :class="{ ge: language === 'ge' }"
                />
              </div>
            </div>
            <div
              class="total__order-button"
              :class="{ disable: !cartItemsAmount }"
              @click="gotoOrderPage"
            >
              <p :class="{ ge: language === 'ge' }">
                {{ $t("cart.order_button") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import BaseImage from "../components/BaseImage.vue";

export default {
  name: "Cart",
  components: {
    BaseImage,
  },
  inject: ["changePrice"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["language", "cart", "products", "base", "cartItemsAmount"]),
    total() {
      let amount = 0,
        subtotal = 0,
        shipping = this.$t("cart.total.summary.free");

      if (Object.keys(this.products).length) {
        for (const item in this.cart) {
          if (this.cart[item].category === "craft_wallets") {
            amount += this.cart[item].price * this.cart[item].amount;
          } else {
            amount +=
              this.products[this.cart[item].category][this.cart[item].id]
                .price * this.cart[item].amount;
          }
        }
        subtotal = amount + (parseFloat(shipping) ? parseFloat(shipping) : 0);
      }

      return {
        amount: amount,
        shipping: shipping,
        subtotal: subtotal,
      };
    },
  },
  methods: {
    amountChange(newAmount) {
      let itemID = event.currentTarget.closest("[data-item]").dataset.item;
      if (event.type === "keyup") {
        if (
          (event.keyCode >= 97 || event.keCode <= 105 || event.keyCode == 8) &&
          event.currentTarget.value !== ""
        ) {
          this.$store.commit("ADD_ITEM_AMOUNT", {
            newAmount: event.currentTarget.value,
            itemID: itemID,
          });
        } else if (event.currentTarget.value !== "") {
          event.currentTarget.value = newAmount;
        }
      }
      if (event.type === "blur") {
        if (event.currentTarget.value == "") {
          event.currentTarget.value = 1;
          this.$store.commit("ADD_ITEM_AMOUNT", {
            newAmount: 1,
            itemID: itemID,
          });
        }
      }
      if (event.type === "click") {
        this.$store.commit("ADD_ITEM_AMOUNT", {
          newAmount: newAmount,
          itemID: itemID,
        });
      }
    },
    removeItem(itemID) {
      this.$store.commit("REMOVE_ITEM", itemID);
    },
    gotoOrderPage() {
      if (this.cartItemsAmount) {
        this.$store.commit("SET_PRODUCTS_TO_BUY");
        this.$router.push({ path: "/order" });
      }
    },
  },
  created() {},
  async mounted() {},
  watch: {},
};
</script>

<style lang="scss" scoped>
$transparentDarkMain: rgba(var(--c_dark-main), 0.3);
.cart {
  &__container {
    width: 100%;
    display: grid;
    grid-template: 1fr / 12fr 5fr;
    gap: 2rem;
  }

  .items {
    &__container {
      width: 100%;
      height: auto;
      position: relative;
      transition: all 0.5s ease;
      list-style: none;
    }

    .item {
      padding: 1.8rem;
      background-color: rgb(var(--c_light-main));
      margin-bottom: 1.5rem;
      border-radius: var(--border-radius);
      position: relative;

      &:last-child {
        margin-bottom: 0;
      }

      &__container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template: 1fr / 1fr 3fr;
        gap: 2rem;
      }

      &__image {
        width: 100%;
        height: 100%;
        padding: 0.5rem;
        border: 0.15rem solid rgba(var(--c_grey), 0.3);
        border-radius: var(--border-radius);
        background-color: rgb(var(--c_dark-main));
        overflow: hidden;
        aspect-ratio: 232 / 285;
      }

      .info {
        &__container {
        }

        .top-line {
          display: grid;
          grid-template: 1fr / 2fr 1fr;
          width: 100%;
          height: auto;
          margin-bottom: 1.2rem;
          margin-right: 1.5rem;
          padding-top: 0.3rem;

          &__left {
            & > *:not(:last-child) {
              margin-bottom: 0.9rem;
            }
          }

          &__title {
            color: rgb(var(--c_desaturated-graylish-blue));
            font: {
              family: "Montserrat Semibold";
            }
          }

          &__price {
          }

          &__color {
            span {
              color: rgb(var(--c_grey));
            }
            text-transform: capitalize;
          }

          &__right {
          }

          .amount {
            height: 3rem;
            &__container {
              display: flex;
              align-items: stretch;
              background-color: $transparentDarkMain;
              border-radius: var(--border-radius);
              height: 100%;
            }

            &__minus,
            &__plus {
              cursor: pointer;
              padding: 0 0.8rem;
              user-select: none;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            &__minus {
            }
            &__plus {
            }

            &__input {
              flex: 1;
              width: 5rem;
              background: transparent;
              border: 0;
              text-align: center;
              color: rgb(var(--c_grey));
              font: {
                family: "Montserrat Semibold";
                size: 1rem;
              }
            }
          }
        }

        &__description {
          color: rgb(var(--c_grey));
          font-size: 0.95rem;
        }
      }

      &:hover {
        .item__remove {
          opacity: 1;
        }
      }

      &__remove {
        position: absolute;
        width: 1rem;
        height: 1rem;
        top: 0.4rem;
        right: 0.4rem;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 0;

        &:hover {
          transform: scale(1.2);
          &::before,
          &::after {
            background-color: rgb(var(--c_dark-coral));
          }
        }

        &::before,
        &::after {
          content: "";
          width: 100%;
          height: 0.1rem;
          background-color: rgb(var(--c_grey));
          transform-origin: center center;
          position: absolute;
          top: 50%;
          left: 0;
          transition: all 0.3s ease;
        }

        &::before {
          transform: rotate(-45deg);
        }

        &::after {
          transform: rotate(45deg);
        }
      }
    }

    &__empty {
      height: 100%;
      width: 100%;
      display: flex;
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
  }

  .total {
    position: relative;

    &__container {
      position: sticky;
      top: 2rem;
    }

    &__body {
      background-color: rgb(var(--c_light-main));
      border-radius: var(--border-radius);
      padding: 1rem 2rem;
      margin-bottom: 1rem;

      & > * {
        padding: 1.3rem 0;
      }
    }

    &__title {
      color: rgb(var(--c_desaturated-graylish-blue));
      margin-bottom: 1rem;
      font: {
        family: "Montserrat Bold";
        size: 1.05rem;
      }
    }

    &__info-container {
      width: 100%;
      display: grid;
      grid-template: 1fr / 1fr 1fr;
      & > * {
        width: 100%;
        color: rgb(var(--c_light-grey));
        font: {
          family: "Montserrat Regular";
          size: 0.95rem;
        }

        &:not(:last-child) {
          margin-bottom: 0.7rem;
        }
      }
      & > *:nth-child(2) {
        text-align: right;
      }
    }

    &__input {
      width: 100%;
      text-align: center;
      background-color: rgb(var(--c_main));
      border: 0;
      height: 2rem;
      color: rgb(var(--c_light-grey));
      line-height: 1rem;
      font-size: 1rem;
      text-transform: uppercase;
    }

    &__summary,
    &__subtotal {
      border-bottom: 0.1rem solid rgba(var(--c_grey), 0.3);
    }

    &__order-button {
      width: 100%;
      padding: 1.2rem;
      text-transform: uppercase;
      background-color: rgb(var(--c_dark-coral));
      color: rgb(var(--c_white));
      border-radius: var(--border-radius);
      border: 0;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      z-index: 1;

      p {
        z-index: 3;
        text-align: center;
      }

      font: {
        family: "Montserrat Semibold";
        size: 1.1rem;
      }

      &:not(.disable):active {
        transform: scale(0.98);
      }
      &:not(.disable):hover {
        transform: scale(1.02);

        &::after {
          left: 100%;
          transition: all 0.5s ease;
        }
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

      &.disable {
        cursor: default;

        background-color: rgb(var(--c_grey));
      }
    }

    &__promocode {
      input {
        text-transform: unset;
      }
    }
  }
}

@media screen and (max-width: 1050px) {
  .cart {
    &__container {
      display: flex;
      flex-direction: column-reverse;
    }

    .items {
      .item {
        padding: 1.8rem;
        margin-bottom: 1.5rem;

        .info {
          .top-line {
            margin-bottom: 1.2rem;
            margin-right: 1.5rem;
            padding-top: 0.3rem;

            .amount {
              &__minus,
              &__plus {
                padding: 0 0.8rem;
              }

              &__input {
                width: 5rem;
                font: {
                  size: 1rem;
                }
              }
            }
          }

          &__description {
            font-size: 0.95rem;
          }
        }

        &:hover {
          .item__remove {
            opacity: 1;
          }
        }

        &__remove {
          width: 1rem;
          height: 1rem;
          top: 0.4rem;
          right: 0.4rem;
        }
      }

      &__empty {
        p {
          font: {
            size: 2rem;
          }
        }
      }
    }

    .total {
      margin-bottom: 3rem;

      &__container {
        position: relative;
        top: unset;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &__body {
        display: grid;
        grid-template: 1fr / 5fr 5fr 3fr;
        gap: 2rem;
        padding: 1.5rem 2.5rem;
        width: 100%;

        & > * {
          padding: 1rem 0;

          &:not(:last-child) {
            padding-right: 2rem;
            border-right: 0.1rem solid rgba(var(--c_grey), 0.3);
          }
        }
      }

      &__title {
        margin-bottom: 1rem;

        font: {
          size: 1.05rem;
        }
      }

      &__info-container {
        & > * {
          width: 100%;
          font: {
            size: 0.95rem;
          }

          &:not(:last-child) {
            margin-bottom: 0.7rem;
          }
        }
      }

      &__input {
        height: 2rem;
        line-height: 1rem;
        font-size: 1rem;
      }

      &__summary,
      &__subtotal {
        border-bottom: 0;
      }

      &__order-button {
        width: 50%;
        padding: 1.3rem;

        font: {
          size: 1.1rem;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .cart {
    font-size: 0.8rem;
    .items {
      .item {
        &__container {
          display: flex;
          flex-direction: column;
          gap: unset;
        }

        &__image {
          margin-bottom: 1.5rem;
        }

        .info {
          font-size: 1rem;

          &:hover {
            .info__remove {
              opacity: unset;
            }
          }
        }

        &__remove {
          width: 1.2rem;
          height: 1.2rem;
          opacity: 0.8;
        }
      }

      &__empty {
        p {
          font-size: 2rem;
        }
      }
    }

    .total {
      font-size: 0.9rem;

      &__body {
        display: block;

        & > * {
          &:not(:last-child) {
            padding-right: 0;
            border-right: 0;
            border-bottom: 0.1rem solid rgba(var(--c_grey), 0.3);
          }
        }
      }

      &__title {
        font-size: inherit;
      }

      &__input {
        height: 2.5rem;
        font-size: 1rem;
      }

      &__order-button {
        width: 100%;
        padding: 1.3rem;
        font-size: 1rem;
      }
    }
  }
}
</style>

