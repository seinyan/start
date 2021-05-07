<template>
    <div @dblclick="edit=true" v-loading="loading">
        <span v-if="!item[prop] && edit===false">------</span>
        <span v-if="!edit">{{item[prop]}}</span>
        <el-input @keyup.enter.native="updateItem" v-if="edit" style="width: 100%;" v-model="item[prop]">
            <el-button size="medium" slot="append" @click="updateItem">
                <i class="fas fa-save"></i>
            </el-button>
        </el-input>
    </div>
</template>

<script>
    export default {
        name: "el-table-input-edit",
        data() {
            return {
                edit: false,
                loading: false
            }
        },
        props: {
            item: null,
            path: null,
            prop: null,
        },
        methods: {
            async updateItem() {
                this.loading = true
                let {data, status} = await this.$api.restPut(this.path+this.item.id, this.item)
                if(status === 200) {
                    this.$notifycation.updated()
                    this.edit = false
                }else {
                    this.$notifycation.error()
                }
                this.loading = false
            },
        }
    }
</script>

<style lang="scss">

</style>
