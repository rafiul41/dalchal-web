<template>
  <div>
    <div class="order-title">
      My Orders
    </div>
    <div v-if="!isOrdersLoaded" class="text-center">
      <b-spinner style="width: 3rem; height: 3rem;" class="m-5"></b-spinner>
    </div>
    <div v-else id="order-list">
      <div v-for="order in orders" :key="order._id">
        <div class="order-template">
          <div class="template-left">
            <div>{{'OrderId: '+ order._id}}</div>
            <div>{{'Tk. ' + order.totalCost}}</div>
          </div>
          <div class="template-right">
            <div>{{'Address: ' + order.address}}</div>
            <div>{{'Time range: ' + order.timeRange}}</div>
            <div>{{'Date: ' + order.date.split('T')[0]}}</div>
          </div>
          <button @click="showDetails(order._id)" class="details-btn">
            Show Details
          </button>
        </div>
        <b-modal :id="order._id">
          <div>{{'OrderId: '+ order._id}}</div>
          <div>{{'Tk. ' + order.totalCost}}</div>
          <div>{{'Address: ' + order.address}}</div>
          <div>{{'Time range: ' + order.timeRange}}</div>
          <div>{{'Date: ' + order.date.split('T')[0]}}</div>
          <div>CART</div>
          <div v-for="product in order.cart">
            {{product.name}} {{product.inBag}} {{product.cost}}
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {config} from "../../static/swalConfig";

  export default {
    data() {
      return {
        isOrdersLoaded: false,
        orders: []
      }
    },
    computed: {
      ...mapGetters(['userId'])
    },
    methods: {
      fetchOrders() {
        return this.$axios
          .get('/order?userId=' + this.userId)
          .then(response => {
            if(response.data.statusCode !== 200) {
              return Promise.reject(response.data.message);
            }
            this.orders = response.data.data;
            this.isOrdersLoaded = true;
          })
          .catch(() => {
            this.$swal.fire(config.error);
          })
      },
      showDetails(orderId) {
        this.$bvModal.show(orderId);
      }
    },
    created() {
      this.$eventBus.$emit('foldAll');
      this.fetchOrders();
    },
    middleware: ['auth']
  }
</script>

<style lang="scss">
  .order-title {
    font-size: x-large;
    font-weight: bold;
    text-align: center;
  }
  #order-list {
    .order-template {
      display: flex;
      border: 1px solid #b0b0b6;
      justify-content: space-around;
    }
    button {
      align-self: center;
    }
  }
</style>
