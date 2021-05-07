<template>
  <div class="row">
    <div class="col-sm-6">
      <form-item class="w-100">
        <el-switch v-model="item.is_publish" active-text="Опубликовано"/>
      </form-item>
      <form-item label="Текст" class="w-100"
                 :isError="errors.has('item.title')"
                 :validate-message="errors.first('item.title')">
        <el-input
          class="w-100"
          v-model="item.title"
          placeholder="Текст"
          name="item.title"
          v-validate="'required'">
        </el-input>
      </form-item>
      <form-item label="Ссылка" class="w-100"
                 :isError="errors.has('item.link')"
                 :validate-message="errors.first('item.link')">
        <el-input
          class="w-100"
          v-model="item.link"
          placeholder="Ссылка"
          name="item.link">
        </el-input>
      </form-item>
    </div>
    <div class="col-sm-12">
      <el-image-upload
        :removed="false"
        :aspect_ratio="1920/750"
        sub_path="slider"
        :item="item.image" square @input="(value)=>{item.image = value}"/>
    </div>

    <div class="col-sm-12">
      <app-save-buttons type="create" @btn-click="validateBeforeSubmit"/>
    </div>

  </div>
</template>

<script>
import FormItem from "@/components/form-item";
import AppSaveButtons from "@/components/app-save-buttons";
import ElImageUpload from "~/components/elements/el-image-upload";
export default {
  layout: 'dashboard',
  components: {ElImageUpload, AppSaveButtons, FormItem},
  data(){
    return {
      item: {
        slug: null,
        is_publish: true,
        publish_at: null,
        title: null,
        text: null,
        meta_title: null,
        meta_keywords: null,
        meta_description: null,
        image: null,
      },
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.createItem();
          return;
        }
      });
    },
    async createItem() {
      let item = JSON.parse(JSON.stringify(this.item))
      if (item.image) {
        item.image = item.image.id
      }

      let {data, status} = await this.$api.restPost('/admin/slider_item/create', item)

      if(status === 201) {
        this.$notifycation.created()
        this.$router.push({name: 'slider_list', params: { id: data.id } })
      }
      else {
        this.$notifycation.error()
      }
    },
  },
}
</script>

<style lang="scss">

</style>
