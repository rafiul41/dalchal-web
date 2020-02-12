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
        this.$store.commit('setSelectedCategory', this.category);
        this.$eventBus.$emit('clearSearchString');
        this.$router.push('/category/' + this.category.url);
      }
    }
  }
</script>

<style lang="scss">
</style>
