<template>
  <div>
    <div v-if="searchedProducts.length === 0" class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" class="m-5"></b-spinner>
    </div>
    <div class="searched-products">
      <Product v-for="product in searchedProducts" :key="product.code" :productInfo="product"/>
    </div>
  </div>
</template>

<script>
  import Product from "../../components/product/Product";

  export default {
    data() {
      return {
        searchedProducts: []
      }
    },
    components: {Product},
    methods: {
      fetchSearchedProducts() {
        this.$axios.get('/product/search?searchString=' + this.$route.params.searchedString)
          .then(response => {
            this.searchedProducts = response.data.data;
            return Promise.resolve();
          })
          .catch(err => {
            console.log(err);
            return Promise.reject(err);
          })
      }
    },
    created() {
      this.fetchSearchedProducts();
    }
  }
</script>

<style lang="scss">
  .searched-products {
    display: flex;
    margin: 10px;
    align-items: flex-start;
    text-align: center;
    flex-wrap: wrap;
  }
</style>
