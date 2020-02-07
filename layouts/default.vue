<template>
  <div>
    <Topbar/>
    <div id="app">
      <Sidebar id="sidebar"/>
      <nuxt id="app-body"/>
    </div>
  </div>
</template>

<script>
  import Sidebar from "../components/Sidebar";
  import Topbar from "../components/Topbar";

  export default {
    components: {Sidebar, Topbar}
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
