<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container">
            <el-button type="primary" size="small" class="filter-item" @click="handleAdd">配置权限</el-button>
        </div>
        <el-table :data="tableData" border :maxHeight="tableHeight" v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="名称" prop="access_name"></el-table-column>
            <el-table-column label="app" prop="app"></el-table-column>
            <el-table-column label="controller" prop="controller"></el-table-column>
            <el-table-column label="action" prop="action"></el-table-column>
        </el-table>
        <el-dialog
        title="配置数据字典"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>
<script>
import { getList } from '@/api/rules.js'
import operate from './operate'
export default {
    name:'rules',
    components:{
        operate
    },
    data() {
        return {
            dialogVisible: false,
            editFlag: false,
            editId:'',
            tableData:[],
            tableHeight:null,
            loading:false,
        }
    },
    created() {
        this.init();
    },
    methods:{
        init() {
            this.loading = true;
            getList().then(res => {
                if(res !== 'error'){
                    this.tableData = res.data.data
                    this.loading = false;
                }
            })
        },
        handleAdd() {
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleChange(flag) {
            if(flag){
                this.init()
            }
            this.dialogVisible = false;
        }
    }
}
</script>
