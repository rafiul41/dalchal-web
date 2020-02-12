<template>
  <div id="sidebar">
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
        this.allCategories.forEach(category => {
          this.foldCategory(category.url);
        });
      },
      foldCategory(categoryId) {
        const element = document.getElementById(categoryId);
        if (element.children.length === 1) {
          return 0;
        }
        element.children[1].style.display = 'none';
        const children = element.children[1].children;
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          this.foldCategory(child.id);
        }
      },
      unfoldCategory(categoryId) {
        const element = document.getElementById(categoryId);

        if (element.children.length > 1) {
          element.children[1].style.display = 'inherit';
        }

        if (element.parentElement.id === 'sidebar') {
          return;
        }

        this.unfoldCategory(element.parentElement.parentElement.id);
      }
    },
    mounted: function () {
      this.$eventBus.$on('unfoldCategory', (categoryId) => {
        this.foldAll();
        this.unfoldCategory(categoryId);
      })
    }
  }
</script>

<style lang="scss">
  #sidebar {
    position: fixed;
    height: 100%;
    width: 15%;
    margin: 0;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
</style>
