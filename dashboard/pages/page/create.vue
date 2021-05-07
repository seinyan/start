<template>
  <div class="row">
    <div class="col-sm-6">
      <form-item class="w-100">
        <el-switch v-model="item.is_publish" active-text="Опубликовано"/>
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
export default {
  layout: 'dashboard',
  components: {ElEditor, AppSaveButtons, FormItem,},
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
        image: null
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
      let {data, status} = await this.$api.restPost('/admin/page/create', item)

      if(status === 201) {
        this.$notifycation.created()
        this.$router.push({name: 'page_list', params: { id: data.id } })
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
