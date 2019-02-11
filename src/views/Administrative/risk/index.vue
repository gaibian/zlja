<template>
    <div class="app_main_container">
        <div class="filter-container" ref="topAdd">
            <el-input class="filter-item" v-model="searchForm.name" placeholder="请输入险种名称查询" style="width:200px"></el-input>
            <el-select class="filter-item" v-model="searchForm.company_id" placeholder="请选择保险公司查询" style="width:200px;">
                <el-option v-for="(item,index) in companyOption" :key="index" :label="item.company_name" :value="item.id"></el-option>
            </el-select>
            <el-button class="filter-item" size="small" type="primary" @click="handleAdd">添加险种</el-button>
            <el-button class="filter-item" size="small" type="warning" @click="handleSearch" style="margin-left:0">查询</el-button>
        </div>
        <el-table :data="tableData" border v-loading="loading" :maxHeight="tableHeight" element-loading-text="数据加载中">
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="简单名称" prop="simple_name"></el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    <span>{{ scope.row.status | status }}</span>
                </template>
                
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" style="height:60px;">
            <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="end">
            <div class="block pages">
                <paging :type="'admin/insurance/risk'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import { riskDelete } from '@/api/risk'
import { companyIndex } from '@/api/company'
import resize from '@/utils/page-mixins'
export default {
    name:'riskList',
    mixins: [resize],
    data() {
        return {
            searchForm:{
                name:'',
                company_id:'',
            },
            companyOption:[],
            tableData:[],
            tableHeight:null,
            loading:false,
            update:false,
        }
    },
    created() {
        bus.$on('riskList',text=>{
            this.update = !this.update;
        });
        companyIndex().then(res => {
            if(res !== 'error'){
                console.log(res)
                this.companyOption = res.data.data;
            }
        })
    },
    methods:{
        handleSearch() {
            this.update = !this.update
        },
        handleDelete(scope) {
            this.$confirm('确定删除该保险险种?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                riskDelete(scope.row.id).then(res => {
                    if(res !== 'error'){
                        _g.toastMsg('success','删除成功')
                        this.update = !this.update;
                    }
                })
            })
            
        },
        handleEdit(scope) {
            this.$router.push({
                name:'riskEdit',
                params:{
                    id:scope.row.id
                },query:{
                    pageClick:true
                }
            })
        },
        handleAdd() {
            this.$router.push({
                name:'riskAdd'
            })
        },
        handlePaging(data) {
            console.log(data)
            this.tableData = data.data;
            this.loading = false;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

