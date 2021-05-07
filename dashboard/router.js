import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const PUBLIC = 'public';
const MENU   = 'menu'

const ROLE_ADMIN   = 'ROLE_ADMIN'
const ROLE_MANAGER = 'ROLE_MANAGER'
const ROLE_USER    = 'ROLE_USER'

let routes = [
  {
    component: ()=>import('~/pages/security/login.vue').then(m => m.default || m),
    path: '/login',
    name: 'login',
    meta: {
      group: PUBLIC,
      roles: [],
    },
  },
  {
    component: ()=>import('~/pages/security/restore.vue').then(m => m.default || m),
    path: '/restore',
    name: 'restore',
    meta: {
      group: PUBLIC,
      roles: [],
    },
  },
  {
    component: ()=>import('~/pages/security/register.vue').then(m => m.default || m),
    path: '/register',
    name: 'register',
    meta: {
      group: PUBLIC,
      roles: [],
    },
  },
  {
    component: ()=>import('~/pages/account/index.vue').then(m => m.default || m),
    name: "account_index",
    path: "/my",
    redirect: {name: 'account_account'},
    meta: {
      group: null,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: '_',
      icon: 'fas fa-users',
    },
    children: [
      {
        name: 'account_account',
        path: 'account',
        component: () => import('@/pages/account/account.vue').then(m => m.default || m),
        hidden: true,
        meta: {
          group: null,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          activeMenu: '/my'
        }
      },
      {
        name: 'account_sessions',
        path: 'sessions',
        component: () => import('~/pages/account/sessions.vue').then(m => m.default || m),
        hidden: true,
        meta: {
          group: null,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          activeMenu: '/my'
        }
      },
      {
        name: 'account_logs',
        path: 'logs',
        component: () => import('~/pages/account/logs.vue').then(m => m.default || m),
        hidden: true,
        meta: {
          group: null,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          activeMenu: '/my'
        }
      },
    ]
  },


  {
    component: ()=>import('~/pages/index.vue').then(m => m.default || m),
    path: '/',
    name: 'index',
    meta: {
      group: MENU,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: '_dashboard',
      icon: 'fas fa-chart-line',
    },
  },

  {
    component: ()=>import('~/pages/subscriber/list.vue').then(m => m.default || m),
    path: '/subscriber',
    name: 'subscriber_index',
    meta: {
      group: MENU,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: 'Подписчики',
      icon: 'fas fa-circle',
    },
  },
  {
    component: ()=>import('~/pages/request_form/index.vue').then(m => m.default || m),
    name: "request_form_index",
    path: "/requestform",
    redirect: {name: 'request_form_list'},
    meta: {
      group: MENU,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: 'Запросы из формы',
      icon: 'far fa-newspaper',
    },
    children: [
      {
        path: 'list',
        name: 'request_form_list',
        component: () => import('~/pages/request_form/list.vue').then(m => m.default || m),
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_list',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/requestform'
        }
      },
    ]
  },


  {
    component: ()=>import('~/pages/news/index.vue').then(m => m.default || m),
    name: "news_index",
    path: "/news",
    redirect: {name: 'news_list'},
    meta: {
      group: MENU,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: 'Новости',
      icon: 'far fa-newspaper',
    },
    children: [
      {
        path: 'list',
        component: () => import('~/pages/news/list.vue').then(m => m.default || m),
        name: 'news_list',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_list',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/news'
        }
      },
      {
        path: 'create',
        component: () => import('~/pages/news/create.vue').then(m => m.default || m),
        name: 'news_create',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_create',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/news'
        }
      },
      {
        path: 'update/:id?',
        component: () => import('~/pages/news/update.vue').then(m => m.default || m),
        name: 'news_update',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_update',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/news'
        }
      },
    ]
  },

  {
    component: ()=>import('~/pages/page/index.vue').then(m => m.default || m),
    name: "page_index",
    path: "/page",
    redirect: {name: 'page_list'},
    meta: {
      group: MENU,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: 'Страницы',
      icon: 'far fa-newspaper',
    },
    children: [
      {
        path: 'list',
        component: () => import('~/pages/page/list.vue').then(m => m.default || m),
        name: 'page_list',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_list',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/page'
        }
      },
      {
        path: 'create',
        component: () => import('~/pages/page/create.vue').then(m => m.default || m),
        name: 'page_create',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_create',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/page'
        }
      },
      {
        path: 'update/:id?',
        component: () => import('~/pages/page/update.vue').then(m => m.default || m),
        name: 'page_update',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_update',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/page'
        }
      },
    ]
  },
  {
    component: ()=>import('~/pages/slider/index.vue').then(m => m.default || m),
    name: "slider_index",
    path: "/slider",
    redirect: {name: 'slider_list'},
    meta: {
      group: MENU,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: 'Слайдер',
      icon: 'fas fa-circle',
    },
    children: [
      {
        path: 'list',
        component: () => import('~/pages/slider/list.vue').then(m => m.default || m),
        name: 'slider_list',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_list',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/slider'
        }
      },
      {
        path: 'create',
        component: () => import('~/pages/slider/create.vue').then(m => m.default || m),
        name: 'slider_create',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_create',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/slider'
        }
      },
      {
        path: 'update/:id?',
        component: () => import('~/pages/slider/update.vue').then(m => m.default || m),
        name: 'slider_update',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_update',
          icon: 'far fa-newspaper',
          affix: true,
          activeMenu: '/slider'
        }
      },

    ]
  },

  {
    component: ()=>import('~/pages/user/index.vue').then(m => m.default || m),
    name: "user_index",
    path: "/user",
    redirect: {name: 'user_list'},
    meta: {
      group: MENU,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: 'Пользователи',
      icon: 'fas fa-users',
    },
    children: [
      {
        path: 'list',
        component: () => import('~/pages/user/list.vue').then(m => m.default || m),
        name: 'user_list',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_list',
          icon: 'fas fa-users',
          affix: true,
          activeMenu: '/user'
        }
      },
      {
        path: 'create',
        component: () => import('~/pages/user/create.vue').then(m => m.default || m),
        name: 'user_create',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_create',
          icon: 'fas fa-users',
          affix: true,
          activeMenu: '/user'
        }
      },
      {
        path: 'update/:id?',
        component: () => import('~/pages/user/update.vue').then(m => m.default || m),
        name: 'user_update',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_update',
          icon: 'fas fa-users',
          affix: true,
          activeMenu: '/user'
        }
      },
      {
        path: 'show/:id?',
        component: () => import('~/pages/user/show.vue').then(m => m.default || m),
        name: 'user_show',
        hidden: true,
        meta: {
          group: MENU,
          roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
          title: '_update',
          icon: 'fas fa-users',
          affix: true,
          activeMenu: '/user'
        }
      },
    ]
  },

  {
    component: ()=>import('~/pages/settings/index.vue').then(m => m.default || m),
    name: "settings_index",
    path: "/settings",
    meta: {
      group: MENU,
      roles: [ROLE_ADMIN, ROLE_MANAGER, ROLE_USER],
      title: 'Настройки',
      icon: 'fas fa-cogs',
    },
  },
]

export function createRouter() {
  let router = new Router({
    mode: 'history',
    routes: routes,
    // fallback: false,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  // router.beforeEach((to, from, next) => {
  //   let matchedObject = to.matched.slice()
  //     .reverse().find(r => r.meta && r.meta.hasOwnProperty('windowRedirectAfter'));
  //
  //   if(matchedObject) {
  //     // console.log(matchedObject);
  //     if(matchedObject.meta.windowRedirectAfter === true) {
  //       // console.log(matchedObject);
  //       if(from.name){
  //         if(from.name != to.name) {
  //           // console.log(from);
  //           // console.log(to);
  //           window.location.href = to.fullPath;
  //           return;
  //         }
  //       }
  //     }
  //   }
  //   next();
  // });

  return router
}
