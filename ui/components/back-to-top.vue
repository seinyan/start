<template>
  <transition name="fade">
    <div class="back_top" v-if="activeBackTop" @click="scrollTop">
      <span>Верх</span>
      <div class="app-shadow">
        <img width="20px" src="~/assets/icons/up-arrow.svg">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "back-to-top",
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
  mounted() {
    window.addEventListener('scroll', this.eventScroll)
  },
}
</script>

<style lang="scss">
@import "assets/style/var";

.back_top {
  position: fixed;
  z-index: 99999999;
  right: 15px;
  bottom: 15px;
  span {
    color: $color-1;
    font-size: 14px;
    display: block;
    text-align: center;
    padding-bottom: 5px;
  }
  div {
    height: 40px;
    width: 40px;
    background: $color-1;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 26px;
    cursor: pointer;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
