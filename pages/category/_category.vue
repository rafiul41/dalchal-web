<template>
  <div>
    <div v-if="!selectedCategory.url">SORRY THERE IS NO SUCH CATEGORY LIKE THIS</div>
    <div v-else class="container">
      <img :src="selectedCategory.background" alt="">
      <div>{{selectedCategory.name}}</div>
      <div v-if="!isProductToBeShown" class="subcategory">
        <div v-for="subCategory in selectedCategory.subCategories" :key="subCategory.name">
          <img @click="navigateToCategory(subCategory)" :src="subCategory.background" alt="">
          <div>{{subCategory.name}}</div>
        </div>
      </div>
      <div v-else>
        <ProductList/>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductList from "../../components/product/ProductList";

  export default {
    components: {ProductList},
    data() {
      return {
        isProductToBeShown: false
      };
    },
    computed: {
      allCategories() {
        return this.$store.getters.loadedCategories;
      },
      selectedCategory() {
        return this.$store.getters.selectedCategory;
      }
    },
    methods: {
      navigateToCategory(category) {
        this.$store.commit('setSelectedCategory', category);
        this.$router.push('/category/' + this.selectedCategory.url);
      },
      searchForCategory(categoryId) {
        this.allCategories.forEach(category => {
          this.findAndAssignCategory(category, categoryId);
        });
      },
      findAndAssignCategory(category, categoryId) {
        if (category.url === categoryId) {
          this.$store.commit('setSelectedCategory', category);
          return;
        }
        if (category.subCategories.length === 0) {
          return;
        }
        category.subCategories.forEach(subCategory => {
          this.findAndAssignCategory(subCategory, categoryId);
        });
      }
    },
    created: function () {
      const category = this.$route.params.category;

      if (!this.selectedCategory.url) {
        this.searchForCategory(category);
      }

      if(this.selectedCategory.subCategories.length === 0) {
        this.isProductToBeShown = true;
      }

      if (this.selectedCategory.url) {
        this.$eventBus.$emit('unfoldCategory', category);
      }
    }
  }
</script>

<style lang="scss">
  .container {
    img {
      height: 150px;
      width: 250px;
    }

    .subcategory {
      flex-direction: row;
      justify-content: space-evenly;

      img {
        height: 100px;
        width: 180px;
      }
    }
  }
</style>
