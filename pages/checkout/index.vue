<template>
  <div class="checkout">
    <div id="checkout-title">Checkout</div>
    <div>Preferred Address</div>
    <b-form-select v-model="selectedAddress" :options="userAddresses" class="mb-3">
      <template v-slot:first>
        <b-form-select-option :value="null" disabled>-- Please select among your addresses --</b-form-select-option>
      </template>
    </b-form-select>
    <div>Preferred Date</div>
    <b-form-select v-model="selectedDate" class="mb-3">
      <template v-slot:first>
        <b-form-select-option :value="null" disabled>-- Please select your date --</b-form-select-option>
      </template>
      <b-form-select-option v-for="date in dateOptions" :key="date.value" :value="date.value">
        {{date.toShow}}
      </b-form-select-option>
    </b-form-select>
    <div>Preferred Time Range</div>
    <b-form-select v-model="selectedTimeRange" class="mb-3">
      <template v-slot:first>
        <b-form-select-option :value="null" disabled>-- Please select perferred time range --</b-form-select-option>
      </template>
      <b-form-select-option v-for="timeRange in timeRanges" :key="timeRange" :value="timeRange">
        {{timeRange}}
      </b-form-select-option>
    </b-form-select>
    <div id=""></div>
    <button @click="submitOrder">Place Order</button>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {constants} from "../../static/constants";
  import {config} from "../../static/swalConfig";

  export default {
    data() {
      return {
        selectedAddress: null,
        selectedDate: null,
        selectedTimeRange: null,
      }
    },
    computed: {
      ...mapGetters(['userAddresses', 'cartProductList', 'userId', 'totalCost', 'isPromoApplied', 'promoRate']),
      dateOptions() {
        const dates = [];
        for (let ind = 0; ind < 5; ind++) {
          const neededDate = new Date((new Date()).setDate((new Date()).getDate() + ind));
          dates.push({
            value: neededDate.toISOString(),
            toShow: neededDate.getDate() + ' ' + constants.monthNames[neededDate.getMonth()]
          });
        }
        return dates;
      },
      timeRanges() {
        return constants.timeRanges;
      }
    },
    methods: {
      ...mapMutations(['clearCart']),
      submitOrder() {
        const order = {
          date: this.selectedDate,
          timeRange: this.selectedTimeRange,
          address: this.selectedAddress,
          userId: this.userId,
          cart: this.cartProductList,
          totalCost: this.totalCost
        };

        if (this.isPromoApplied) {
          order.discount = totalCost * (this.promoRate / 100);
          order.totalCost = order.totalCost - order.discount;
        }

        this.$swal.fire('Please wait');
        this.$swal.showLoading();
        return this.$axios
          .post('/order', order)
          .then(() => {
            this.clearCart();
            this.$swal.close();
            this.$swal.fire(config.success('Order is submitted successfully'));
            this.$router.push('/');
          })
          .catch(() => {
            this.$swal.fire(config.error);
          })
      }
    },
    middleware: ['auth']
  }
</script>

<style lang="scss">
  .checkout {
    #checkout-title {
      text-align: center;
      font-weight: bold;
      font-size: xx-large;
    }
  }
</style>
