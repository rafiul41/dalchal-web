<template>
  <div class="cart">
    <div class="heading">Cart</div>
    <div>{{cartProductList.length}} Items</div>
    <div v-for="product in cartProductList" :key="product._id">
      {{product.name}} {{product.inBag}}
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters(['cartProductList'])
    }
  }
</script>

<style lang="scss">
  .cart {
    height: 95vh;
    width: 30vh;

    .heading {
      text-align: center;
    }
  }
</style>
