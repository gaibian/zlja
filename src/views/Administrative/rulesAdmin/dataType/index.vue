<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container">
            <el-button type="primary" size="small" class="filter-item" @click="handleAdd">设置数据类型</el-button>
        </div>
        <el-table :data="tableData" border :maxHeight="tableHeight" v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="数据权限-数据类型" prop="type_name"></el-table-column>
            <el-table-column label="数据权限对应模型" prop="type_model"></el-table-column>
            <el-table-column label="数据权限模型对应字段" prop="type_field"></el-table-column>
            <el-table-column label="操作" width="266">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleDataRule(scope)">设置数据规则</el-button>
                    <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        title="设置数据类型"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
        <el-dialog
        title="设置数据规则"
        :visible.sync="dialogVisible1"
        width="600px"
        :before-close="handleClose1">
        <data-rule @change="handleChange1" :flag="editFlag" :id="ruleId"></data-rule>
        </el-dialog>
    </div>
</template>

<script>
import { getDataTypeList,setDataType,deleteDataType } from '@/api/rules'
import operate from './operate'
import dataRule from './dataRule'
export default {
    name:'dataType',
    components:{
        operate,
        dataRule
    },
    data() {
        return {
            tableData:[],
            tableHeight:null,
            loading:false,
            dialogVisible: false,
            dialogVisible1: false,
            editFlag:false,
            editId:'',
            ruleId:'',
        }
    },
    created() {
        this.init();
    },
    methods:{
        init() {
            this.loading = true;
            getDataTypeList().then(res => {
                if(res !== 'error'){
                    console.log(res)
                    this.tableData = res.data.data
                    this.loading = false;
                }
            })
        },
        handleDelete(scope) {
            this.$confirm('确定删除该数据类型?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deleteDataType(scope.row.type_id).then(res => {
                    if(res !== 'error') {
                        _g.toastMsg('success','删除成功')
                        this.init()
                    }
                })
            })
            
        },
        handleDataRule(scope) {
            console.log(scope)
            this.editFlag = true;
            this.ruleId = scope.row.type_id;
            this.dialogVisible1 = true;
        },
        handleEdit(scope) {
            this.editFlag = true;
            this.editId = scope.row.type_id;
            this.dialogVisible = true;
        },
        handleChange(flag) {
            if(flag){
                this.init()
            }
            this.dialogVisible = false;
        },
        handleChange1(flag) {
            this.dialogVisible1 = false;
        },
        handleClose1() {
            this.dialogVisible1 = false;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleAdd() {
            this.editFlag = false;
            this.editId = '';
            this.dialogVisible = true;
        },
    }
}
</script>

<style>

</style>
