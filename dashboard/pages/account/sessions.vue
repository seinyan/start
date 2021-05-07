<template>
  <div>

    <form-item>
      <el-button @click="clearAllSession">Завершить все сеансы</el-button>
    </form-item>

    <el-table :data="items" border style="width: 100%">
      <el-table-column min-width="100px" label="ID" prop="id"/>
      <el-table-column min-width="250px">
        <template slot-scope="scope">
          <user-agent :item="scope.row.user_agent"/>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Дата" prop="last_at"/>
    </el-table>
  </div>
</template>

<script>
import UserAgent from "../../components/user-agent";
import FormItem from "../../components/form-item";
export default {
  scrollToTop: true,
  name: "sessions",
  components: {FormItem, UserAgent},
  data() {
    return {
      items: [],
    }
  },
  async asyncData ({ params, query, app }) {
    let {data} = await app.$api.restGet('/currentuser/sessions')

    return {
      items: data,
    }
  },
  methods: {
    async clearAllSession() {
      this.$store.commit('SET_LOADING_FULL', true)
      let {data, status} = await this.$api.restPost('/currentuser/sessions/clear_all')

      await this.$store.dispatch('LOGOUT')
      window.location.href = "/login"

      this.$store.commit('SET_LOADING_FULL', false)
    },
  }
}
</script>

<style scoped>

</style>
