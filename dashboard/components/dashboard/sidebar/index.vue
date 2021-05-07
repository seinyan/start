<template>
  <div class="has-logo">
    <sidebar-logo :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./sidebar-item";
import SidebarLogo from "./sidebar-logo";
export default {
  components: {SidebarLogo, SidebarItem},
  computed: {
    permission_routes() {
      let routes = []
      if (this.$store.state.user) {
        let user_role = this.$store.state.user.role

        this.$router.options.routes.forEach(function (route) {
          if(route.meta.group === 'menu' && !route.meta.hideMenu) {
            if(route.meta.roles) {
              if(route.meta.roles.indexOf(user_role) != -1) {
                routes.push(route)
              }
            }
          }
        })
      }

      return routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.$store.state.sidebar.opened
    }
  }
}
</script>
