<template>
  <div class="row">
    <div class="col-sm-4 margin-bottom-15">
      <nuxt-link :to="{ name: 'page_create' }">
        <app-button type="create"/>
      </nuxt-link>
    </div>
    <div class="col-sm-12">
      <el-table :data="items.items" border style="width: 100%">
        <el-table-column prop="title" label="Заголовок"/>
        <el-table-column width="165px">
          <template slot-scope="scope">
            <div >
              <el-tooltip :content="$t('_is_publish')" placement="top">
                <el-switch @change="is_publish(scope.row)" v-model="scope.row.is_publish"/>
              </el-tooltip>
              <nuxt-link :to="{ name: 'page_update', params: {id: scope.row.id } }">
                <app-button :mini="true" type="update" tooltip size="small"/>
              </nuxt-link>
              <app-button
                v-if="!scope.row.is_system"
                :mini="true" type="delete" tooltip size="small" @click="deleteItemConfirm(scope.row)"/>
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
import AppButton from "../../components/buttons/app-button";
export default {
  layout: 'dashboard',
  components: {AppButton, AppPagination},
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
        is_active: false,
      },
      form: null,
    }
  },
  async asyncData ({ params, query, app }) {
    let form = formParseQuery(query, {
      limit: 15,
      page: 1,
    })

    let {data} = await app.$api.restGet('/admin/page/list', form)

    return {
      items: data,
    }
  },
  methods: {
    async getList(page) {
      this.$store.commit('SET_LOADING_FULL', true)
      this.form.page = page
      let {data} = await this.$api.restGet('/admin/page/list', this.form)

      this.items = data
      this.$store.commit('SET_LOADING_FULL', false)
    },
    async is_publish(item) {
      let data = await this.$api.restPut('/admin/page/is_publish/'+item.id, {
        is_publish: item.is_publish
      })
      if(data.status === 200) {
        this.$notifycation.updated()
      }
      else {
        this.$notifycation.error()
      }
    },
    deleteItemConfirm(item){
      var _this = this;
      this.$confirm('Вы действительно хотите удалить', '', {
        confirmButtonText: 'ДА',
        cancelButtonText: 'Отменить',
        type: 'warning'
      }).then(() => {
        _this.deleteItem(item);
      }).catch(() => { });
    },
    async deleteItem(item){
      let data = await this.$api.restDelete('/admin/page/delete/'+item.id);
      if(data.status === 204) {
        this.$notifycation.deleted();
        this.items.items.splice(this.items.items.indexOf(item), 1);
      }else {
        this.$notifycation.error();
      }
    },

  },
}
</script>
