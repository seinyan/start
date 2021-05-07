<template>
  <div class="w-100">
    <security-section type="restore" :msg="msg" :error="error">
      <form-item :isError="errors.has('form.username')" :validate-message="errors.first('form.username')">
        <el-input
          style="width: 100%"
          v-model="form.email"
          placeholder="E-mail"
          name="form.username"
          v-validate="'required|email'"/>
      </form-item>
      <el-button type="primary" class="w-100" @click="validateBeforeSubmit">
        Восстановить
      </el-button>
    </security-section>
  </div>
</template>

<script>
  import FormItem from "~/components/form-item";
  import SecuritySection from "@/pages/security/security-section";
  export default {
    layout: 'empty',
    components: {SecuritySection, FormItem},
    data(){
      return {
        form: {
          email: null,
        },
        msg: null,
        error: null,
      }
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.restore()
            return
          }
        });
      },
      async restore() {
        this.$store.commit('SET_LOADING_FULL', true)

        let {data, status} = await this.$api.restPost('/restore',  this.form)
        if(status === 200) {
          this.error = null
          this.msg = 'Пароль отправлен на E-mail'
        }
        else{
          this.error = 'Пользователь не существует!'
        }

        this.$store.commit('SET_LOADING_FULL', false)
      },
    }
  }
</script>

<style lang="scss">

</style>
