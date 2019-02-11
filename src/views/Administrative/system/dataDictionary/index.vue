<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container" ref="topAdd">
            <el-input class="filter-item" size="small" v-model="searchForm.title" placeholder="请输入标题进行查询" style="width:200px"></el-input>
            <el-button class="filter-item" type="primary" size="small" @click="handleAdd">配置数据字典</el-button>
            <el-button class="filter-item" type="warning" size="small" @click="handleSearch" style="margin-left:0">查询</el-button>
        </div>
        <el-table :data="tableData" border :maxHeight="tableHeight" v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="标题" prop="title" min-width="150"></el-table-column>
            <el-table-column label="名称" prop="name" min-width="150"></el-table-column>
            <el-table-column label="作用域" prop="scope" min-width="500"></el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope)" type="primary">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" style="height:60px;">
            <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="end">
            <div class="block pages">
                <paging :type="'admin/system/datadict'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </div>
            </el-row>
        </div>
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
import request from '@/utils/request'
import axios from 'axios'
import resize from '@/utils/page-mixins'
import operate from './operate.vue'
import { datadictIndex,datadictSave } from '@/api/dataDictionary'
export default {
    name:"dataDictionary",
    mixins:[resize],
    components:{
        operate
    },
    data() {
        return {    
            dialogVisible: false,
            tableData:[],
            tableHeight:null,
            loading:false,
            editFlag:false,
            searchForm:{
                title:'',
            },
            update:false,
            zj:'',
            editId:'',
            dataForm:{
                title:'',
                name:'',
                value:'',
            }
        }
    },
    created() {
        
    },
    methods:{
        handleSearch() {
            this.update = !this.update
        },
        handleChange(flag) {
            this.dialogVisible = false;
            if(flag){
                this.loading = true;
                this.update = !this.update
            }
        },
        handlePaging(data) {
            this.tableData = data.data;
            this.loading = false;
        },
        handleEdit(scope) {
            this.editFlag = true;
            this.dialogVisible = true;
            this.editId = scope.row.id
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleAdd() {
            this.editFlag = false;
            this.dialogVisible = true;
        },
    }
}
</script>
<style lang="scss" scoped>

</style>

