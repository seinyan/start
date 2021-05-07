<template>
  <div class="row">
    <div class="col-sm-12 margin-top-20">
      <el-table :data="items.items" border style="width: 100%">
        <el-table-column prop="id" label="ID"/>
        <el-table-column prop="email" label="E-mail"/>
        <el-table-column prop="phone" label="Тел"/>
        <el-table-column prop="name" label="Фио"/>
        <el-table-column prop="created_at" label="Дата"/>
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
export default {
  layout: 'dashboard',
  components: {AppPagination},
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

    let {data} = await app.$api.restGet('/admin/subscriber/list', form)

    return {
      items: data,
    }
  },
  methods: {
    async getList(page) {
      this.$store.commit('SET_LOADING_FULL', true)
      let {data} = await this.$api.restGet('/admin/subscriber/list', this.form)

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
      let data = await this.$api.restDelete('/admin/subscriber/delete/'+item.id);
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
