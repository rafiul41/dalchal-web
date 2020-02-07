import axios from 'axios';

export const state = () => {
  return {
    categories: []
  };
};

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories;
  }
};

export const actions = {
  nuxtServerInit(vuexContext, context) {
    return axios
      .get(process.env.apiUrl + "/categories")
      .then(response => {
        vuexContext.commit('setCategories', response.data.data);
        return Promise.resolve('');
      })
      .catch(err => {
        return Promise.reject(err);
      })
  }
};

export const getters = {
  loadedCategories(state) {
    return state.categories;
  }
};
