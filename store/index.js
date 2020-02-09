import axios from 'axios';

export const state = () => ({
  categories: [],
  loadedProducts: [],
  selectedCategory: {},
  cart: {
    numberOfItems: 0,
    totalCost: 0,
    discount: 0,
    products: []
  }
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
  }
};

export const actions = {
  nuxtServerInit(vuexContext) {
    return axios
      .get(process.env.apiUrl + "/categories")
      .then(response => {
        vuexContext.commit('setCategories', response.data.data);
        return Promise.resolve();
      })
      .catch(err => {
        return Promise.reject(err);
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
  }
};
