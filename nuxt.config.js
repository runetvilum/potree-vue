// import webpack from 'webpack'
import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - potree',
    title: 'potree',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'libs/jquery/jquery-3.1.1.min.js',
      },
      {
        src: 'libs/other/BinaryHeap.js',
      },
      {
        src: 'libs/tween/tween.min.js',
      },
      {
        src: 'libs/d3/d3.js',
      },
      {
        src: 'libs/proj4/proj4.js',
      },
      {
        src: 'potree/potree.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['potree/build/potree/potree.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      /*
      new webpack.ProvidePlugin({
        proj4: ['proj4', 'default'],
        $: 'potree/libs/jquery/jquery-3.1.1.js',
        jQuery: 'potree/libs/jquery/jquery-3.1.1.js',
        Potree: 'potree/build/potree/potree',
        BinaryHeap: 'potree/libs/other/BinaryHeap.js',
        TWEEN: 'potree/libs/tween/Tween.js',
        i18n: 'potree/libs/i18next/i18next.js',
        d3: 'potree/libs/d3/d3.js',
      }),
      */
    ],
    extend(config, ctx) {
      config.node = {
        fs: 'empty',
      }
      if (ctx.isDev) {
        // config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
      // config.module.noParse = /potree/
      /*
      config.module.rules.push({
        test: require.resolve('potree/libs/other/BinaryHeap.js'),
        use: 'exports-loader?BinaryHeap',
      })
      config.module.rules.push({
        test: require.resolve('potree/src/PotreeRenderer.js'),
        use: 'imports-loader?exports=>window',
      })
      config.module.rules.push({
        test: require.resolve('potree/src/viewer/profile.js'),
        use: 'imports-loader?exports=>Potree',
      })
      */
    },
  },
}
