<template>
  <div class="navbar">

    <div class="navbar-block">
      <hamburger :is-active="$store.state.sidebar.opened"/>
      <breadcrumb v-if="$store.state.device === 'desktop'"/>
    </div>

    <div v-if="$store.state.user" class="navbar-block">
      <div class="navbar-account-block">
        <el-dropdown>
          <div class="navbar-account-item">
            <div class="navbar-account-item-icon">
              <el-badge :value="$store.state.notifications.length" :max="9" class="badge-item">
                <i class="far fa-bell"></i>
              </el-badge>
            </div>
          </div>
          <el-dropdown-menu slot="dropdown">
            <div class="navbar-account-menu">
              <div v-if="$store.state.notifications.length > 0" class="w-100 navbar-account-notifications app-scrollbar">
                <notification v-for="item in $store.state.notifications" :item="item" :key="item.id"/>
              </div>
              <div v-else class="text-center w-100">
                Пусто
              </div>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <div class="navbar-account-item" v-if="$store.state.user.person">
            <nuxt-link class="navbar-avatar" :to="{name: 'account_index'}">
              <img :src="get_user_image()">
            </nuxt-link>
          </div>
          <el-dropdown-menu slot="dropdown">
            <div class="navbar-account-menu">
              <nuxt-link :to="{name: 'account_index'}">
                <i class="far fa-user"></i> Профиль
              </nuxt-link>
              <a href="#" @click="logout">
                <i class="fas fa-sign-out-alt"></i> Выйти
              </a>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

  </div>
</template>

<script>
import Breadcrumb from './breadcrumb'
import Hamburger from './hamburger'
import Notification from "./notification";
export default {
  components: {Notification, Breadcrumb, Hamburger},
  methods: {
    async logout() {
      await this.$store.dispatch('LOGOUT')
      window.location.href = "/login"
      // this.$router.push({name: 'login'})
    },
    get_user_image() {
      let img = '/no_photo_150.png'
      if (this.$store.state.user.person.image) {
        img = this.$store.state.user.person.image
      }

      return img+'?'+(new Date().toDateString())
    },
  },
  mounted() {
    let _this = this
    if (this.$store.state.user) {
      _this.$store.dispatch('GET_USER_NOTIFICATIONS')
      setTimeout(function () {
        _this.$store.dispatch('GET_USER_NOTIFICATIONS')
      }, 30000)
    }
  }
}
</script>

<style lang="scss">
@import "~assets/style/dashboard/variables.scss";

.navbar-account-notifications {
  padding: 5px;
  width: 300px;
  max-height: 300px;
  overflow: auto;
}

</style>
