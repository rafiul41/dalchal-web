<template>
  <div class="row">
    <div id="sidebar-toggle" class="col-1"></div>
    <div id="dalchal-logo" class="col-2">DALCHAL LOGO</div>
    <div id="search-box" class="col-7">
      <input v-model="searchString" v-on:keyup="navigateToSearch" id="search-input">
    </div>
    <div id="others" class="col-2"></div>
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
      }
    }
  }
</script>

<style lang="scss">
  .row {
    height: 55px;
    #sidebar-toggle {
      background: orange;
    }
    #dalchal-logo {
      background: rebeccapurple;
    }
    #search-box {
      background: aquamarine;
    }
    #others {
      background: aqua;
    }
  }
</style>
