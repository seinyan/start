<template>
  <div class="w-100">
    <security-section type="login" :msg="msg" :error="error">
      <div class="w-100">
        <form-item class="w-100"
                   :isError="errors.has('form.username')"
                   :validate-message="errors.first('form.username')">
          <el-input
            class="w-100"
            v-model="form.email"
            placeholder="Э-майл"
            name="form.username"
            v-validate="'required|email'"/>
        </form-item>
        <form-item class="w-100"
                   :isError="errors.has('form.password')"
                   :validate-message="errors.first('form.password')">
          <el-input
            class="w-100"
            v-model="form.password"
            name="form.password"
            placeholder="Пароль"
            v-validate="'required'"/>
        </form-item>
        <el-button type="primary" class="w-100" @click="validateBeforeSubmit">
          Войти
        </el-button>
      </div>
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
        email: 'narek.seinyan@gmail.com',
        password: '111111',
      },
      msg: null,
      error: null,
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if(result) {
          this.login()
          return
        }
      })
    },
    async login() {
      this.$store.commit('SET_LOADING_FULL', true)
      let status = await this.$store.dispatch('LOGIN', this.form)

      if(status === 200) {
        this.$router.push({name: 'index'})
      }
      else {
        this.error = 'Неправильный логин или пароль!'
        this.$cookies.remove('auth')
        this.$cookies.remove('user')
      }
      this.$store.commit('SET_LOADING_FULL', false)
    },
  }
}
</script>

<style lang="scss">

</style>
