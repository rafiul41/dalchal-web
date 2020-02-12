<template>
  <div class="top-bar">
    <div id="sidebar-toggle"></div>
    <nuxt-link id="dalchal-logo" to="/"></nuxt-link>
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
    background: #FDD670;
    border-bottom: 1px solid #8d8d8d;

    #sidebar-toggle {
      width: 5%;
    }

    #dalchal-logo {
      width: 10%;
      background: url('../static/chaldal-logo.png');
    }

    #search-box {
      width: 60%;
    }

    #others {
      width: 25%;
    }
  }
</style>
