import Vuex from 'vuex'
const createStore = () => {
  return new Vuex.Store({
    state: {
      API_URL: process.env.API_URL,
      API_BASE_URL: process.env.API_BASE_URL,
      auth: null,
      user: {},
      notifications: [],
      loading: false,
      menu: {
        opened: false,
      },
      settings: {},
    },
    mutations: {
      SET_AUTH(state, auth) {
        state.auth = auth
      },
      SET_USER(state, user) {
        state.user = user
      },
      SET_LOADING_FULL(state, loading){
        state.loading = loading
      },
      SET_SETTINGS: (state, settings) => {
        state.settings = settings
      },
      MENU_TOGGLE: (state) => {
        state.menu.opened = !state.menu.opened
      },
      MENU_SET_OPENED: (state, opened) => {
        state.menu.opened = opened
      },
    },
    actions: {
      async nuxtServerInit({ dispatch, commit }, { app }) {
        console.log('== nuxtServerInit ==')

        let auth = null
        let user = {}
        let menuOpened = false

        auth = app.$cookies.get('auth')
        user = app.$cookies.get('user')
        commit('SET_AUTH', auth)
        commit('SET_USER', user)

        menuOpened = this.$cookies.get('menu_opened')
        if(menuOpened === 1) {
          commit('MENU_SET_OPENED', true)
        }
        else{
          commit('MENU_SET_OPENED', false)
        }

        if(auth){
          app.$axios.setToken(auth.accessToken, 'Bearer');
        }

        // let settings = await this.$api.restGet("/pub/mix/settings/get")
        // commit('SET_SETTINGS', settings.data)
      },
      MENU_TOGGLE({ commit }) {
        commit('MENU_TOGGLE')
      },
      async LOGIN({dispatch, commit}, form) {
        let data = await this.$api.restPost('/security/login', form)
        if(data.status !== 200) {
          return data.status
        }

        const auth = {
          accessToken: data.data.token
        }

        commit('SET_AUTH', auth)
        this.$cookies.set('auth', auth)
        this.$axios.setToken(auth.accessToken, 'Bearer')

        await dispatch('UPDATE_USER')

        return data.status
      },
      async LOGOUT() {
        // let data = await this.$api.restPost('/security/login')
        // if(data.status !== 200) {
          // return data.status
        // }
        this.$cookies.remove('auth')
        this.$cookies.remove('user')
      },
      async UPDATE_USER({commit}) {
        const {data} = await this.$api.restGet("/user/currentuser/get")

        let user = {
          id:  data.id,
          username: data.username,
          email: data.email,
          phone: data.phone,
          role: data.role,
          is_active: data.is_active,
          person: {
            image: null,
            full_name: data.person.full_name,
          }
        }
        if(data.person.image) {
          user.person.image = data.person.image.url
        }
        this.$cookies.set('user', user)
        commit('SET_USER', user)
      },
      async UPDATE_SETTINGS({commit}) {
        const {data} = await this.$api.restGet("/pub/mix/settings/get")
        commit('SET_SETTINGS', data)
      },


    }
  })
}

export default createStore
