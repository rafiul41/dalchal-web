<template>
  <div class="top-bar">
    <div id="sidebar-toggle"></div>
    <div id="dalchal-logo">
      <nuxt-link to="/">DALCHAL LOGO</nuxt-link>
    </div>
    <div id="search-box">
      <input v-model="searchString" v-on:keyup="navigateToSearch" id="search-input">
    </div>
    <div id="others"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchString: ''
      }
    },
    methods: {
      navigateToSearch() {
        const searchUrl = '/search/' + this.searchString;
        this.$router.push(searchUrl);
      },
      clearSearchString() {
        this.searchString = '';
      }
    },
    created() {
      this.$eventBus.$on('clearSearchString', () => {
        this.clearSearchString();
      })
    }
  }
</script>

<style lang="scss">
  .top-bar {
    z-index: 1;
    height: 55px;
    width: 100%;
    position: fixed;
    display: flex;
    margin-top: -55px;
    #sidebar-toggle {
      background: orange;
      width: 5%;
    }
    #dalchal-logo {
      background: rebeccapurple;
      width: 10%;
    }
    #search-box {
      background: aquamarine;
      width: 60%;
    }
    #others {
      background: aqua;
      width: 25%;
    }
  }
</style>
