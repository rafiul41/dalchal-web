<template>
  <div>
    <div class="sign-in">Sign In</div>
    <form @submit.prevent="onSubmit">
      <label>Mobile Number</label><br>
      <input class="sign-in-input" type="text" v-model="mobileNumber" placeholder="Please enter your mobile number"><br>
      <label>Password</label><br>
      <input class="sign-in-input" type="text" v-model="password" placeholder="Please enter your password"><br>
      <button class="btn-lg">Sign In</button>
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
        return this.$auth
          .loginWith('local', {
            data: {
              mobileNumber: this.mobileNumber,
              password: this.password
            }
          })
          .then(() => {
            return this.fetchUser(this.mobileNumber);
          })
          .then(() => {
            this.$swal.close();
            this.$swal.fire(config.success('You are successfully logged in'));
          })
          .catch(() => {
            this.$swal.close();
            this.$swal.fire(config.error);
          })
      }
    }
  }
</script>

<style lang="scss">
  .sign-in {
    text-align: center;
    font-weight: bold;
    font-size: x-large;
  }

  .sign-in-input {
    width: 40%;
  }
</style>
