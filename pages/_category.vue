<template>
  <div>
    <div v-if="!isCategoryPresent">SORRY THERE IS NO SUCH CATEGORY LIKE THIS</div>
    <div v-else>HERE YOU GO :p</div>
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
    data() {
      return {
        isCategoryPresent: false
      }
    },
    methods: {
      searchForCategory(categoryId) {
        this.allCategories.forEach(category => {
          this.findCategory(category, categoryId);
        });
      },
      findCategory(category, categoryId) {
        if (category.url === categoryId) {
          this.isCategoryPresent = true;
          return;
        }
        category.subCategories.forEach(subCategory => {
          this.findCategory(subCategory, categoryId);
        });
      }
    },
    created: function () {
      const category = this.$route.params.category;

      if (!this.selectedCategory) {
        this.searchForCategory(category);
      } else {
        this.isCategoryPresent = true;
      }

      if (this.isCategoryPresent) {
        this.$eventBus.$emit('unfoldCategory', category);
      }
    }
  }
</script>

<style lang="scss">
</style>
