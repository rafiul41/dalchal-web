<template>
  <div class="product">
    <img :src="productInfo.background" alt="">
    <div>{{productInfo.name}}</div>
    <button v-if="!cartProductList[productInfo._id]" @click="addProductToCart(productInfo)">Add to bag</button>
    <div v-else>
      <span><button @click="decreaseAmount(productInfo)">-</button></span>
      {{cartProductList[productInfo._id].inBag}} in bag
      <span><button @click="addProductToCart(productInfo)">+</button></span>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';

  export default {
    props: ['productInfo'],
    computed: {
      ...mapGetters(['cartProductList'])
    },
    methods: {
      ...mapMutations(['addProductToCart', 'decreaseAmount'])
    }
  }
</script>

<style lang="scss">
  .product {
    text-align: center;

    img {
      height: 100px;
      width: 180px;
    }
  }
</style>
