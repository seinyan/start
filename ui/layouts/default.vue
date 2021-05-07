<template>
  <div class="w-100" id="app-top">

    <div class="container-fluid" style="margin-top: 65px;min-height: 80vh">
      <transition name="fade-transform" mode="out-in">
        <Nuxt/>
      </transition>
    </div>

    <back-to-top/>

  </div>
</template>

<script>
import BackToTop from "@/components/back-to-top";
export default {
  components: {BackToTop},
  data() {
    return {
      activeBackTop: false,
    }
  },
  methods: {
    scrollTop() {
      this.$scrollTo('#app-top', 600, {
        duration: 600,
        offset: -200
      })
    },
    eventScroll() {
      let top  = window.pageYOffset || document.documentElement.scrollTop

      if(top > 250) {
        this.activeBackTop = true
      }
      else {
        this.activeBackTop = false
      }

      let a = document.documentElement.scrollTop + window.innerHeight
      let b = document.documentElement.offsetHeight

      this.$store.state.bottomOfWindow = false
      if (a >= (b-200) ) {
        this.$store.state.bottomOfWindow = true
      }

    },
  },
  watch: {
    // '$route': function () {
    //   this.$scrollTo('#app-top', 0, {
    //     duration: 0,
    //     offset: 0
    //   })
    // }
  },
  mounted() {
    window.addEventListener('scroll', this.eventScroll)
  },
  created() {
    // if (this.$store.state.user) {
    //   this.$store.dispatch('GET_FAVORITE_PRODUCTS')
    // }
    // if (this.$store.state.cart_id) {
    //   this.$store.dispatch('GET_CART_PRODUCTS_IDS')
    //   this.$store.dispatch('CART_GET')
    // }
  }
}
</script>

<style lang="scss">



/* fade-transform */
.fade-transform-leave-active, .fade-transform-enter-active {
  transition: all .5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
