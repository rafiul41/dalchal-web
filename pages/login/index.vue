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
  import {config} from './../../static/swalConfig';

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
        this.type = 'customLoading';
        this.$swal.fire({title: 'Please wait', allowOutsideClick: false});
        this.$swal.showLoading();
        return this.$auth.loginWith('local', {
          data: {
            mobileNumber: this.mobileNumber,
            password: this.password
          }
        })
          .then(() => {
            this.$swal.close();
            this.$swal.fire(config.success('You are successfully logged in'));
            return this.fetchUser(this.mobileNumber);
          })
          .catch(err => {
            this.$swal.fire(config.error);
            console.log(err);
          })
      }
    }
  }
</script>

<style lang="scss">
</style>
