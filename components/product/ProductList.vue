<template>
  <div>
    <Product v-for="product in loadedProducts" :key="product.code" :productInfo="product"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import Product from "./Product";

  export default {
    components: {Product},
    computed: {
      loadedProducts() {
        return this.$store.getters.loadedProducts;
      }
    },
    fetch(context) {
      console.log('dhukse !!!!');
      return axios
        .get(process.env.apiUrl + "/products", {
          query: {categoryId: this.$store.getters.selectedCategory.id}
        })
        .then(response => {
          context.store.commit('setProducts', response.data.data);
          return Promise.resolve();
        })
        .catch(err => {
          return Promise.reject(err);
        })
    }
  }
</script>

<style lang="scss">

</style>
