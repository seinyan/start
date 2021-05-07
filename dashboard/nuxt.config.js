const API_URL = 'http://api.start.cc'
const PORT  = 3000
export default {
  mode: 'spa',
  server: {
    host: '0.0.0.0',
    port: PORT,
    timing: false
  },
  env: {
    API_URL: API_URL,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1'},
      { hid: 'robots', name: 'robots', content: 'noindex, nofollow'},
      // https://www.favicon-generator.org/
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/index.scss',
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@plugins/axios'},
    {src: '@/plugins/api'},
    {src: '@/plugins/global'},
    {src: '@/plugins/global-no-ssr', ssr: false},
    '@/plugins/element-ui',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { parseJSON: true }],
    ['nuxt-i18n', {
      locales: [
        {
          code: 'en',
          file: 'en-US.js'
        },
        {
          code: 'ru',
          file: 'ru-RU.js'
        },
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'ru', // process.env.DEFAULT_LOCATE,
    }],
    ['~/modules/nuxt-validate', { lang: 'ru' }],
  ],

  axios: {
    credentials: false,
    withCredentials: false,
    proxyHeaders: false,
    progress: true,
    baseURL:        API_URL,
    browserBaseURL: API_URL,
    proxy: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
    prefetchLinks: false,
    // base: 'http://app.app',
    base: '/',
    middleware: ['auth'],
  },
  render: {
    resourceHints: false
  },
}
