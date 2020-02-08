<template>
  <div class="product">
    <img :src="productInfo.background" alt="">
  </div>
</template>

<script>
  export default {
    props: ['productInfo']
  }
</script>

<style lang="scss">
  .product {
    img {
      height: 100px;
      width: 180px;
    }
  }
</style>
