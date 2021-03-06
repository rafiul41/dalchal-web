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
    <div v-if="getUserName" class="logged-in-buttons">
      <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
          {{getUserName}}
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a @click="$router.push('/profile')" class="dropdown-item">Your Profile</a>
          <a @click="$router.push('/orders')" class="dropdown-item">Your Orders</a>
        </div>
      </div>
      <div @click="logout()" id="logout-button">Logout</div>
    </div>
    <div v-else class="logged-out-buttons">
      <div @click="$router.push('/register')" id="register-button">Register</div>
      <div @click="$router.push('/login')" id="sign-in-button">Sign In</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        searchString: ''
      }
    },
    computed: {
      ...mapGetters(['getUserName']),
    },
    methods: {
      ...mapMutations(['clearUser']),
      logout() {
        this.$auth.logout();
        this.clearUser();
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

      .dropdown {
        align-self: center;
        box-sizing: border-box;
        margin-bottom: 15px;

        button {
          background: rgba(255, 133, 19, 0.88);
        }

        &:hover > .dropdown-menu {
          display: block;
        }

        & > .dropdown-toggle:active {
          pointer-events: none;
        }

        .dropdown-menu {
          top: 93%
        }
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
