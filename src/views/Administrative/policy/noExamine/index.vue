<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container">
            <el-input class="filter-item" size="small" v-model="searchForm.policy_number" style="width:200px" placeholder="请输入保单号查询"></el-input>
            <el-input class="filter-item" size="small" v-model="searchForm.applicant_name" style="width:200px" placeholder="请输入投保人查询"></el-input>
            <el-select class="filter-item" size="small" v-model="searchForm.company_id" placeholder="请选择保险公司查询" style="width:200px;">
                <el-option v-for="(item,index) in companyOption" :key="index" :label="item.company_name" :value="item.id"></el-option>
            </el-select>
            <el-select class="filter-item" size="small" v-model="searchForm.agent_id" placeholder="请选择代理人查询" style="width:200px;">
                <el-option v-for="(item,index) in userOption" :key="index" :label="item.agent_name" :value="item.id"></el-option>
            </el-select>
            <el-button class="filter-item" size="small" type="warning" @click="handleSearch" style="margin-left:0">查询</el-button>
        </div>
        <el-table :data="tableData" :maxHeight="tableHeight" border v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="投保单号" prop="apply_policy_number"></el-table-column>
            <el-table-column label="保单号" prop="policy_number"></el-table-column>
            <el-table-column label="保险公司名称" prop="company_name"></el-table-column>
            <el-table-column label="险种名称" prop="insurance_name"></el-table-column>
            <el-table-column label="险种编码" prop="insurance_number"></el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleExamine(scope)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" style="height:60px;">
            <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="end">
            <div class="block pages">
                <paging :type="'admin/insurance.policy/getCheckList'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import { companyIndex } from '@/api/company'
import { agentIndex } from '@/api/agent'
export default {
    name:'policyNoExamine',
    data() {
        return {
            tableHeight:null,
            loading:false,
            searchForm:{
                policy_number:'',
                applicant_name:'',
                company_id:'',
                agent_id:'',
            },
            companyOption:[],
            userOption:[],
            tableData:[],
            update:false,
        }
    },
    created() {
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
    },
    methods:{
        handleSearch() {
            this.update = !this.update
        },
        handleExamine(scope) {
            this.$router.push({
                name:'policyExamineExamine',
                params:{
                    id:scope.row.id
                }
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

