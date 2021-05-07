<template>
  <div v-if="item" style="position: relative">

    <el-dialog
      v-loading="loading"
      :visible.sync="showModal"
      @close="closeModal"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      append-to-body
      width="90%" top="100px">
      <div v-loading="loading">
        <div v-if="showModal">
          <div  slot="title" style="display: flex;align-items: center;justify-content: center;margin-bottom: 8px;">
            <el-button @click="zoom(0.2)">
              <i class="fas fa-search-plus"></i>
            </el-button>
            <el-button @click="zoom(-0.2)">
              <i class="fas fa-search-minus"></i>
            </el-button>
            <el-button @click="updateItem">
              <i class="far fa-save"></i>
            </el-button>
          </div>
        </div>
        <vue-croper
          v-if="showModal"
          style="width: 100%;position: relative;max-height: 65vh;background: black"
          ref="cropper"
          :src="imgSrc"
          drag-mode="move"
          :zoomable="true"
          :zoomOnTouch="false"
          :zoomOnWheel="false"
          :movable="false"
          :center="true"
          :guides="conf.guides"
          :rotatable="conf.rotatable"
          :aspectRatio="aspect_ratio"
          :initialAspectRatio="aspect_ratio"
          :background="conf.background"
          :autoCrop="conf.autoCrop"
          :autoCropArea="conf.autoCropArea"
          :crop="cropImage"/>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import {getMilliseconds} from '~/utils'
export default {
  name: "el-image-cropper",
  components: {"vue-croper": VueCropper},
  data() {
    return {
      loading: false,
      showModal: false,
      imgSrc: null,
      conf: {
        guides: true,
        rotatable: true,
        background: false,
        autoCrop: true,
        autoCropArea: 100,
      },
      crop: {
        x: null,
        y: null,
        width: null,
        height: null
      },
    }
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return null
      }
    },
    aspect_ratio: {
      type: Number,
      default: () => {
        return 0
      }
    },
    show: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  methods: {
    openModal() {
      this.loading = true
      this.imgSrc = null
      if (this.item) {
        this.imgSrc = this.item.urls.url + '?' + getMilliseconds()
      }
      this.showModal = true

      let _this = this
      setTimeout(function () {
        _this.loading = false
      }, 600)
    },
    closeModal() {
      this.showModal = false
      this.imgSrc = null
      this.$emit('close')
    },
    cropImage(event) {
      this.crop = event.detail
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
    async updateItem() {
      this.loading = true
      let {data, status} = await this.$api.restPost('/file/crop/'+this.item.id, this.crop)
      if(status === 200) {
        this.$notifycation.updated()
        this.closeModal()
        this.$emit('updated')
      }
      else {
        this.$notifycation.error()
      }
      this.loading = false
    },
  },
  watch: {
    show: function () {
      if (this.show) {
        this.openModal()
      }
    }
  }
}
</script>

<style scoped>

</style>
