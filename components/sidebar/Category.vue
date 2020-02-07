<template>
  <div @click="navigateToCategoryPage">
    {{category.name}}
    <div v-if="category.subCategories.length > 0" :id="category.name + '-childs'" :style="style">
      <Category v-for="subCategory in category.subCategories" :key="subCategory.name" :category="subCategory"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['category'],
    data() {
      return {
        isExpanded: false
      }
    },
    computed: {
      style() {
        return {
          display: this.isExpanded ? 'inherit' : 'none'
        }
      }
    },
    methods: {
      navigateToCategoryPage() {
        console.log('dhukse');
        this.isExpanded = true;
        this.$router.push('/category');
      }
    }
  }
</script>

<style lang="scss">
</style>
