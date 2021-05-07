<template>
  <div class="app-pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="page_count"
      layout="prev, pager, next"
      :total="total_count">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "app-pagination",
  props: {
    scroll_to_el: {},
    current_page: {},
    page_count: {},
    total_count: {},
  },
  data(){
    return {
      page: 1
    }
  },
  methods: {
    handleSizeChange(val) {

    },
    handleCurrentChange(page) {
      this.$router.push({query: {page: page}})
      this.$emit('change-page', page);
    }
  },
  mounted() {
    this.page = this.current_page;
  }
}
</script>

<style lang="scss">
.app-pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 15px 0 0 0;
  padding: 0;
  /*margin-bottom: 30px;*/
}
</style>
