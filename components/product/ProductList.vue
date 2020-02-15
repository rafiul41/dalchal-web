<template>
  <div>
    <div v-if="!isProductLoaded" class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" class="m-5"></b-spinner>
    </div>
    <div class="product-list" v-else>
      <Product v-for="product in loadedProducts" :key="product.code" :productInfo="product"/>
    </div>
  </div>
</template>

<script>
  import Product from "./Product";
  import {mapGetters} from 'vuex';

  export default {
    data() {
      return {
        isProductLoaded: false
      }
    },
    components: {Product},
    computed: {
      ...mapGetters(['selectedCategory', 'loadedProducts'])
    },
    methods: {
      fetchProducts() {
        return this.$axios
          .get("/product?categoryId=" + this.selectedCategory._id)
          .then(response => {
            this.$store.commit('setProducts', response.data.data);
            this.isProductLoaded = true;
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
