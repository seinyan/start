<template>
  <div class="w-100">
    <el-popover placement="right" width="300" trigger="hover">
      <img :src="bg">
      <div class="el-table-image" slot="reference" :style="{ backgroundImage: 'url(' + bg + ')', height: size, width: size, }"></div>
    </el-popover>
  </div>
</template>

<script>
import {getMilliseconds} from '~/utils'
export default {
  name: "el-table-image",
  data() {
    return {
      bg: '/no_photo_300.png',
    }
  },
  props: {
    image: null,
    size: {
      type: String,
      default: function () {
        return '50px'
      }
    },
  },
  methods: {
    getBg() {
      this.bg = '/no_photo_300.png'
      if(this.image) {
        this.bg = this.image.domain + this.image.urls.small + '?'+getMilliseconds()
      }

      return this.bg
    },
  },
  mounted() {
    this.getBg()
  }
}
</script>

<style lang="scss">
.el-table-image {
  cursor: pointer;
  //height: 50px;
  //width: 50px;
  border-radius: 50%;
  background: url("/no_photo_300.png") no-repeat center center;
  background-size: cover;
  border: 1px solid #c3c3c3;
}
</style>
