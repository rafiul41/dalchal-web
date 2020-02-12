<template>
  <div class="product-list">
    <Product v-for="product in loadedProducts" :key="product.code" :productInfo="product"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import Product from "./Product";
  import {mapGetters} from 'vuex';

  export default {
    components: {Product},
    computed: {
      ...mapGetters(['selectedCategory', 'loadedProducts'])
    },
    methods: {
      fetchProducts() {
        return axios
          .get(process.env.apiUrl + "/product?categoryId=" + this.selectedCategory._id)
          .then(response => {
            this.$store.commit('setProducts', response.data.data);
            return Promise.resolve();
          })
          .catch(err => {
            return Promise.reject(err);
          })
      }
    },
    created() {
      this.fetchProducts();
    }
  }
</script>

<style lang="scss">
  .product-list {
    display: flex;
    margin: 10px;
    align-items: flex-start;
    text-align: center;
    flex-wrap: wrap;
  }
</style>
