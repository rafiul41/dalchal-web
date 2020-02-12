<template>
  <div class="product-contents">
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
  .product-contents {
    img {
      margin: 10px;
      height: 135px;
      width: 220px;
    }
  }
</style>
