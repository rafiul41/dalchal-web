import Vue from 'vue';

export const state = () => ({
  categories: [],
  loadedProducts: [],
  selectedCategory: {},
  // Cart variables
  totalCost: 0,
  discount: 0,
  cartProducts: {},
  //user
  userInfo: {}
});


export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  },
  setSelectedCategory(state, category) {
    state.selectedCategory = category;
  },
  setProducts(state, products) {
    state.loadedProducts = products;
  },
  // Cart mutations
  addProductToCart(state, product) {
    if (!state.cartProducts[product._id]) {
      product.inBag = 1;
      Vue.set(state.cartProducts, product._id, product);
    } else {
      const updatedProduct = Object.assign({}, state.cartProducts[product._id]);
      updatedProduct.inBag = state.cartProducts[product._id].inBag + 1;
      Vue.set(state.cartProducts, product._id, updatedProduct);
    }
    Vue.set(state, 'totalCost', state.totalCost + product.cost);
  },
  decreaseAmount(state, product) {
    if (state.cartProducts[product._id].inBag === 1) {
      Vue.delete(state.cartProducts, product._id);
    } else {
      const updatedProduct = Object.assign({}, state.cartProducts[product._id]);
      updatedProduct.inBag = state.cartProducts[product._id].inBag - 1;
      Vue.set(state.cartProducts, product._id, updatedProduct);
    }
    Vue.set(state, 'totalCost', state.totalCost - product.cost);
  },
  removeItem(state, product) {
    Vue.set(state, 'totalCost', state.totalCost - (product.cost * product.inBag));
    Vue.delete(state.cartProducts, product._id);
  },
  //user
  setUserInfo(state, user) {
    console.log(user);
    Vue.set(state, 'userInfo', user);
  }
};

export const actions = {
  nuxtServerInit(vuexContext) {
    return this.$axios
      .get("/categories")
      .then(response => {
        vuexContext.commit('setCategories', response.data.data);
        return Promise.resolve();
      })
      .catch(err => {
        return Promise.reject(err);
      })
  },
  fetchUser(vuexContext, mobileNumber) {
    return this.$axios
      .get('/user/' + mobileNumber)
      .then(response => {
        vuexContext.commit('setUserInfo', response.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  }
};

export const getters = {
  loadedCategories(state) {
    return state.categories;
  },
  selectedCategory(state) {
    return state.selectedCategory;
  },
  loadedProducts(state) {
    return state.loadedProducts;
  },
  // Cart getters
  cartProductList(state) {
    return state.cartProducts;
  },
  totalCost(state) {
    return state.totalCost;
  },
  //user
  getUserName(state) {
    return state.userInfo.name;
  }
};
