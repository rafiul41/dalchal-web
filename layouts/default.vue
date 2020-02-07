<template>
  <div>
    <Topbar/>
    <div id="app">
      <CategoryTree id="sidebar"/>
      <nuxt id="app-body"/>
    </div>
  </div>
</template>

<script>
  import CategoryTree from "../components/sidebar/CategoryTree";
  import Topbar from "../components/Topbar";

  export default {
    components: {CategoryTree, Topbar}
  }
</script>

<style lang="scss">
  #app {
    display: flex;

    #sidebar {
      max-width: 300px;
      margin: 0
    }
  }
</style>
