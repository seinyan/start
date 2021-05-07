<template>
  <div class="row">
    <div class="col-sm-12 margin-bottom-15">
      <nuxt-link :to="{ name: 'user_create' }">
        <app-button type="create"/>
      </nuxt-link>
    </div>
    <div class="col-sm-12">
      <el-table :data="items.items" border style="width: 100%">
        <el-table-column width="70px" >
          <template slot-scope="scope">
            <el-table-image :image="scope.row.person.image"/>
          </template>
        </el-table-column>
        <el-table-column min-width="100px" label="ID" prop="id"/>
        <el-table-column min-width="100px" label="E-mail" prop="email"/>
        <el-table-column label="Тел." prop="phone"/>
        <el-table-column label="Роль" prop="role"/>
        <el-table-column width="115px">
          <template slot-scope="scope">
            <div>
              <el-tooltip :content="$t('_is_active')" placement="top">
                <el-switch
                  :disabled="$store.state.user.id === scope.row.id"
                  @change="is_active(scope.row)"
                  v-model="scope.row.is_active"/>
              </el-tooltip>
              <nuxt-link :to="{ name: 'user_update', params: {id: scope.row.id } }">
                <app-button :mini="true" type="update" tooltip size="small"/>
              </nuxt-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <app-pagination
        :scroll_to_el="'#scroll_to'"
        @change-page="getList"
        :current_page="items.current"
        :page_count="items.numItemsPerPage"
        :total_count="items.totalCount"/>
    </div>

  </div>
</template>

<script>
import {formParseQuery} from '~/utils'
import AppPagination from "@/components/app-pagination";
import ElTableImage from "~/components/elements/el-table-image";
import AppButton from "@/components/buttons/app-button";
export default {
  components: {AppButton, ElTableImage, AppPagination},
  data() {
    return {
      items: {
        items: [],
        current: 1,
        currentItemCount: null,
        numItemsPerPage: null,
        pageCount: null,
        pageRange: null,
        totalCount: null,
      },
      form: null,
    }
  },
  async asyncData ({ params, query, app }) {
    let form = formParseQuery(query, {
      limit: 15,
      page: 1,
    })

    let {data} = await app.$api.restGet('/admin/user/list', form)

    return {
      items: data,
    }
  },
  methods: {
    async getList(page) {
      this.form.page = page
      this.$store.commit('SET_LOADING_FULL', true)
      let {data} = await this.$api.restGet('/admin/user/list', this.form)

      this.items = data
      this.$store.commit('SET_LOADING_FULL', false)
    },
    async is_active(user) {
      let data = await this.$api.restPut('/admin/user/is_active/'+user.id, {
        is_active: user.is_active
      })
      if(data.statusCode === 200) {
        this.$notifycation.updated()
      }else {
        this.$notifycation.error()
      }
    },
  },
}
</script>

<style lang="scss">

</style>
