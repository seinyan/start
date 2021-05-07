<template>
  <div class="row">
    <div class="col-sm-12">
      <h1>el-image-upload</h1>
      <div style="max-width: 300px">
        <el-image-upload
          is_square
          :removed="false"
          :aspect_ratio="250/300"
          :item="item.image" square @input="(value)=>{item.image = value}"/>
      </div>
    </div>
    <div class="col-sm-12">
      <h1>el-file-upload</h1>
      <el-file-upload/>
    </div>
    <div class="col-sm-12">
      <h1>el-editor</h1>

      <el-editor v-model="item.text"/>

      <pre>{{item.text}}</pre>
    </div>
    <div class="col-sm-12">
      <h1>el-image-collection-upload</h1>

      <el-image-collection-upload :aspect_ratio="300/300" :items="item.images"/>

      <pre>{{item.images}}</pre>
    </div>

  </div>
</template>

<script>
import ElImageUpload from "../components/elements/el-image-upload";
import ElEditor from "../components/elements/el-editor";
import ElFileUpload from "../components/elements/el-file-upload";
import ElImageCollectionUpload from "../components/elements/el-image-collection-upload";
export default {
  name: "index",
  components: {ElImageCollectionUpload, ElFileUpload, ElEditor, ElImageUpload},
  data() {
    return {
      item: {
        id: null,
        image: null,
        text: null,
        images: [],
      },
      phone: null,
      value: null,

    }
  },
  methods: {
    async test() {
      let {data, status} = await this.$api.restPost('/test')
      console.log(status, data)
    },
  }
}
</script>

<style lang="scss">


</style>
