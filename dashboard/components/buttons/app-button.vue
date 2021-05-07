<template>
  <el-tooltip v-if="tooltip" content="_update" placement="top">
    <el-button @click="click" :size="size">
      <i v-if="type === 'create' " class="fas fa-plus-circle"></i>
      <i v-if="type === 'update' " class="fas fa-edit"></i>
      <i v-if="type === 'delete' " class="fas fa-trash-alt"></i>
      <span v-if="!mini">{{ type }}</span>
    </el-button>
  </el-tooltip>
  <el-button v-else @click="click" :size="size">
    <i v-if="type === 'create' " class="fas fa-plus-circle"></i>
    <i v-if="type === 'update' " class="fas fa-edit"></i>
    <i v-if="type === 'delete' " class="fas fa-trash-alt"></i>
    <span v-if="!mini">{{ type }}</span>
  </el-button>
</template>

<script>
export default {
  name: "app-button",
  props: {
    type: null, // create update delete
    mini: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    size: {
      type: String,
      default: function () {
        return 'medium' // medium / small / mini
      }
    },
    tooltip: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">

</style>
