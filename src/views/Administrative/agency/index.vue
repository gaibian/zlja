<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container" ref="topAdd">
            <el-input class="filter-item" size="small" v-model="searchForm.agency_name" placeholder="请输入机构名称" style="width:200px"></el-input>
            <el-button class="filter-item" size="small" type="primary" @click="handleAdd">添加机构</el-button>
            <el-button class="filter-item" size="small" type="warning" @click="handleSearch" style="margin-left:0">查询</el-button>
        </div>
        <tree-table :data="tableData" border v-loading="loading" :maxHeight="tableHeight" element-loading-text="数据加载中" :evalFunc="func" :evalArgs="args" :expandAll="expandAll">
            <el-table-column label="机构简称" prop="agency_short_name"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="机构负责人" prop="agency_leader"></el-table-column>
            <el-table-column label="电话" prop="agency_phone"></el-table-column>
            <el-table-column label="操作" width="150" field="right">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
                    <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
                </template>
            </el-table-column>
        </tree-table>
         <div ref="btmGroup" style="height:60px;">
            <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="end">
                <!-- <btn-group @change="refresh" :selectedData="multipleSelection" :type="'admin/customer.customer'" :rule="rule"></btn-group> -->
                <paging :type="'admin/agency'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </el-row>
        </div>
        <el-dialog
        title="配置机构"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>
<script>
import { agencyIndex,agencyDelete } from '@/api/agency'
import operate from './operate'
import treeTable from './TreeTable'
  import treeToArray from './customEval'
import resize from '@/utils/page-mixins'
export default {
    name:'agencyList',
    mixins: [resize],
    components:{
        operate,
        treeTable
    },
    data() {
        return {
            searchForm:{
                agency_name:'',
            },
            func: treeToArray,
            args: [null, null, 'timeLine'],
            expandAll: true,
            update:false,
            tableData:[],
            tableHeight:null,
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
        handleSearch() {
            this.update = !this.update;
        },
        init() {
            
        },
        handleDelete(scope) {
            this.$confirm('确定删除该代理人?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                agencyDelete(scope.row.id).then(res => {
                    if(res !== 'error'){
                        _g.toastMsg('success','删除成功')
                        this.update = !this.update;
                    }
                })
            })
            
        },
        handleEdit(scope) {
            this.editFlag = true;
            this.editId = scope.row.id;
            this.dialogVisible = true;
        },
        handlePaging(data) {
            this.tableData = data;
            this.loading = false;
            console.log(this.tableData)
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
                this.loading = true;
                this.update = !this.update;
            }
            this.dialogVisible = false;
        }

    }
}
</script>
<style lang="scss" scoped>

</style>


