<template>
  <div class="row">
    <div class="col-sm-6">
      <form-item class="w-100">
        <el-switch v-model="item.is_publish" active-text="Опубликовано"/>
      </form-item>
      <form-item label="Дата публикации" class="w-100"
        :isError="errors.has('item.publish_at')"
        :validate-message="errors.first('item.publish_at')">
        <el-date-picker
          style="width: 100%"
          class="w-100"
          v-model="item.publish_at"
          type="datetime"
          format="dd-MM-yyyy HH:mm"
          value-format="dd-MM-yyyy HH:mm"
          default-time="12:00:00"
          placeholder="Дата публикации"
          name="item.publish_at"
          v-validate="'required'"/>
      </form-item>
      <form-item label="Заголовок" class="w-100"
        :isError="errors.has('item.title')"
        :validate-message="errors.first('item.title')">
        <el-input
          class="w-100"
          v-model="item.title"
          placeholder="Заголовок"
          name="item.title"
          v-validate="'required'">
        </el-input>
      </form-item>

    </div>
    <div class="col-sm-6">
      <el-image-upload
        :removed="true"
        :aspect_ratio="280/200"
        sub_path="news"
        :item="item.image" square @input="(value)=>{item.image = value}"/>
    </div>
    <div class="col-sm-12">
      <label>Текст</label>
      <el-editor v-model="item.description"/>
    </div>
    <div class="col-sm-12">
      <app-save-buttons type="create" @btn-click="validateBeforeSubmit"/>
    </div>
  </div>
</template>

<script>
import FormItem from "@/components/form-item";
import AppSaveButtons from "@/components/app-save-buttons";
import ElEditor from "../../components/elements/el-editor";
import ElImageUpload from "~/components/elements/el-image-upload";
export default {
  layout: 'dashboard',
  components: {AppSaveButtons, FormItem, ElEditor, ElImageUpload},
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

      let {data, status} = await this.$api.restPost('/admin/news/create', item)

      if(status === 201) {
        this.$notifycation.created()
        this.$router.push({name: 'news_list', params: { id: data.id } })
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
