<template>
  <div>
    <Topbar/>
    <div id="app">
      <CategoryTree/>
      <nuxt id="main-body"/>
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
  * {
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
  }

  #app {
    position: relative;
    margin-top: 55px;
    display: flex;
    flex-direction: row;

    #main-body {
      flex-grow: 1;
    }
  }
</style>
