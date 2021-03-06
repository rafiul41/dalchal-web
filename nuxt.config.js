export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#fff'},
  /*
  ** Global CSS
  */
  css: [{
    src: '~node_modules/sweetalert2/dist/sweetalert2.min.css'
  }],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/eventBus'},
    {src: '~/plugins/localStorage.js', ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'vue-sweetalert2/nuxt'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  axios: {
    baseURL: "https://dalchal-api.herokuapp.com/api"
  },
  vue: {
    config: {
      devTools: true
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: 'user/authenticate', method: 'post', propertyName: 'data.token'},
          user: false,
          logout: false
        }
      }
    }
  }
}
