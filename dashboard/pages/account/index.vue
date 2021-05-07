<template>
  <div>
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane label="Мой аккаунт" name="account_account">
        <span slot="label"> Аккаунт</span>
      </el-tab-pane>
      <el-tab-pane label="account_sessions" name="account_sessions">
        <span slot="label"> Активные сеансы</span>
      </el-tab-pane>
      <el-tab-pane label="account_sessions" name="account_logs">
        <span slot="label"> История активности</span>
      </el-tab-pane>
    </el-tabs>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  name: "index",
  scrollToTop: true,
  data() {
    return {
      activeTab: 'account_account',
    };
  },
  methods: {
    handleClick(tab, event) {
      if (this.activeTab !== this.$route.name) {
        this.$router.push({name: this.activeTab})
      }
    }
  },
  created() {
    this.activeTab = this.$route.name
  }
}
</script>

<style scoped>

</style>
