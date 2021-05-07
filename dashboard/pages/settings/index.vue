<template>
  <div class="row">
    <div class="col-sm-4">
      <form-item
        label="E-mail" class="w-100"
        :isError="errors.has('item.email')"
        :validate-message="errors.first('item.email')">
        <el-input
          class="w-100"
          v-model="item.email"
          placeholder="E-mail"
          name="item.email"
          v-validate="'required'">
        </el-input>
      </form-item>
      <el-phone-input v-model="item.phone"/>
      <form-item
        label="Адрес" class="w-100"
        :isError="errors.has('item.address')"
        :validate-message="errors.first('item.address')">
        <el-input
          type="textarea"
          :rows="2"
          class="w-100"
          v-model="item.address"
          placeholder="Адрес"
          name="item.address"
          v-validate="'required'">
        </el-input>
      </form-item>
    </div>

    <div class="col-sm-8">
      <form-item
        label="Meta title" class="w-100"
        :isError="errors.has('item.meta_title')"
        :validate-message="errors.first('item.meta_title')">
        <el-input
          class="w-100"
          type="textarea"
          :rows="2"
          v-model="item.meta_title"
          placeholder="Meta title"
          name="item.meta_title"
          v-validate="'required'"/>
      </form-item>
      <form-item
        label="Meta keywords" class="w-100"
        :isError="errors.has('item.meta_keywords')"
        :validate-message="errors.first('item.meta_keywords')">
        <el-input
          class="w-100"
          type="textarea"
          :rows="2"
          v-model="item.meta_keywords"
          placeholder="Meta keywords"
          name="item.meta_keywords"
          v-validate="'required'"/>
      </form-item>
      <form-item
        label="Meta description" class="w-100"
        :isError="errors.has('item.meta_description')"
        :validate-message="errors.first('item.meta_description')">
        <el-input
          class="w-100"
          type="textarea"
          :rows="2"
          v-model="item.meta_description"
          placeholder="Meta description"
          name="item.meta_description"
          v-validate="'required'"/>
      </form-item>
      <form-item
        label="Текст футер" class="w-100"
        :isError="errors.has('item.footer_text')"
        :validate-message="errors.first('item.footer_text')">
        <el-input
          type="textarea"
          :rows="2"
          class="w-100"
          v-model="item.footer_text"
          placeholder="Текст футер"
          name="item.footer_text"
          v-validate="'required'">
        </el-input>
      </form-item>
    </div>

    <div class="col-sm-12">
      <app-save-buttons @btn-click="validateBeforeSubmit" type="save"/>
    </div>

  </div>
</template>

<script>
import FormItem from "~/components/form-item";
import AppSaveButtons from "@/components/app-save-buttons";
import ElPhoneInput from "../../components/el-phone-input";
export default {
  layout: 'dashboard',
  components: {
    ElPhoneInput,

    AppSaveButtons,
    FormItem,
  },
  data(){
    return {
      item: {
        id: null,
        email: null,
        phone: null,
        fax: null,
        address: null,
        site: null,
        vk_link: null,
        fb_link: null,
        instagram_link: null,
        twitter_link: null,
        youtube_link: null,
        footer_text: null,
      },
    }
  },
  async asyncData ({ params, query, app }) {
    let {data} = await app.$api.restGet('/admin/settings/get')

    return {
      item: data,
    }
  },
  methods: {
    validateBeforeSubmit(close) {
      console.log('validateBeforeSubmit')
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
      console.log('=== update')
      this.$store.commit('SET_LOADING_FULL', true);
      let item = JSON.parse(JSON.stringify(this.item))
      if (item.image) {
        item.image = item.image.id
      }

      let {data, status} = await this.$api.restPut('/admin/settings/update', item);
      if(status === 200) {
        this.$notifycation.updated();
      }
      else {
        this.$notifycation.error();
      }

      this.$store.commit('SET_LOADING_FULL', false);
    },
  },
}
</script>

<style scoped>

</style>
