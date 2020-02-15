<template>
  <div>
    <div id="register-title">Register</div>
    <form class="form-group card-body" @submit.prevent="onSubmit">
      <label class="col-form-label">Name</label><br>
      <input class="form-control" id="name" type="text" v-model="name" placeholder="Please enter your name"><br>
      <label class="col-form-label">Mobile Number</label><br>
      <input class="form-control" id="mobile-number" type="text" v-model="mobileNumber"
             placeholder="Please enter your mobile number"><br>
      <label class="col-form-label">Password</label><br>
      <input class="form-control" id="password" type="password" v-model="password"
             placeholder="Please enter your password"><br>
      <label class="col-form-label">Address(es)</label><br>
      <div class="address-input" v-for="(address, index) in addresses" :key="index">
        <div class="address-info">
          <input class="form-control" type="text" placeholder="Please enter an address" v-model="addresses[index]">
          <img @click="addresses.splice(index, 1)" src="./../../static/cross.png">
        </div>
      </div>
      <button type="button" @click="addresses.push('')" class="btn-block">Add New Address</button>
      <br>
      <br><br>
      <button class="btn-lg btn-block">Register</button>
    </form>
  </div>
</template>

<script>
  import {config} from "../../static/swalConfig";

  export default {
    data() {
      return {
        name: '',
        password: '',
        mobileNumber: '',
        addresses: [''],
        isFormValid: false
      }
    },
    methods: {
      onSubmit() {
        this.$swal.fire('Please wait');
        this.$swal.showLoading();
        return this.$axios.post('/user/register', {
            name: this.name,
            mobileNumber: this.mobileNumber,
            password: this.password,
            addresses: this.addresses
          })
          .then((response) => {
            if(response.data.statusCode !== 200) {
              return Promise.reject(response.data.message);
            }
            this.$swal.fire(config.success('You are successfully registered. Please sign-in'));
            this.$router.push('/login');
          })
          .catch(err => {
            this.$swal.fire(config.error);
          })
      }
    }
  }
</script>

<style lang="scss">
  #register-title {
    font-weight: bold;
    font-size: x-large;
    text-align: center;
  }

  .form-group {
    margin: 20px;

    .address-input {
      text-align: right;

      .address-info {
        display: flex;
        margin: 10px;

        img {
          margin-top: 5px;
          height: 30px;
          width: 30px;
          cursor: pointer;
        }
      }
    }
  }
</style>
