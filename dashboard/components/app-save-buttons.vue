<template>
  <div style="margin-top: 15px">
    <div>
      <el-button v-if="type === 'save'" @click="btnClick(false)">
        <i class="fas fa-save"></i> Сохранить
      </el-button>
      <el-button v-if="type === 'update'" @click="btnClick(false)">
        <i class="fas fa-save"></i> Сохранить
      </el-button>
      <el-button v-if="type === 'create' || type === 'update' " @click="btnClick(true)">
        <i class="fas fa-save"></i> Сохранить и закрыть
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-save-buttons',
  data() {
    return {
      position: '',
      height: 50,
      margin_top: -15
    }
  },
  props: {
    type: null
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
  },
  activated() {
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleScroll() {
        const offsetTop = this.$el.getBoundingClientRect().top
        var top  = window.pageYOffset || document.documentElement.scrollTop,
            left = window.pageXOffset || document.documentElement.scrollLeft;
       // console.log('offsetTop == '+top)

        if(top > 60) {
            this.position = 'fixed'
            this.height = 70
            this.margin_top = 0
        }
        else{
            this.position = 'relative'
            this.height = 50
            this.margin_top = -15
        }
    },
    btnClick(close) {
        this.$emit('btn-click', close)
    }
  }
}
</script>

<style lang="scss">
    .sub-navbar {
        margin-top: -15px;
        margin-bottom: 15px;
        position: relative;
        width: 100%;
        min-width: 100%!important;
        padding: 0 5px;
        transition: 300ms ease all;
        background: #f4f4f4 !important;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
    }
</style>
