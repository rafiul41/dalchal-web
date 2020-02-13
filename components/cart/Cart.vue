<template>
  <div class="cart">
    <div class="heading">Cart</div>
    <div>No. of Items: {{Object.keys(cartProductList).length}}</div>
    <div v-for="product in cartProductList" :key="product._id">
      {{product.name}} {{product.inBag}}
    </div>
    <div>total Cost: {{totalCost}}</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters(['cartProductList', 'totalCost'])
    }
  }
</script>

<style lang="scss">
  .cart {
    height: 95%;
    flex-basis: 15%;
    right: 0;
    top: 55px;

    .heading {
      text-align: center;
    }
  }
</style>
