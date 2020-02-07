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
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
  }
</style>
