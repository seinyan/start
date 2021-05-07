<template>
  <div v-if="isMounted">
    <ckeditor
      :value="value"
      :editor="editor"
      :config="config"
      :tagName="tagName"
      :disabled="disabled"
      @input="onInput"/>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import FullFreeBuildEditor from '@blowstack/ckeditor5-full-free-build'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import '@blowstack/ckeditor5-full-free-build/build/translations/ru.js'
export default {
  name: "el-editor",
  components: {ckeditor: CKEditor.component},
  data: ()=> {
    return {
      isMounted: false,
      editor: ClassicEditor,
      tagName: 'div',
      disabled: false,
      uploadUrl: 'div',
      config_OLD: {
        language: "ru",
        // simpleUpload: {
        //   uploadUrl: 'http://api.portal_anapa.cc/api/file/upload_image_ckeditor',
        //   // headers: {
        //   //   Authorization: 'optional_token'
        //   // }
        // },
        ckfinder: {
          uploadUrl: 'http://api.start.cc/file/image/upload_ckeditor',
          options: {
              // resourceType: 'Images',
              headers: {
                // Authorization: 'Bearer '+ this.$store.state.auth.accessToken
                  // 'Authorization': $('meta[name="csrf-token"]').attr('content')
              },
          }
        }
      },
    }
  },
  props: {
    value: null
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    config(){

      return {
        language: "ru",
        ckfinder: {
          uploadUrl: process.env.API_URL+'/file/image/upload_ckeditor',
          options: {
            headers: {
              // Authorization: 'Bearer ' // + this.$store.state.auth.accessToken
            },
          }
        }
      }


    }
  }
}
</script>

<style lang="scss">
.ck-content {
  min-height: 350px!important;
}

</style>
