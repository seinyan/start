<template>
  <div class="el-image-collection-upload">

    <el-upload
      class="el-image-collection-upload-el-upload"
      ref="upload"
      v-loading="loading"
      drag
      :on-success="on_success"
      :on-progress="on_progress"
      :on-error="on_error"
      :auto-upload="true"
      :action="$store.state.API_URL+'/file/image/upload'"
      :headers="{Authorization: 'Bearer '+ $store.state.auth.accessToken}"
      :data="{ sub_path: sub_path }"
      :multiple="false"
      :show-file-list="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Перетащите файл или нажмите <em>чтобы загрузить</em></div>
<!--      <div class="el-upload__tip" slot="tip">файлы jpg/png</div>-->
    </el-upload>

    <div class="el-image-collection-images">
      <el-image-collection-upload-image-item
        v-for="item in items" :key="item.id"
        :item="item"
        @deleted="deleteItem"
        @crop="openCropModal"
        :reload="cropItemId"/>
    </div>

    <el-image-cropper
      :item="cropItem"
      :aspect_ratio="aspect_ratio"
      :show="showCrop"
      @close="showCrop = false"
      @updated="updatedCrop"/>

  </div>
</template>

<script>
import {getMilliseconds} from '~/utils'
import ElImageCropper from "./el-image-cropper";
import AppButton from "../buttons/app-button";
import ElImageCollectionUploadImageItem from "./el-image-collection-upload-image-item";
export default {
  name: "el-image-collection-upload",
  components: {ElImageCollectionUploadImageItem, AppButton, ElImageCropper},
  data() {
    return {
      loading: false,
      showCrop: false,
      cropItem: null,
      cropItemId: null,
    }
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    sub_path: {
      type: String,
      default: function () {
        return 'tmp'
      }
    },
    aspect_ratio: {
      type: Number,
      default: function () {
        return 0
      }
    }
  },
  methods: {
    on_success(response, file, fileList){
      this.loading = false
      this.items.push(response)
      // this.$emit('input', response)
    },
    on_progress(event, file, fileList){
      this.loading = true
    },
    on_error(err, file, fileList){
      this.loading = false
      this.$notifycation.error();
    },

    deleteItem(item){
      this.items.splice(this.items.indexOf(item), 1);
    },
    openCropModal(item) {
      console.log(item)
      this.cropItem = item
      this.cropItemId = item.id
      this.showCrop = true
    },

    updatedCrop() {
      this.cropItem = null
      this.cropItemId = null
    },

    get_image(img) {
      return img.domain + img.urls.large+'?'+getMilliseconds()
    },


  },
}
</script>

<style lang="scss">

.el-image-collection-upload {
  position: relative;
}
.el-image-collection-upload-el-upload {
  display: block;
  width: 100% !important;
  .el-upload {
    width: 100%;
  }
  .el-upload-dragger {
    width: 100%;
    height: 100%;
    padding-bottom: 30px;
  }
}

.el-image-collection-images {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap row;
  //padding: -15px;
}




</style>
