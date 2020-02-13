<template>
  <div class="top-bar">
    <div id="sidebar-toggle">
      <div @click="toggleNavBar" id="toggle-sticks">
        <div class="toggle-stick"></div>
        <div class="toggle-stick"></div>
        <div class="toggle-stick"></div>
      </div>
    </div>
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
      },
      toggleNavBar() {
        let sidebarLeftProperty = document.getElementById('sidebar').style.left;
        if(sidebarLeftProperty === '-15%') {
          document.getElementById('sidebar').style.left = '0';
          document.getElementById('main-body').style.width = '70%';
          document.getElementById('main-body').style.left = '-15%';
        } else {
          document.getElementById('sidebar').style.left = '-15%';
          document.getElementById('main-body').style.width = '80%';
          document.getElementById('main-body').style.left = '0';
        }
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

      #toggle-sticks {
        margin: 5px;
        padding-left: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;

        .toggle-stick {
          margin: 3px;
          width: 20px;
          height: 2px;
          background: black;
        }

        &:hover {
          background: darken(#FDD670, 10);
        }
      }
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
