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
            <el-button class="filter-item" size="small" type="warning" @click="handleSearch" style="margin-left:0">查询</el-button>
            <el-button class="filter-item" size="small" @click="handleInit" style="margin-left:0">重置</el-button>
        </div>
        <el-table :data="tableData" :maxHeight="tableHeight" border v-loading="loading" element-loading-text="数据加载中" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="投保单号" prop="apply_policy_number"></el-table-column>
            <el-table-column label="保单号" prop="policy_number"></el-table-column>
            <el-table-column label="保险公司名称" prop="company_name"></el-table-column>
            <el-table-column label="险种名称" prop="insurance_name"></el-table-column>
            <el-table-column label="险种编码" prop="insurance_number"></el-table-column>
            <el-table-column label="首佣比例" prop="first_commision_rate"></el-table-column>
            <el-table-column label="续佣比例" prop="renewal_commision_rate"></el-table-column>
            <el-table-column label="奖金" prop="award"></el-table-column>
        </el-table>
        <div ref="btmGroup" style="height:60px;">
            <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="space-between">
                <div>
                    <el-button size="small" @click="handleJs">批量结算</el-button>
                </div>
                <div class="block pages">
                    <paging v-if="searchFlag" :type="'admin/insurance.policy/getFinancialCheckList'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import { policyBalanceCheck } from '@/api/policy'
import { companyIndex } from '@/api/company'
import { agentIndex } from '@/api/agent'
import { agencyIndex } from '@/api/agency'
export default {
    name:'financeExamine',
    data() {
        return {
            tableHeight:null,
            loading:false,
            searchForm:{
                 policy_number:'',
                applicant_name:'',
                company_id:'',
                accept_date_start:'',
                accept_date_end:'',
                agent_id:'',
                agency_id:'',
            },
            searchFlag:false,
            companyOption:[],
            userOption:[],
            agencyOption:[],
            tableData:[],
            update:false,
            ids:[],
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

        agencyIndex().then(res => {
            if(res !== 'error') {
                this.agencyOption = res.data;
            }
        })
    },
    methods:{
        handleInit() {
            this.searchForm = {
                policy_number:'',
                applicant_name:'',
                company_id:'',
                accept_date_start:'',
                accept_date_end:'',
                agent_id:'',
                agency_id:'',
            }
        },
        handleSelectionChange(val) {
            console.log(val)
            this.ids = [];
            for(let item of val){
                this.ids.push(item.id);
            }
        },
        handleJs() {
            let data = {
                ids:this.ids
            }
            policyBalanceCheck(data).then(res => {
                if(res !== 'error'){
                    console.log(res)
                    _g.toastMsg('success','审核成功');
                    this.update = !this.update;
                }
            })
        },
        handleSearch() {
            
            if(this.searchFlag){
                this.update = !this.update
            }else{
                this.searchFlag = true;
            }
            
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

