<template>
  <div>THIS IS A CATEGORY PAGE</div>
</template>

<script>
  export default {
    methods: {
      printFunc() {
        console.log('ajaira');
        this.heyGirl();
      },
      heyGirl() {
        console.log('hey man!')
      }
    },
    created: function () {
      const category = this.$route.params.category;
      this.$eventBus.$emit('unfoldCategory', category);
    }
  }
</script>

<style lang="scss">
</style>
