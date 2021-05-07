const API_URL = 'http://api.start.cc'
const PORT  = '8000'
const DOMAIN = 'http://localhost:8000/'

export default {
  mode: 'universal',
  server: {
    port: PORT,
    host: '0.0.0.0',
    timing: false
  },
  env: {
    BASE_URL: API_URL,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ui',
    htmlAttrs: {lang: 'ru'},
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1'},
      { hid: 'keywords', name: 'keywords', content: 'App'},
      { hid: 'description', name: 'description', content: 'App'},

      { property: 'og:locate', content: `RU_ru` },
      { property: 'og:site_name', content: `start.ru  вся мода на одном сайте.` },
      { property: 'og:type', content: 'website' },

      { property: 'og:title', content: `App` },
      { property: 'og:description', content: 'App' },
      { property: 'og:url', content: DOMAIN },
      { property: 'og:image', content: DOMAIN+'/social-logo.png' },
      { property: 'og:image:width', content: '160' },
      { property: 'og:image:height', content: '50' },

      { name: "yandex-verification", content: "" },

      // https://www.favicon-generator.org/
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
      { rel: 'icon', sizes: '192x192', type: 'image/png',  href: '/favicon/android-icon-192x192.png' },
      { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', sizes: '96x96', type: 'image/png', href: '/favicon/favicon-96x96.png' },
      { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon/favicon-16x16.png' },

      { name: 'msapplication-TileColor', content: '#ff006a' },
      { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ff006a' },
      { name: 'msapplication-navbutton-color', content: '#ff006a' },
      { name: 'apple-mobile-web-app-status-bar-style', content: '#ff006a' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/style/index.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '@plugins/axios'},
    {src: '@/plugins/api'},
    {src: '@/plugins/global'},
    {src: '@/plugins/global-no-ssr', ssr: false},
    // '@/plugins/element-ui',
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
    // 'nuxt-element-ui',
    ['cookie-universal-nuxt', { parseJSON: true }],
    ['~/modules/nuxt-validate', {lang: 'ru'}],
    // [
    //   '@nuxtjs/yandex-metrika',
    //   {
    //     id: '',
    //     clickmap:true,
    //     trackLinks:true,
    //     accurateTrackBounce:true,
    //     webvisor:true
    //     // webvisor: true,
    //     // clickmap:true,
    //     // useCDN:false,
    //     // trackLinks:true,
    //     // accurateTrackBounce:true,
    //   }
    // ],
  ],

  axios: {
    credentials: false,
    progress: true,
    baseURL:        API_URL,
    browserBaseURL: API_URL,
    proxy: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    maxChunkSize: 300000
  },
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
