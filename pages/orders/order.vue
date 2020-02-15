<template>
  <div>
    HERE IS A LIST OF ALL YOUR ORDERS
  </div>
</template>

<script>
  export default {
    created() {
      this.$eventBus.$emit('foldAll');
    }
  }
</script>

<style lang="scss">
</style>
