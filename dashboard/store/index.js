import Vuex from 'vuex'
const createStore = () => {
  return new Vuex.Store({
    state: {
      API_URL: process.env.API_URL,
      API_BASE_URL: process.env.API_BASE_URL,
      userRoles: [
        {value: 'ROLE_ADMIN', label: 'ROLE_ADMIN'},
        {value: 'ROLE_MANAGER', label: 'ROLE_MANAGER'},
        {value: 'ROLE_USER', label: 'ROLE_USER'},
      ],
      auth: null,
      user: {},
      notifications: [],
      loading: false,
      sidebar: {
        opened: false,
        withoutAnimation: false,
      },
      device: 'desktop', // desktop OR mobile
    },
    mutations: {
      SET_AUTH(state, auth) {
        state.auth = auth
      },
      SET_USER(state, user) {
        state.user = user
      },

      SET_NOTIFICATIONS: (state, notifications) => {
        state.notifications = notifications
      },

      SET_LOADING_FULL(state, loading){
        state.loading = loading
      },
      SET_SIDEBAR_OPENED: (state, status) => {
        state.sidebar.opened = status
      },
      TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
      },
      CLOSE_SIDEBAR: (state, withoutAnimation) => {
        // Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
      },
      TOGGLE_DEVICE: (state, device) => {
        state.device = device
      },
    },
    actions: {
      async nuxtSpaInit({ dispatch, commit }) {
        let sidebarStatus = false
        sidebarStatus = this.$cookies.get('sidebar_opened')
        if(sidebarStatus === 1) {
          commit('SET_SIDEBAR_OPENED', true);
        }
        else{
          commit('SET_SIDEBAR_OPENED', false);
        }
      },
      async nuxtServerInit({ dispatch, commit }, { app }) {
        console.log('== nuxtServerInit ==')

        let auth = null
        let user = {}

        auth = app.$cookies.get('auth')
        user = app.$cookies.get('user')
        commit('SET_AUTH', auth)
        commit('SET_USER', user)

        if(auth){
          app.$axios.setToken(auth.accessToken, 'Bearer');
        }
      },
      toggleSideBar({ commit }) {
        if(this.state.sidebar.opened) {
          this.$cookies.set('sidebar_opened', 0)
        }
        else {
          this.$cookies.set('sidebar_opened', 1)
        }
        commit('TOGGLE_SIDEBAR')
      },
      closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
      },
      toggleDevice({ commit }, device) {
        commit('TOGGLE_DEVICE', device)
      },
      setSize({ commit }, size) {
        commit('SET_SIZE', size)
      },



      async LOGIN({dispatch, commit}, form) {
        let data = await this.$api.restPost('/login', form)
        if(data.status !== 200) {
          return data.status
        }

        const auth = { accessToken: data.data.token }

        commit('SET_AUTH', auth)
        this.$cookies.set('auth', auth)
        this.$axios.setToken(auth.accessToken, 'Bearer')

        await dispatch('UPDATE_USER')

        return data.status
      },
      async LOGOUT() {
        this.$cookies.remove('auth')
        this.$cookies.remove('user')

        let data = await this.$api.restPost('/logout')
        if(data.status !== 200) {
          return data.status
        }
      },
      async UPDATE_USER({commit}) {
        const {data} = await this.$api.restGet("/currentuser/get")

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

      async GET_USER_NOTIFICATIONS({commit}) {
        const {data} = await this.$api.restGet("/currentuser/notifications")
        commit('SET_NOTIFICATIONS', data)
      },

    }
  })
}

export default createStore
