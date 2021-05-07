<template>
  <div>
    <el-button v-if="!openModal" @click="openModal=true">
      <i class="fas fa-lock"></i> Обнавить пароль
    </el-button>
    <el-dialog width="350px" top="35vh"
               v-loading="loading" append-to-body
               :visible.sync="openModal"
               :close-on-click-modal="false"
               :close-on-press-escape="false">

      <form-item label="Пароль" class="w-100"
                 :isError="errors.has('item.password')"
                 :validate-message="errors.first('item.password')">
        <el-input
          clcd ass="w-100"
          v-model="item.password"
          placeholder="Пароль"
          show-password
          name="item.password"
          v-validate="'required'"/>
      </form-item>
      <div class="w-100 text-center">
        <el-button @click="validateBeforeSubmit">
          <i-save/> Сохоанить
        </el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import ISave from "@/components/icons/i-save";
import FormItem from "@/components/form-item";
export default {
  name: "update-pass",
  components: {FormItem, ISave},
  data() {
    return {
      item: {
        password: null,
      },
      openModal: false,
      loading: false,
    }
  },
  props: {
    id: null,
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.updateItem()
          return
        }
      });
    },
    async updateItem() {
      this.loading = true

      if (this.id) {
        let {data, status} = await this.$api.restPut('/admin/user/update_pass/'+this.id, this.item)
        if(status === 200) {
          this.$notifycation.updated()
          this.openModal = false
        }
        else {
          this.$notifycation.error()
        }
      }
      else {
        let {data, status} = await this.$api.restPut('/currentuser/update_pass', this.item)
        if(status === 200) {
          this.$notifycation.updated()
          this.openModal = false
        }
        else {
          this.$notifycation.error()
        }
      }



      this.loading = false
    },
  }
}
</script>

<style lang="scss">

</style>
