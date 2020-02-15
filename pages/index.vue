<template>
  <div>
    <div class="search-text">
      Please search for any products on the search bar or navigate the category from left.
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.$eventBus.$emit('foldAll');
    }
  }
</script>

<style>
  .search-text {
    font-weight: bold;
    color: #6c7078;
    font-size: larger;
    display: flex;
    justify-content: center;
    text-align: center;
  }
</style>

