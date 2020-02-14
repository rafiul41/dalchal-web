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
      <input v-model="searchString" placeholder="Search for products (e.g. milk, alu, eggs)"
             v-on:keyup="navigateToSearch" id="search-input">
    </div>
    <div v-if="$auth.loggedIn" class="logged-in-buttons">
      <div id="user-button">{{$auth.user.name}}</div>
      <div id="logout-button">Logout</div>
    </div>
    <div class="logged-out-buttons">
      <div id="register-button">Register</div>
      <div @click="navigateToLogin" id="sign-in-button">Sign In</div>
    </div>
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
      navigateToLogin() {
        this.$router.push('/login');
      },
      navigateToSearch() {
        const searchUrl = '/search/' + this.searchString;
        this.$router.push(searchUrl);
      },
      clearSearchString() {
        this.searchString = '';
      },
      toggleNavBar() {
        const sidebarElement = document.getElementById('sidebar');
        if (sidebarElement.style.display === 'none') {
          sidebarElement.style.display = 'flex';
        } else {
          sidebarElement.style.display = 'none';
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
      background-repeat: no-repeat;
    }

    #search-box {
      display: flex;
      width: 65%;

      input {
        margin: 7px;
        padding: 10px;
        flex-grow: 1;
        border-radius: 5px;
      }
    }

    .logged-in-buttons {
      display: flex;
      margin-left: 40px;
      margin-top: 15px;
      color: #535353;
      font-weight: bold;
      cursor: pointer;
      #user-button {
        margin-left: 20px;

      }
      #logout-button {
        margin-left: 30px;
      }
    }
    .logged-out-buttons {
      display: flex;
      margin-left: 40px;
      margin-top: 15px;
      color: #535353;
      font-weight: bold;
      cursor: pointer;
      #register-button {
        margin-left: 20px;
      }
      #sign-in-button {
        margin-left: 30px;
      }
    }
  }
</style>
