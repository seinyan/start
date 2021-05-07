import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// or with options
// Vue.use(VueLazyload)
const loadimage = require('~/assets/svg/product_no_img.jpg')

Vue.use(VueLazyload, {
  // preLoad: 5,
  error: loadimage, // '/loading.svg', // 'https://via.placeholder.com/300',
  // eslint-disable-next-line
  loading: loadimage, // '/loading.svg',
  // attempt: 3,
  // lazyComponent: true,
  // observer: true,
  // throttleWait: 500
})

