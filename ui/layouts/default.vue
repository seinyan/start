<template>
  <div class="w-100" id="app-top">

    <navbar/>

    <div class="container-fluid" style="margin-top: 65px;min-height: 80vh">
      <transition name="fade-transform" mode="out-in">
        <Nuxt/>
      </transition>
    </div>

    <app-footer/>
    <back-to-top/>
  </div>
</template>

<script>
import BackToTop from "@/components/back-to-top";
import Navbar from "../components/navbar";
import AppFooter from "../components/app-footer";
export default {
  components: {AppFooter, Navbar, BackToTop}
}
</script>

<style lang="scss">

</style>
