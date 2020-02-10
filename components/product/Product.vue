<template>
  <div class="product">
    <img :src="productInfo.background" alt="">
    <div>{{productInfo.name}}</div>
    <button @click="addProductToCart(productInfo)">Add to bag</button>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';

  export default {
    props: ['productInfo'],
    computed: {
    },
    methods: {
      ...mapMutations(['addProductToCart'])
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
