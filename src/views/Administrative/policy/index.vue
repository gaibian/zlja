<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container" ref="topAdd">
            <el-input class="filter-item" size="small" v-model="searchForm.policy_number" style="width:200px" placeholder="请输入保单号查询"></el-input>
            <el-input class="filter-item" size="small" v-model="searchForm.applicant_name" style="width:200px" placeholder="请输入投保人查询"></el-input>
            <el-select class="filter-item" size="small" v-model="searchForm.company_id" placeholder="请选择保险公司查询" style="width:200px;">
                <el-option v-for="(item,index) in companyOption" :key="index" :label="item.company_name" :value="item.id"></el-option>
            </el-select>
            <el-select class="filter-item" size="small" v-model="searchForm.agent_id" placeholder="请选择代理人查询" style="width:200px;">
                <el-option v-for="(item,index) in userOption" :key="index" :label="item.agent_name" :value="item.id"></el-option>
            </el-select>
            <el-select class="filter-item" size="small" v-model="searchForm.agency_id" placeholder="请选择机构查询" style="width:200px;">
                <el-option v-for="(item,index) in agencyOption" :key="index" :label="item.agency_name" :value="item.id"></el-option>
            </el-select>
            <el-date-picker
                class="filter-item"
                v-model="searchForm.accept_date_start"
                type="date"
                size="small"
                style="width:200px"
                value-format="yyyy-MM-dd"
                clearable
                placeholder="请选择受理开始日期">
            </el-date-picker>
            <el-date-picker
                class="filter-item"
                v-model="searchForm.accept_date_end"
                type="date"
                size="small"
                style="width:200px"
                value-format="yyyy-MM-dd"
                clearable
                placeholder="请选择受理结束日期">
            </el-date-picker>
            <el-button class="filter-item" size="small" type="primary" @click="handleAdd">添加保单</el-button>
            <el-button class="filter-item" size="small" type="warning" @click="handleSearch" style="margin-left:0">查询</el-button>
            <router-link class="filter-item" :to="{name:'policyImport'}">
                <el-button size="small" type="primary">导入</el-button>
            </router-link>
        </div>
        <el-table :data="tableData" border v-loading="loading" :maxHeight="tableHeight" element-loading-text="数据加载中">
            <el-table-column label="投保单号" prop="apply_policy_number"></el-table-column>
            <el-table-column label="保单号" prop="policy_number"></el-table-column>
            <el-table-column label="保险公司名称" prop="company.company_name"></el-table-column>
            <el-table-column label="险种编码" prop="insurance_number"></el-table-column>
            <el-table-column label="险种名称" prop="risk.name"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope)">查看</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" style="height:60px;">
            <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="end">
            <div class="block pages">
                <paging :type="'admin/insurance/policy'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import { policyDelete } from '@/api/policy'
import { companyIndex } from '@/api/company'
import { agentIndex } from '@/api/agent'
import { agencyIndex } from '@/api/agency'
import resize from '@/utils/page-mixins'
export default {
    name:'policyList',
    mixins: [resize],
    data() {
        return {
            searchForm:{
                 policy_number:'',
                applicant_name:'',
                company_id:'',
                accept_date_start:'',
                accept_date_end:'',
                agent_id:'',
                agency_id:'',
            },
            companyOption:[],
            userOption:[],
            agencyOption:[],
            tableData:[],
            tableHeight:null,
            loading:false,
            update:false,
        }
    },
    
    created() {
        bus.$on('policyList',()=>{
            this.update = !this.update;
        })
        this.init();
    },
    methods:{
        init() {
            companyIndex().then(res => {
                if(res !== 'error'){
                    console.log(res)
                    this.companyOption = res.data.data;
                }
            })
            agentIndex().then(res => {
                if(res !== 'error') {
                    console.log(res)
                    this.userOption = res.data.data
                }
            })
            agencyIndex().then(res => {
            if(res !== 'error') {
                this.agencyOption = res.data;
            }
        })
        },
        handleSearch() {
            this.update = !this.update
        },
        handleDelete(scope) {
            this.$confirm('确定删除该保单?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                policyDelete(scope.row.id).then(res => {
                    if(res !== 'error'){
                        _g.toastMsg('success','删除成功')
                        this.update = !this.update;
                    }
                })
            })
            
        },
        handleEdit(scope) {
            this.$router.push({
                name:'policyEdit',
                params:{
                    id:scope.row.id
                },query:{
                    pageClick:true
                }
            })
        },
        handleAdd() {
            this.$router.push({
                name:'policyAdd'
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

