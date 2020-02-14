<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label>Mobile Number</label>
      <input id="mobile-number" type="text" v-model="mobileNumber" placeholder="Please enter your mobile number">
      <label>Password</label>
      <input id="password" type="text" v-model="password" placeholder="Please enter your password">
      <button>Sign In</button>
    </form>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    data() {
      return {
        password: '',
        mobileNumber: ''
      }
    },
    methods: {
      ...mapActions(['fetchUser']),
      onSubmit() {
        return this.$auth.loginWith('local', {
          data: {
            mobileNumber: this.mobileNumber,
            password: this.password
          }
        })
          .then(() => {
            return this.fetchUser(this.mobileNumber);
          })
          .then(response => {
            console.log('IN LOGIN PAGE', response);
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>

<style lang="scss">
</style>
