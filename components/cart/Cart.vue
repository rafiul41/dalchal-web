<template>
  <div id="cart">
    <div id="cart-contents">
      <div class="heading">
        {{Object.keys(cartProductList).length}} Items
      </div>
      <div id="cart-product-list">
        <div v-for="product in cartProductList" :key="product._id" class="cart-products">
          <div class="product-count">{{product.inBag}}</div>
          <div class="product-info">
            <img :src="product.background" alt="productImage">
            <div class="product-heading-weight">
              <div class="product-heading">{{product.name}}</div>
              <div class="product-weight">{{product.weight}}</div>
            </div>
          </div>
          <div class="product-cost">{{product.cost * product.inBag}}</div>
          <img @click="removeItem(product)" class="cross-button" src="../../static/cross.png" alt="cross">
        </div>
      </div>
      <div class="cart-footer">
        <button id="order-button">Place Order</button>
        <div id="total-cost">Tk: {{totalCost}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    computed: {
      ...mapGetters(['cartProductList', 'totalCost'])
    },
    methods: {
      ...mapMutations(['removeItem'])
    }
  }
</script>

<style lang="scss">
  #cart {
    min-width: 17%;

    #cart-contents {
      display: flex;
      position: fixed;
      flex-direction: column;
      height: 100%;
      width: 17%;
      border-left: 1px solid #b0b0b6;
      box-shadow: -5px -1px 10px #aaafbb;

      .heading {
        background: rgba(170, 175, 187, 0.54);
        height: 40px;
        padding-top: 10px;
        padding-left: 10px;
        font-family: Arial, serif;
        font-weight: bold;
        text-align: left;
      }

      #cart-product-list {
        overflow: auto;
        height: 80%;
        .cart-products {
          color: #50525a;
          height: 55px;
          display: flex;
          border-bottom: 1px solid #c8c8ce;

          .product-count {
            width: 35px;
            text-align: center;
            padding-top: 15px;
          }

          .product-info {
            padding-left: 15px;
            display: flex;

            img {
              padding-top: 10px;
              height: 45px;
              width: 40px;
            }

            .product-heading-weight {
              width: 120px;
              padding-left: 20px;
              flex-direction: column;

              .product-heading {
                padding-top: 5px;
                font-size: small;
              }

              .product-weight {
                font-size: smaller;
              }
            }
          }

          .product-cost {
            width: 30px;
            padding-top: 10px;
          }

          .cross-button {
            height: 18px;
            width: 18px;
            margin-top: 14px;
            margin-left: 30px;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .cart-footer {
        bottom: 0;
        display: flex;
        height: 100px;
        align-items: center;
        justify-content: center;

        #order-button {
          color: white;
          height: 50px;
          width: 150px;
          background: rgba(255, 0, 0, 0.57);
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        #total-cost {
          color: white;
          height: 45px;
          width: 100px;
          text-align: center;
          padding-top: 10px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          background: rgba(175, 0, 0, 0.7);
        }
      }
    }
  }
</style>
