<template>
  <div>
    <div class="sign-in">Sign In</div>
    <form class="form-group card-body" @submit.prevent="onSubmit">
      <label class="col-form-label">Mobile Number</label><br>
      <input class="form-control" type="text" v-model="mobileNumber" placeholder="Please enter your mobile number"><br>
      <label class="col-form-label">Password</label><br>
      <input class="form-control" type="password" v-model="password" placeholder="Please enter your password"><br>
      <button class="btn-lg btn-block">Sign In</button>
    </form>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import {config} from './../../static/swalConfig';

  export default {
    data() {
      return {
        password: '',
        mobileNumber: ''
      }
    },
    methods: {
      ...mapMutations(['setUserInfo']),
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
            return this.$axios.get('/user/' + this.mobileNumber);
          })
          .then((response) => {
            if(response.data.statusCode !== 200 || !response.data.data) {
              return Promise.reject(response.data.message);
            }
            this.setUserInfo(response.data.data);
            this.$swal.close();
            this.$swal.fire(config.success('You are successfully logged in'));
          })
          .catch((err) => {
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
</style>
