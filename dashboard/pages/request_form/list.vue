<template>
  <div class="row">
    <div class="col-sm-12 margin-top-20">
      <el-table :data="items.items" border style="width: 100%">
        <el-table-column prop="status" label="status"/>
        <el-table-column prop="fio" label="fio"/>
        <el-table-column prop="email" label="email"/>
        <el-table-column prop="phone" label="phone"/>
        <el-table-column prop="message" label="message"/>
        <el-table-column prop="created_at" label="Дата создания"/>
        <el-table-column prop="updated_at" label="Дата обновления"/>
        <el-table-column width="65px">
          <template slot-scope="scope">
<!--            <div>-->
<!--              <el-tooltip content="$t('_update')" placement="top">-->
<!--                <nuxt-link :to="{ name: 'dashboard_request_form_update', params: {id: scope.row.id } }">-->
<!--                  <el-button size="small">-->
<!--                    <i class="fas fa-edit"></i>-->
<!--                  </el-button>-->
<!--                </nuxt-link>-->
<!--              </el-tooltip>-->
              <el-tooltip v-if="scope.row.status === 'NEW'" content="$t('_update_status')" placement="top">
                <el-button size="small" plain @click="updateStatus(scope.row)">
                  <i class="fas fa-check-circle"></i>
                </el-button>
              </el-tooltip>
<!--            </div>-->
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
      limit: 15,
      archive: 0,
      categories: [],
      delete_confirm: false,
      delete_item: null,
    }
  },
  async asyncData ({ params, query, app }) {
    let {data} = await app.$api.restGet('/admin/request_form/list' , {
      limit: 15,
      page: 1,
      removed: false
    });

    return {
      items: data,
    };
  },
  methods: {
    async getList(page) {
      this.$store.commit('SET_LOADING_FULL', true);
      let {data} = await this.$api.restGet('/admin/request_form/list' , {
        page: page,
        limit: this.limit,
        archive: this.archive,
      });

      this.items = data;
      this.$store.commit('SET_LOADING_FULL', false);
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
      let data = await this.$api.restDelete('/admin/request_form/delete/'+item.id);
      if(data.status === 204) {
        this.$notifycation.deleted();
        this.items.items.splice(this.items.items.indexOf(item), 1);
      }else {
        this.$notifycation.error();
      }
    },
    async updateStatus(item) {
      let {data, status} = await this.$api.restPut('/admin/request_form/update_status/'+item.id)
      if(status === 200) {
        this.$notifycation.updated()
        item.status = data.status
        this.items.items.splice(this.items.items.indexOf(item), item)
      }
      else {
        this.$notifycation.error()
      }
    }
  },
}
</script>
