<template>
  <div>
    <div id="profile-title">Your Profile</div>
    <label>Name</label>
    <div>{{userInfo.name}}</div>
    <label>Mobile Number</label>
    <div>{{userInfo.mobileNumber}}</div>
    <label>Addresses</label>
    <li v-for="address in userInfo.addresses" :key="address">{{address}}</li>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {
      this.$eventBus.$emit('foldAll');
    },
    middleware: ['auth']
  }
</script>

<style lang="scss">
  #profile-title {
    color: #50525a;
    text-align: center;
    font-weight: bold;
    font-size: x-large;
  }
  label {
    color: #8d8d8d;
    font-size: large;
    margin: 0;
  }
</style>
