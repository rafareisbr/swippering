import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: "msapplication-TileColor", content: "#ffffff" },
      { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
      { name: "theme-color", content: "#ffffff" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "apple-touch-icon", sizes:"57x57", href: "/apple-icon-57x57.png" },
      { rel: "apple-touch-icon", sizes:"57x57", href: "/apple-icon-57x57.png" },
      { rel: "apple-touch-icon", sizes:"60x60", href: "/apple-icon-60x60.png" },
      { rel: "apple-touch-icon", sizes:"72x72", href: "/apple-icon-72x72.png" },
      { rel: "apple-touch-icon", sizes:"76x76", href: "/apple-icon-76x76.png" },
      { rel: "apple-touch-icon", sizes:"114x114", href: "/apple-icon-114x114.png" },
      { rel: "apple-touch-icon", sizes:"120x120", href: "/apple-icon-120x120.png" },
      { rel: "apple-touch-icon", sizes:"144x144", href: "/apple-icon-144x144.png" },
      { rel: "apple-touch-icon", sizes:"152x152", href: "/apple-icon-152x152.png" },
      { rel: "apple-touch-icon", sizes:"180x180", href: "/apple-icon-180x180.png" },
      { rel: "apple-touch-icon", sizes:"192x192", href: "/apple-icon-192x192.png" },
      { rel: "icon", type:"image/png", sizes:"16x16", href: "/favicon-16x16.png" },
      { rel: "icon", type:"image/png", sizes:"32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type:"image/png", sizes:"96x96", href: "/favicon-96x96.png" },
      { rel: "manifest", href: "/manifest.json" },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'red' },
  /*
  ** Global CSS
  */
  css: [
    // swiper style
    'swiper/swiper-bundle.css',
    '@fortawesome/fontawesome-free/css/all.css',
    'material-design-icons-iconfont/dist/material-design-icons.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/vant.js', ssr: false },
    { src: '@/plugins/vuelidate.js' },
    { src: '@/plugins/notifications.js' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',

    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    preset: 'vue-cli-plugin-vuetify-preset-crane/preset',
    customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'fa'
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.red.darken2,
          secondary: colors.grey.darken1,
          accent: colors.shades.black,
          error: colors.red.accent3
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: ['vue-cli-plugin-vuetify-preset-crane'],
    extend (config, ctx) {
    }
  },

  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },

  router: {
    // middleware: ['escolher-estabelecimento']
  },

  pwa: {
    manifest: {
      name: 'Pibibox',
      short_name: 'Pibibox',
      lang: 'pt-BR',
      description: 'Pibibox',
      ogImage: `@/assets/images/icon.jpeg`,
      display: 'standalone'
    },
  }

}
