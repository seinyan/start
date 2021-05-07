<template>
  <div class="row">
    <div class="col-sm-6">
      <div style="max-width: 200px;">
        <img v-if="item.person.image" :src="item.person.image.url">
      </div>
      <div>Роль: {{ item.role_title }}</div>
      <div>E-mail: {{ item.email }}</div>
      <div>Тел: {{ item.phone }}</div>
      <div>Имя: {{ item.person.first_name }}</div>
      <div>Фамилия: {{ item.person.last_name }}</div>
      <div>Отчество: {{ item.person.middle_name }}</div>
      <div>Средняя оценка: {{ item.average_rating }}</div>
      <div>Отзывов: {{ item.review_count }}</div>
    </div>
    <div class="col-sm-6">
      <div>Номер карты: {{ item.card_number }}</div>
      <div>Дата обнавление карты: {{ item.card_updated_at }}</div>

      <div style="margin-bottom: 15px;margin-top: 15px;border: 1px solid black;"></div>

      <div>Статус (модерация): {{ item.moderation_status_title }}</div>
      <div>Дата (модерация): {{ item.moderation_at }}</div>
      <div>Коментарии (модерация): {{ item.moderation_comment }}</div>

      <div v-if="item.moderation_status === 'STATUS_SEND'">
        <form-item label="Статус" class="w-100"
                   :isError="errors.has('form.moderationForm')"
                   :validate-message="errors.first('form.moderationForm')">
          <el-select class="w-100" v-validate="'required'" name="form.role" v-model="moderationForm.moderation_status"
                     placeholder="Статус">
            <el-option class="w-100"
                       v-for="item in moderation_status"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </form-item>
        <form-item label="Коментарии"
                   class="w-100"
                   :isError="errors.has('form.moderation_comment')"
                   :validate-message="errors.first('form.moderation_comment')">
          <el-input class="w-100"
                    v-model="moderationForm.moderation_comment"
                    placeholder="Коментарии"
                    type="textarea"
                    :rows="2"
                    name="form.moderation_comment"
                    v-validate="'required'"/>
        </form-item>
        <form-item>
          <el-button @click="validateBeforeSubmit">Созранить</el-button>
        </form-item>
      </div>

    </div>
    <div class="col-sm-12">
      <div>
        <p>О себе</p>
        <div v-html="item.person.about"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import FormItem from "~/components/form-item";
  import AppSaveButtons from "../../components/app-save-buttons";
  export default {
    components: {AppSaveButtons, FormItem},
    data() {
      return {
        item: {
          username: null,
          password: null,
          role: null,
          email: null,
          phone: null,
          is_active: true,
          referral: null,
          referral_user: null,
          person: {
            image: null,
            first_name: null,
            last_name: null,
            middle_name: null,
            birth_date: null,
            gender: null,
          }
        },
        moderationForm: {
          moderation_status: 'STATUS_APPROVED',
          moderation_comment: null,
        },
        moderation_status: [
          {label: 'STATUS_APPROVED', value: 'STATUS_APPROVED'},
          {label: 'STATUS_DECLINED', value: 'STATUS_DECLINED'},
        ],
      }
    },
    async asyncData ({ params, query, app }) {
      let {data} = await app.$api.restGet('/admin/user/'+params.id)

      return {
        item: data,
      }
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.updateItem();
            return;
          }
        });
      },
      async updateItem() {
        this.$store.commit('SET_LOADING_FULL', true)

        let {data, status} = await this.$api.restPut('/admin/user/moderation/'+this.item.id, this.moderationForm);
        if(status === 200) {
          this.$notifycation.updated()

          this.item.moderation_at = data.moderation_at
          this.item.moderation_status = data.moderation_status
        }
        else {
          this.$notifycation.error()
        }
        this.$store.commit('SET_LOADING_FULL', false)
      },
    },
  }
</script>

<style lang="scss">

</style>
