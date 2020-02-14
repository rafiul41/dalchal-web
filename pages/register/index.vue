<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label>Name</label>
      <input id="name" type="text" v-model="name" placeholder="Please enter your name">
      <label>Mobile Number</label>
      <input id="mobile-number" type="text" v-model="mobileNumber" placeholder="Please enter your mobile number">
      <label>Password</label>
      <input id="password" type="text" v-model="password" placeholder="Please enter your password">
      <button>Register</button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: '',
        password: '',
        mobileNumber: ''
      }
    },
    methods: {
      onSubmit() {
        return this.$axios.post('/user/register', {
          name: this.name,
          mobileNumber: this.mobileNumber,
          password: this.password
        })
          .then((response) => {
            console.log(response);
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
