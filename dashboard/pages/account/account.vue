<template>
  <div class="row">

    <div class="col-sm-12" style="margin-bottom: 30px;">
      <div class="account-image-block">
        <div class="account-image-block-image">
          <el-image-upload
            is_square
            :removed="false"
            :aspect_ratio="300/300"
            sub_path="user"
            :item="item.person.image" square @input="(value)=>{item.person.image = value}"/>
        </div>
        <div class="account-image-block-pass">
          <update-pass/>
        </div>
      </div>
    </div>

    <div class="col-sm-6">
      <form-item label="Имя" class="w-100"
                 :isError="errors.has('item.person.first_name')"
                 :validate-message="errors.first('item.person.first_name')">
        <el-input class="w-100"
                  v-model="item.person.first_name"
                  placeholder="Имя"
                  name="item.person.first_name"
                  v-validate="'required'"/>
      </form-item>
      <form-item label="Фамилия" class="w-100"
                 :isError="errors.has('item.person.last_name')"
                 :validate-message="errors.first('item.person.last_name')">
        <el-input
          clcd ass="w-100"
          v-model="item.person.last_name"
          placeholder="Фамилия"
          name="item.person.last_name"
          v-validate="'required'"/>
      </form-item>
      <form-item label="Отчество" class="w-100"
                 :isError="errors.has('item.person.middle_name')"
                 :validate-message="errors.first('item.person.middle_name')">
        <el-input
          clcd ass="w-100"
          v-model="item.person.middle_name"
          placeholder="Отчество"
          name="item.person.middle_name"/>
      </form-item>
    </div>
    <div class="col-sm-6">
<!--      <form-item v-if="$store.state.user.role === 'ROLE_ADMIN'" label="Роль" class="w-100"-->
<!--                 :isError="errors.has('form.role')"-->
<!--                 :validate-message="errors.first('form.role')">-->
<!--        <el-select  class="w-100" v-validate="'required'" name="form.role" v-model="item.role"-->
<!--                    placeholder="_role">-->
<!--          <el-option class="w-100"-->
<!--                     v-for="item in $store.state.user_roles"-->
<!--                     :key="item.value"-->
<!--                     :label="item.label"-->
<!--                     :value="item.value">-->
<!--          </el-option>-->
<!--        </el-select>-->
<!--      </form-item>-->
      <form-item label="E-mail" class="w-100"
                 :isError="errors.has('item.email')"
                 :validate-message="errors.first('item.email')">
        <el-input class="w-100"
                  v-model="item.email"
                  placeholder="E-mail"
                  name="item.email"
                  v-validate="'required|email'"/>
      </form-item>
      <el-phone-input v-model="item.phone"/>
    </div>
    <div class="col-sm-12">
      <el-button class="app-base-btn" @click="validateBeforeSubmit">
        <i-save/> Сохранить
      </el-button>
    </div>

  </div>
</template>

<script>
import ISave from "@/components/icons/i-save";
import FormItem from "@/components/form-item";
import UpdatePass from "@/components/user/update-pass";
import ElPhoneInput from "../../components/el-phone-input";
import ElImageUpload from "../../components/elements/el-image-upload";
export default {
  name: "account",
  components: {ElImageUpload, ElPhoneInput, ISave, FormItem, UpdatePass},
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
      mask: '7-###-###-##-##',
    }
  },
  async asyncData ({ params, query, store, app }) {
    let {data} = await app.$api.restGet('/currentuser/get')

    return {
      item: data,
    }
  },
  methods: {
    validateBeforeSubmit(close) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateCurrentUser()
          return
        }
      });
    },
    async updateCurrentUser() {
      this.$store.commit('SET_LOADING_FULL', true)
      let item = JSON.parse(JSON.stringify(this.item))

      if(item.person.image) {
        item.person.image = item.person.image.id
      }

      let {data, status} = await this.$api.restPut('/currentuser/update', item)
      if(status === 200) {
        this.$notifycation.updated()
        this.$store.dispatch('UPDATE_USER')
      }
      else {
        this.$notifycation.error(this.getValidationErr(data.violations))
      }
      this.$store.commit('SET_LOADING_FULL', false)
    },
    changeImage(image) {
      this.item.person.image = image
    },
    getValidationErr(violations) {
      let error =  ''
      for(let i in violations) {
        if(violations[i].title) {
          error  += violations[i].title + " "
        }
      }
      return error
    }
  },
}
</script>

<style lang="scss">

.account-image-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}
.account-image-block-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.account-image-block-pass {
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
}
@media screen and (max-width: 600px) {
  .account-image-block {
    flex-direction: column;
  }
  .account-image-block-pass {
    justify-content: center;
  }
}

</style>
