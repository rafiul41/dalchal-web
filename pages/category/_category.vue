<template>
  <div>
    <div v-if="!selectedCategory.url">SORRY THERE IS NO SUCH CATEGORY LIKE THIS</div>
    <div v-else class="main-category">
      <div class="main-category-contents">
        <img :src="selectedCategory.background" alt="">
        <div class="main-category-title">
          <div class="divider"></div>
          {{selectedCategory.name}}
          <div class="divider"></div>
        </div>
      </div>
      <div v-if="!isProductToBeShown" class="subcategory">
        <div class="subcategory-content" v-for="subCategory in selectedCategory.subCategories" :key="subCategory.name">
          <img @click="navigateToCategory(subCategory)" :src="subCategory.background" alt="">
          <div @click="navigateToCategory(subCategory)">{{subCategory.name}}</div>
        </div>
      </div>
      <div v-else>
        <ProductList/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';
  import ProductList from "../../components/product/ProductList";

  export default {
    components: {ProductList},
    data() {
      return {
        isProductToBeShown: false
      };
    },
    computed: {
      ...mapGetters(['loadedCategories', 'selectedCategory'])
    },
    methods: {
      ...mapMutations(['clearSelectedCategory', 'setSelectedCategory']),
      navigateToCategory(category) {
        this.setSelectedCategory(category);
        this.$router.push('/category/' + this.selectedCategory.url);
      },
      searchForCategory(categoryId) {
        this.loadedCategories.forEach(category => {
          this.findAndAssignCategory(category, categoryId);
        });
      },
      findAndAssignCategory(category, categoryId) {
        if (category.url === categoryId) {
          this.setSelectedCategory(category);
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

      if (this.selectedCategory.url && this.selectedCategory.subCategories.length === 0) {
        this.isProductToBeShown = true;
      }
    },
    mounted() {
      if (this.selectedCategory.url) {
        this.$eventBus.$emit('unfoldCategory', this.$route.params.category);
      }
    }
  }
</script>

<style lang="scss">
  .main-category {

    .main-category-contents {
      font-family: Arial;
      font-size: x-large;
      color: #6c7078;

      .main-category-title {
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        .divider {
          margin-top: 20px;
          height: 1px;
          width: 35%;
          background: #50525a;
        }
      }

      img {
        height: 200px;
        width: 500px;
      }

      text-align: center;
    }

    .subcategory {
      display: flex;
      margin: 10px;
      align-items: flex-start;
      text-align: center;

      img {
        margin: 10px;
        height: 170px;
        width: 260px;
      }

      .subcategory-content {
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
</style>
