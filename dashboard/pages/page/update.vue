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
      <app-save-buttons type="update" @btn-click="validateBeforeSubmit"/>
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
  async asyncData ({ params, query, app }) {
    let {data} = await app.$api.restGet('/admin/page/'+params.id)

    return {
      item: data,
    }
  },
  methods: {
    validateBeforeSubmit(close) {
      this.update = "close"
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateItem(close);
          return;
        }
      });
      // this.update = null
    },
    async updateItem(close) {
      this.$store.commit('SET_LOADING_FULL', true)
      let item = JSON.parse(JSON.stringify(this.item))

      let {data, status} = await this.$api.restPut('/admin/page/update/'+item.id, item)
      if(status === 200) {
        this.$notifycation.updated();

        if(close) {
          this.$router.push({name: 'page_list'})
        }
      }
      else {
        this.$notifycation.error();
      }

      this.$store.commit('SET_LOADING_FULL', false)
    },
  },
}
</script>

<style scoped>

</style>
