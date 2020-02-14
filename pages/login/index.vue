<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label>Name</label>
      <input id="name" type="text" v-model="name" placeholder="Please enter your name">
      <label>Password</label>
      <input id="password" type="text" v-model="password" placeholder="Please enter your password">
      <label>Mobile Number</label>
      <input id="mobile-number" type="text" v-model="mobileNumber" placeholder="Please enter your mobile number">
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
        console.log(this.name, this.password, this.mobileNumber)
      }
    }
  }
</script>

<style lang="scss">
</style>
