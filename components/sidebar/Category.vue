<template>
  <div :id="category.url" @click="navigateToCategoryPage($event)">
    {{category.name}}
    <div v-if="category.subCategories.length > 0" :id="category.url + '-childs'" :style="{display: 'none'}">
      <Category v-for="subCategory in category.subCategories" :key="subCategory.name" :category="subCategory"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['category'],
    methods: {
      navigateToCategoryPage(event) {
        event.stopPropagation();
        this.$router.push(this.category.url);
        this.$store.commit('setSelectedCategory', this.category);
      }
    }
  }
</script>

<style lang="scss">
</style>
