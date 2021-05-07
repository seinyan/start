<template>
  <div class="el-file-upload">
    <el-upload
      class="el-file-upload-el-upload"
      ref="upload"
      v-loading="loading"
      drag
      :on-success="on_success"
      :on-progress="on_progress"
      :on-error="on_error"
      :auto-upload="true"
      :action="$store.state.API_URL+'/file/upload'"
      :headers="{Authorization: 'Bearer '+ $store.state.auth.accessToken}"
      :data="{ sub_path: sub_path }"
      :multiple="false"
      :show-file-list="false">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Перетащите файл или нажмите <em>чтобы загрузить</em></div>
<!--        <div class="el-upload__tip" slot="tip">файлы jpg/png</div>-->
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "el-file-upload",
  data() {
    return {
      loading: false,
    }
  },
  props: {
    sub_path: {
      type: String,
      default: function () {
        return 'tmp'
      }
    }
  },
  methods: {
    on_success(response, file, fileList){
      this.loading = false
      this.$emit('uploaded', response)
    },
    on_progress(event, file, fileList){
      this.loading = true
    },
    on_error(err, file, fileList){
      this.loading = false
      this.$notifycation.error()
    },
  },
}
</script>

<style lang="scss">
.el-file-upload {
  position: relative;
}
.el-file-upload-el-upload {
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

</style>
