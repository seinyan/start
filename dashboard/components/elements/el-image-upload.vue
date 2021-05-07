<template>
  <div class="el-image-upload">

    <div class="el-upload-content-btns" v-show="item">
      <app-button v-if="removed" type="delete" size="mini" mini @click="deleteItemConfirm"/>
      <app-button type="update" size="mini" mini  @click="showCrop = true"/>
    </div>

    <el-upload
      class="el-image-upload-el-upload"
      ref="upload"
      v-loading="loading"
      drag
      :on-success="on_success"
      :on-progress="on_progress"
      :on-error="on_error"
      :auto-upload="true"
      :action="$store.state.API_URL+'/file/image/upload'"
      :headers="{Authorization: 'Bearer '+ $store.state.auth.accessToken}"
      :data="{ sub_path: sub_path, id: getId()}"
      :multiple="false"
      :show-file-list="false">
      <div class="el-upload-content" ref="elUploadContent" :style="{ backgroundImage: 'url(' + bgImg + ')', height: height }">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Перетащите файл или нажмите <em>чтобы загрузить</em></div>
        <div class="el-upload__tip" slot="tip">файлы jpg/png</div>
      </div>
    </el-upload>

    <el-image-cropper :item="item" :aspect_ratio="aspect_ratio" :show="showCrop" @close="showCrop = false" @updated="updatedCrop"/>

  </div>
</template>

<script>
import {getMilliseconds} from '~/utils'
import ElImageCropper from "./el-image-cropper";
import AppButton from "../buttons/app-button";
export default {
  name: "el-image-upload",
  components: {AppButton, ElImageCropper},
  data() {
    return {
      loading: false,
      elUploadContentWidth: null,
      height: '100%',
      bgImg: null,
      showCrop: false
    }
  },
  props: {
    is_square: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    item: {
      type: Object,
      default: function () {
        return null
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
    },
    removed: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  methods: {
    on_success(response, file, fileList){
      this.loading = false
      this.$emit('input', response)
    },
    on_progress(event, file, fileList){
      this.loading = true
    },
    on_error(err, file, fileList){
      this.loading = false
      this.$notifycation.error();
    },
    deleteItemConfirm(){
      let _this = this;
      this.$confirm('Вы действительно хотите удалить', '', {
        confirmButtonText: 'ДА',
        cancelButtonText: 'Отменить',
        type: 'warning'
      }).then(() => {
        _this.deleteItem()
      }).catch(() => { })
    },
    async deleteItem(){
      let data = await this.$api.restDelete('/file/delete/'+this.item.id);
      if(data.status === 204) {
        this.$notifycation.deleted()
        this.$emit('deleted', this.item)
        this.$emit('input', null)
        // this.items.items.splice(this.items.items.indexOf(item), 1);
      }else {
        this.$notifycation.error()
      }
    },

    getId() {
      if (this.item) {
        return this.item.id
      }

      return null
    },

    updatedCrop() {
      this.setBg()
    },
    setBg(){
      let bg = null
      if (this.item) {
        if (this.item.id) {
          bg = this.item.domain+this.item.urls.large+'?'+getMilliseconds()
        }
      }
      this.bgImg = bg
    },
    setStyle() {
      if (this.is_square === true) {
        this.height = this.elUploadContentWidth+'px'
      }
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.elUploadContentWidth = this.$refs.elUploadContent.clientWidth
      this.setStyle()
      this.setBg()
    })
  },
  watch: {
    item: function () {
      this.setBg()
    }
  }
}
</script>

<style lang="scss">
.el-image-upload {
  position: relative;
}
.el-upload-content-btns {
  position: absolute;
  z-index: 1;
  top: 15px;
  right: 15px;
}
.el-upload-content {
  position: relative;
  min-height: 200px;
  width: 100%;
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 8px;
}
.el-image-upload-el-upload {
  display: block;
  width: 100% !important;
  .el-upload {
    display: block;
    width: 100%;
  }
  .el-upload-dragger {
    width: 100%;
    height: 100%;
  }
}

</style>
