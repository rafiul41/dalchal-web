import Vue from 'vue';

export const state = () => ({
  categories: [],
  loadedProducts: [],
  selectedCategory: {},
  // Cart variables
  totalCost: 0,
  cartProducts: {},
  //user
  userInfo: {},
  //promo
  promoCode: null,
  isPromoApplied: false,
  promoRate: 0,
  minPromoCost: null
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
    if(!state.isPromoApplied && (state.totalCost >= state.minPromoCost)) {
      Vue.set(state, 'isPromoApplied', true);
    }
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
    if(state.isPromoApplied && (state.totalCost < state.minPromoCost)) {
      Vue.set(state, 'isPromoApplied', false);
    }
  },
  removeItem(state, product) {
    Vue.set(state, 'totalCost', state.totalCost - (product.cost * product.inBag));
    Vue.delete(state.cartProducts, product._id);
  },
  clearCart(state) {
    Vue.set(state, 'cartProducts', {});
    Vue.set(state, 'totalCost', 0);
  },
  //user
  setUserInfo(state, user) {
    Vue.set(state, 'userInfo', user);
  },
  clearUser(state, user) {
    Vue.set(state, 'userInfo', {});
  },
  //promo
  updatePromo(state, promo) {
    Vue.set(state, 'promoCode', promo.code);
    Vue.set(state, 'promoRate', promo.rate);
    Vue.set(state, 'minPromoCost', promo.minCost);
    if(state.totalCost >= promo.minCost) {
      Vue.set(state, 'isPromoApplied', true);
    }
  },
  clearPromo(state, promo) {
    Vue.set(state, 'promoCode', null);
    Vue.set(state, 'promoRate', 0);
    Vue.set(state, 'minPromoCost', null);
    Vue.set(state, 'isPromoApplied', false);
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
  },
  userAddresses(state) {
    return state.userInfo.addresses;
  },
  userId(state) {
    return state.userInfo._id;
  },
  userInfo(state) {
    return state.userInfo;
  },
  isPromoApplied(state) {
    return state.isPromoApplied;
  },
  promoCode(state) {
    return state.promoCode;
  },
  promoRate(state) {
    return state.promoRate;
  },
  minPromoCost(state) {
    return state.minPromoCost;
  }
};
