// const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design
export default {
  watch: {
    $route(route) {
      if (this.$store.state.device === 'mobile' && this.$store.state.sidebar.opened) {
        this.$store.dispatch('closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      this.$store.dispatch('toggleDevice', 'mobile')
      this.$store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    $_isMobile() {
      const { body } = document
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()

        this.$store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          this.$store.dispatch('closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
