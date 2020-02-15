<template>
  <div class="product-contents">
    <img :src="productInfo.background" alt="">
    <div class="prod-info">
      <div class="info-1">{{productInfo.name}}</div>
      <div class="info-2">{{productInfo.weight}}</div>
      <div v-if="!isPromoApplied" class="info-3">{{'Tk.' + productInfo.cost}}</div>
      <div v-else class="info-3">{{'Tk. ' + ((100 - promoRate)/100) * productInfo.cost}}
        <strike>{{'Tk.' + productInfo.cost}}</strike></div>
    </div>
    <button class="add-to-cart-btn" v-if="!cartProductList[productInfo._id]" @click="addProductToCart(productInfo)">
      Add to bag
    </button>
    <div class="add-more-btn" v-else>
      <span><button @click="decreaseAmount(productInfo)">-</button></span>
      <div class="in-bag-count">{{cartProductList[productInfo._id].inBag}} in bag</div>
      <span><button @click="addProductToCart(productInfo)">+</button></span>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    props: ['productInfo'],
    computed: {
      ...mapGetters(['cartProductList', 'isPromoApplied', 'promoRate'])
    },
    methods: {
      ...mapMutations(['addProductToCart', 'decreaseAmount'])
    }
  }
</script>

<style lang="scss">
  .product-contents {
    color: #50525a;
    margin-bottom: 20px;

    img {
      margin: 10px;
      height: 150px;
      width: 233px;
    }

    .prod-info {
      .info-1 {
        font-size: larger;
      }

      .info-2 {
        font-size: small;
      }

      .info-3 {
        font-size: large;
        font-weight: bold;
      }
    }

    .add-to-cart-btn {
      width: 200px;
      background: white;
      color: rgba(255, 0, 0, 0.53);
      font-weight: bold;

      &:hover {
        box-shadow: 0 0 10px #c4c4c4;
      }
    }

    .add-more-btn {
      display: flex;
      justify-content: space-around;

      span {
        button {
          width: 35px;
          height: 28px;
        }
      }

      .in-bag-count {
        color: white;
        font-weight: bold;
        border: 1px solid #b0b0b6;
        flex-grow: 1;
        max-width: 130px;
        background: rgba(255, 0, 0, 0.64);
      }
    }
  }
</style>
