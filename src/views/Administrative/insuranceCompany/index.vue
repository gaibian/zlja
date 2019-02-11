<template>
    <div class="app_main_container">
        <div class="filter-container" res="topAdd">
            <el-input class="filter-item" style="width:200px" v-model="searchForm.company_name" placeholder="请输入保险公司名称查询" size="small"></el-input>
            <el-button class="filter-item" size="small" type="primary" @click="handleAdd">添加保险公司</el-button>
            <el-button class="filter-item" size="small" type="warning" @click="handleSearch" style="margin-left:0">查询</el-button>
        </div>
        <el-table :data="tableData" border v-loading="loading" :maxHeight="tableHeight" element-loading-text="数据加载中">
            <el-table-column label="保险公司名称" prop="company_name"></el-table-column>
            <el-table-column label="区域" prop="area_name"></el-table-column>
            <el-table-column label="类型" prop="type_name"></el-table-column>
            <el-table-column label="状态" prop="status">
                <template slot-scope="scope">
                    <span>{{ scope.row.status | status }}</span>
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
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
                <paging :type="'admin/insurance/company'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import { companyDelete } from '@/api/company'
import resize from '@/utils/page-mixins'
export default {
    name:'companyList',
    mixins: [resize],
    data() {
        return {
            searchForm:{
                company_name:'',
            },
            tableData:[],
            tableHeight:null,
            loading:false,
            update:false,
        }
    },
    created() {
        bus.$on('companyList',text=>{
            this.update = !this.update;
        })
    },
    methods:{
        handleSearch() {
            this.update = !this.update
        },
        handleDelete(scope) {
            this.$confirm('确定删除该保险公司?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                companyDelete(scope.row.id).then(res => {
                    if(res !== 'error'){
                        _g.toastMsg('success','删除成功')
                        this.update = !this.update;
                    }
                })
            })
            
        },
        handleEdit(scope) {
            this.$router.push({
                name:'companyEdit',
                params:{
                    id:scope.row.id
                },query:{
                    pageClick:true
                }
            })
        },
        handleAdd() {
            this.$router.push({
                name:'companyAdd'
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

