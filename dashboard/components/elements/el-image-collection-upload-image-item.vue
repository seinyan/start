<template>
  <div ref="item" v-loading="loading" :style="{height: width}" class="el-image-collection-image">
    <div class="el-image-collection-image-btns">
      <app-button type="delete" size="mini" mini @click="deleteItemConfirm"/>
      <app-button type="update" size="mini" mini  @click="cropItem"/>
    </div>
    <img :src="imgSrc">
  </div>
</template>

<script>
import {getMilliseconds} from '~/utils'
import AppButton from "../buttons/app-button";
export default {
  name: "el-image-collection-upload-image-item",
  components: {AppButton},
  data() {
    return {
      loading: true,
      width: '100%',
      imgSrc: null,
    }
  },
  props: {
    item: null,
    reload: null
  },
  methods: {
    get_image() {
      this.imgSrc = this.item.domain + this.item.urls.large+'?id='+getMilliseconds()
    },
    deleteItemConfirm(){
      let _this = this;
      this.$confirm('Вы действительно хотите удалить', '', {
        confirmButtonText: 'ДА',
        cancelButtonText: 'Отменить',
        type: 'warning'
      }).then(() => {
        _this.deleteItem()
      }).catch(() => { })
    },
    async deleteItem(){
      let data = await this.$api.restDelete('/file/delete/'+this.item.id);
      if(data.status === 204) {
        this.$notifycation.deleted()
        this.$emit('deleted', this.item)
        // this.items.items.splice(this.items.items.indexOf(item), 1);
      }else {
        this.$notifycation.error()
      }
    },
    cropItem() {
      this.$emit('crop', this.item)
    }
  },
  mounted() {
    var width = this.$refs.item.clientWidth
    let _this = this
    setTimeout(function () {
      _this.width = _this.$refs.item.clientWidth+'px'
      _this.loading = false
      console.log('width: '+_this.width)
    }, 100)
    this.get_image()
  },
  watch: {
    reload: function () {
      this.get_image()
    }
  }
}
</script>

<style lang="scss">
.el-image-collection-image-btns {
  position: absolute;
  top: 8px;
  right: 8px;
}
.el-image-collection-image {
  position: relative;
  margin: 5px;
  width: calc(200px - 10px);
  border: 1px dashed #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .el-image-collection-image {
    width: calc(50% - 10px);
  }
}
</style>
