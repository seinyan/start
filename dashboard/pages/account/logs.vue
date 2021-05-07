<template>
  <div>
    <el-table :data="items.items" border style="width: 100%">
      <el-table-column min-width="100px" label="ID" prop="id"/>
      <el-table-column width="250px">
        <template slot-scope="scope">
          <user-agent :item="scope.row.user_agent"/>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="Тип" prop="type_title"/>
      <el-table-column width="140px" label="Дата" prop="created_at"/>
    </el-table>
    <app-pagination
      :scroll_to_el="'#scroll_to'"
      @change-page="getList"
      :current_page="items.current"
      :page_count="items.numItemsPerPage"
      :total_count="items.totalCount"/>
  </div>
</template>

<script>
import {formParseQuery} from '~/utils'
import AppPagination from "~/components/app-pagination";
import UserAgent from "../../components/user-agent";
export default {
  scrollToTop: true,
  name: "logs",
  components: {UserAgent, AppPagination},
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
      form: null
    }
  },
  async asyncData ({ params, query, app }) {
    let form = formParseQuery(query, {
      limit: 15,
      page: 1,
    })

    let {data} = await app.$api.restGet('/currentuser/logs', form)

    return {
      form: form,
      items: data,
    }
  },
  methods: {
    async getList(page) {
      this.form.page = page
      this.$store.commit('SET_LOADING_FULL', true)
      let {data} = await this.$api.restGet('/currentuser/logs', this.form)

      this.items = data
      this.$store.commit('SET_LOADING_FULL', false)
    },
  },
}
</script>

<style scoped>

</style>
