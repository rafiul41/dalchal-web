<template>
  <div class="category-btn" :id="category.url" @click="navigateToCategoryPage($event)">
    <div class="category-btn-name">{{category.name}}</div>
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
  .category-btn {
    margin-left: 15px;
    .category-btn-name {
      &:hover {
        cursor: pointer;
        background-image: linear-gradient(to right, white, grey);
      }
    }
  }
</style>
