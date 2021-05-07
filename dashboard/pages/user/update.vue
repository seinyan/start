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
          <update-pass :id="item.id"/>
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
      <form-item label="E-mail" class="w-100"
                 :isError="errors.has('item.email')"
                 :validate-message="errors.first('item.email')">
        <el-input class="w-100"
                  v-model="item.email"
                  placeholder="E-mail"
                  name="item.email"
                  v-validate="'required|email'"/>
      </form-item>
      <form-item label="Тел." class="w-100"
                 :isError="errors.has('item.phone')"
                 :validate-message="errors.first('item.phone')">
        <div class="el-input">
          <input
            type="text"
            autocomplete="off"
            placeholder="Тел."
            name="item.phone"
            class="el-input__inner w-100"
            v-validate="'required|length:15'"
            data-vv-validate-on="change"
            v-model="item.phone"
            v-mask="mask"
            pattern="[0-9]*">
        </div>
      </form-item>
    </div>
    <div class="col-sm-12">
      <app-save-buttons type="update" @btn-click="validateBeforeSubmit"/>
    </div>
  </div>
</template>

<script>
import UpdatePass from "@/components/user/update-pass";
import FormItem from "@/components/form-item";
import ISave from "@/components/icons/i-save";
import AppSaveButtons from "@/components/app-save-buttons";
import ElImageUpload from "@/components/elements/el-image-upload";
export default {
  components: {ElImageUpload, AppSaveButtons, ISave, FormItem, UpdatePass, },
  data() {
    return {
      item: {
        id: null,
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
  async asyncData ({ params, query, app }) {
    let {data} = await app.$api.restGet('/admin/user/'+params.id)

    return {
      item: data,
    }
  },
  methods: {
    validateBeforeSubmit(close) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateItem(close);
          return;
        }
      });
    },
    async updateItem(close) {
      this.$store.commit('SET_LOADING_FULL', true)
      let item = JSON.parse(JSON.stringify(this.item))

      if(item.person.image) {
        item.person.image = item.person.image.id
      }

      let {data, status} = await this.$api.restPut('/admin/user/update/'+item.id, item)
      if(status === 200) {
        this.$notifycation.updated()
        if(close) {
          this.$router.push({name: 'user_list'})
        }
      }
      else {

        let error =  ''
        for(let i in data.violations) {
          if(data.violations[i].title) {
            error  += data.violations[i].title + " "
          }
        }
        this.$notifycation.error(error)

      }
      this.$store.commit('SET_LOADING_FULL', false)
    },
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
