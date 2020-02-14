<template>
  <div id="sidebar">
    <div id="sidebar-contents">
      <Category v-for="category in allCategories" :key="category.name" :category="category"/>
    </div>
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

        if (element.parentElement.id === 'sidebar-contents') {
          return;
        }

        this.unfoldCategory(element.parentElement.parentElement.id);
      }
    },
    mounted: function () {
      this.$eventBus.$on('unfoldCategory', (categoryId) => {
        console.log('dhukse category tree er event e', categoryId);
        this.foldAll();
        this.unfoldCategory(categoryId);
      })
    }
  }
</script>

<style lang="scss">
  #sidebar {
    min-width: 15%;

    #sidebar-contents {
      position: fixed;
      border-right: 1px solid #b0b0b6;
      width: 15%;
      height: 100%;
    }
  }
</style>
