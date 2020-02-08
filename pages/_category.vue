<template>
  <div>THIS IS A CATEGORY PAGE</div>
</template>

<script>
  export default {
    methods: {
    },
    created: function () {
      const category = this.$route.params.category;
      this.$eventBus.$emit('unfoldCategory', category);
    }
  }
</script>

<style lang="scss">
</style>
