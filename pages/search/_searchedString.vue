<template>
  <div>
    <Product v-for="product in searchedProducts" :key="product.code" :productInfo="product"/>
  </div>
</template>

<script>
  import axios from 'axios'
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
        axios.get(process.env.apiUrl + '/product/search?searchString=' + this.$route.params.searchedString)
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

</style>
