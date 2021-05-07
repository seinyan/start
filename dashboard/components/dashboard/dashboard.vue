<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="$store.state.device==='mobile'&& $store.state.sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div class="fixed-header">
        <navbar/>
      </div>
      <section class="app-main" v-loading="$store.state.loading">
        <div class="container-fluid" style="margin-top: 30px;margin-bottom: 15px">
          <transition name="fade-transform" mode="out-in">
            <slot></slot>
          </transition>
        </div>
      </section>
      <div class="app-main-footer">
        <span>Footer text</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: "dashboard",
  mixins: [ResizeMixin],
  components: {Sidebar, Navbar},
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  },
  computed: {
    classObj() {
      return {
        hideSidebar: !this.$store.state.sidebar.opened,
        openSidebar: this.$store.state.sidebar.opened,
        withoutAnimation: this.$store.state.sidebar.withoutAnimation,
        mobile: this.$store.state.device === 'mobile'
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('nuxtSpaInit')
  },

}
</script>

<style scoped>

</style>
