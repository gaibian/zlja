<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container">
            <el-button type="primary" size="small" class="filter-item" @click="handleAdd">配置权限</el-button>
        </div>
        <el-table :data="tableData" border :maxHeight="tableHeight" v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="名称" prop="access_name"></el-table-column>
            <el-table-column label="模块" prop="app"></el-table-column>
            <el-table-column label="控制器" prop="controller"></el-table-column>
            <el-table-column label="方法" prop="action"></el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        title="配置权限"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>
<script>
import { getList,rulesDetails } from '@/api/rules.js'
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
        handleEdit(scope) {
            console.log(scope)
            this.editFlag = true;
            this.dialogVisible = true;
            this.editId = scope.row.access_id;
            
        },
        handleAdd() {
            this.editFlag = false;
            this.editId = '';
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
