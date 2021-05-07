<template>
  <div class="w-100">
    <security-section type="register" :msg="msg" :error="error">
      <div class="w-100">
        <form-item :isError="errors.has('form.email')" :validate-message="errors.first('form.email')">
          <el-input style="width: 100%" v-model="form.email" placeholder="E-mail"
                    name="form.email" v-validate="'required|email'"/>
        </form-item>
        <form-item :isError="errors.has('form.password')" :validate-message="errors.first('form.password')">
          <el-input style="width: 100%" v-model="form.password" placeholder="Пароль"
                    name="form.password" v-validate="'required'"/>
        </form-item>
        <el-button type="primary" class="w-100" @click="validateBeforeSubmit">
          Регистрация
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
          email: null,
          password: null,
        },
        msg: null,
        error: null,
      }
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.register();
            return;
          }
        });
      },
      async register() {
        this.$store.commit('SET_LOADING_FULL', true)
        let {data, status} = await this.$api.restPost('/register', this.form)

        if(status === 200) {
          this.error = null
          this.msg =  'Спасибо за регистрацию!'

          let status = await this.$store.dispatch('LOGIN', {
            email: this.form.email,
            password: this.form.password,
          })

          if(status === 200) {
            let _this = this
            setTimeout(function () {
              _this.$router.push({name: 'index'})
            }, 3000)
          }

        }
        else{
          this.error =  ''
          for(let i in data.violations) {
            if(data.violations[i].title) {
              this.error  += data.violations[i].title + " "
            }
          }
        }

        this.$store.commit('SET_LOADING_FULL', false)
      },
    }
  }
</script>
