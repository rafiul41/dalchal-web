<template>
  <div>
    {{category.name}}
    <div v-if="category.subCategories.length > 0" :id="category.name + '-childs'">
      <Category v-for="subCategory in category.subCategories" :key="subCategory.name" :category="subCategory"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Category',
    props: ['category']
  }
</script>

<style lang="scss">
</style>
