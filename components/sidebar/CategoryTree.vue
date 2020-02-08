<template>
  <div class="container">
    <Category v-for="category in allCategories" :key="category.name" :category="category"/>
  </div>
</template>

<script>
  import Category from "./Category";

  export default {
    components: {Category},
    computed: {
      allCategories() {
        return this.$store.getters.loadedCategories;
      }
    },
    methods: {
      foldAll() {
      },
      unfoldCategory(categoryId) {
        const element = document.getElementById(categoryId);

        if (element.children.length > 0) {
          element.children[0].style.display = 'inherit';
        }

        if (element.parentElement.id === 'sidebar') {
          return;
        }

        this.unfoldCategory(element.parentElement.parentElement.id);
      }
    },
    beforeMount: function () {
      this.$eventBus.$on('foldAll', () => {
        this.foldAll();
      });
      this.$eventBus.$on('unfoldCategory', (categoryId) => {
        this.unfoldCategory(categoryId);
      })
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
  }
</style>
