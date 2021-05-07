import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'index',
    component: ()=>import('~/pages/index.vue').then(m => m.default || m),
    meta: {
      group: [],
      roles: [],
    },
    // redirect: { name: 'index' },
  },

  // {
  //   path: '/:slug?',
  //   name: 'category_show',
  //   component: ()=>import('~/pages/category/show.vue').then(m => m.default || m),
  //   meta: {
  //     group: [],
  //     roles: [],
  //   },
  // },

]

export function createRouter() {
  let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // fallback: false
  })

  return router
}
