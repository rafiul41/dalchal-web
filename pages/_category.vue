<template>
  <div>
    <div v-if="!selectedCategory.url">SORRY THERE IS NO SUCH CATEGORY LIKE THIS</div>
    <div v-else class="container">
      <img :src="selectedCategory.background" alt="">
      <div v-if="selectedCategory.isChild === false" class="subcategory">
        <div v-for="subCategory in selectedCategory.subCategories" :key="subCategory.name">
          <img @click="navigateToCategory(subCategory)" :src="subCategory.background" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
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
        this.$router.push(this.selectedCategory.url);
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

      if (!this.selectedCategory) {
        this.searchForCategory(category);
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
