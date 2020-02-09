<template>
  <div>
    <Topbar/>
    <div id="app">
      <CategoryTree id="sidebar"/>
      <nuxt id="app-body"/>
      <Cart/>
    </div>
  </div>
</template>

<script>
  import CategoryTree from "../components/sidebar/CategoryTree";
  import Topbar from "../components/Topbar";
  import Cart from "../components/cart/Cart";

  export default {
    components: {CategoryTree, Topbar, Cart}
  }
</script>

<style lang="scss">
  #app {
    display: flex;
    justify-content: space-between;

    #sidebar {
      max-width: 300px;
      margin: 0
    }
  }
</style>
