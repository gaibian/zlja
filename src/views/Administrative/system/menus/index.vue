<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container" ref="topAdd">
            <el-button class="filter-item" type="primary" size="small" @click="handleAdd">添加菜单</el-button>
        </div>
        <el-table :data="tableData" border v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="名称"></el-table-column>
        </el-table>
       
        <el-dialog
        title="配置数据字典"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>
<script>
import { menuIndex } from '@/api/menus'
import operate from './operate'
export default {
    name:'menusList',
    components:{
        operate
    },
    data() {
        return {
            tableData:[],
            editFlag:false,
            editId:'',
            loading: false,
            dialogVisible:false,
        }
    },
    created() {
        this.init()
    },
    methods:{
        init() {

        },
        
        handleAdd() {
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleChange() {

        }

    }
}
</script>
<style lang="scss" scoped>

</style>

