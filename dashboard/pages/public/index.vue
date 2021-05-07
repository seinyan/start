<template>
  <div class="container-fluid">


    <transition name="fade">
      <div class="back_top" v-if="activeBackTop" @click="scrollTop('menu')">
        <span>Верх</span>
        <div class="app-shadow">
          <i class="fas fa-angle-up"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {

      activeBackTop: false,
    }
  },
  methods: {
    scrollTop(id) {
      this.$scrollTo('#'+id, 600, {
        duration: 600,
        offset: -150
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

      // let a = document.documentElement.scrollTop + window.innerHeight
      // let b = document.documentElement.offsetHeight
      // this.$store.state.bottomOfWindow = false
      // if (a >= (b-200) ) {
      //   this.$store.state.bottomOfWindow = true
      // }

    },
  },
  mounted() {
    window.addEventListener('scroll', this.eventScroll)
  },
}
</script>

<style lang="scss">

$base-color-1: #131144;
$base-color-2: #ff7700;
$base-color-3: #ff006a;
$base-color-4: #ff001e;

// START back_top
.back_top {
  position: fixed;
  z-index: 99999999;
  right: 15px;
  bottom: 15px;
  span {
    color: $base-color-1;
    font-size: 14px;
    display: block;
    text-align: center;
    padding-bottom: 5px;
  }
  div {
    height: 40px;
    width: 40px;
    background: $base-color-1;
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
// END back_top

</style>
