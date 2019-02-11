<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="险种代码" prop="insurance_number"></el-table-column>
            <el-table-column label="受理日期" prop="accept_date"></el-table-column>
            <el-table-column label="生效日期" prop="start_date"></el-table-column>
            <el-table-column label="险种名称" prop="insurance_name"></el-table-column>
            <el-table-column label="被保人" prop="insured_name"></el-table-column>
            <el-table-column label="主附" prop="main_flag">
                <template slot-scope="scope">
                    <span>
                        {{ dictionary(scope.row.main_flag) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="年份/分档" prop="year"></el-table-column>
            <el-table-column label="保额" prop="amount"></el-table-column>
            <el-table-column label="险种保费" prop="premium"></el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" style="height:60px;margin-top:20px">
            <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="space-between">
            <div>
                <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
             </div>
            <div class="block pages">
                <paging :type="'admin/insurance/policyRisk'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </div>
            </el-row>
        </div>
        <el-dialog
        title="配置投保险种信息"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
        <operate @change="handleChange" :companyId="companyId" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>

<script>
import operate from './operate'
import { policyRiskDelete,policyRead } from '@/api/policy'
export default {
    components:{
        operate
    },
    data() {
        return {
            tableData:[],
            loading:false,
            update:false,
            searchForm:{
                policy_id:this.$route.params.id
            },
            zfOption:[],
            editFlag:false,
            editId:'',
            dialogVisible:false,
            companyId:'',
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    created() {
        console.log(this.companyId)
        this.zfOption = _g.handleSelect(this.dictionaryData.system,'RISK_MAIN_FLAG');
        policyRead(this.$route.params.id).then(res => {
                if(res !== 'error'){
                    console.log(res)
                    this.form = res.data;
                    this.form.company_name = Number(this.form.company_name);
                    this.form.insurance_name = Number(this.form.insurance_name);
                    this.companyId = res.data.company_id;
                    console.log(this.companyId)
                }
            })
    },
    methods:{
        dictionary(val) {
            let text = '';
            _(this.zfOption).forEach(item => {
                if(item.value == val){
                    text = item.label
                }
            })
            return text
        },
        handleSearch() {
            this.update = !this.update
        },
        handleEdit(scope) {
            this.editFlag = true;
            this.editId = scope.row.id;
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handlePaging(data) {
            this.tableData = data.data;
            this.loading = false;
        },
        handleDelete(scope) {
            this.$confirm('确定删除该保单?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                policyRiskDelete(scope.row.id).then(res => {
                    if(res !== 'error') {
                        console.log(res)
                        _g.toastMsg('success','删除成功')
                        this.update = !this.update;
                        this.loading = false;
                    }
                })
            })
        },
        handleAdd() {
            this.editFlag = false;
            this.editId = '';
            this.dialogVisible = true;
        },
        handleChange(flag) {
            if(flag){
                this.update = !this.update;
                this.loading = false;
            }
            this.dialogVisible = false;
        }
    }
}
</script>

<style>

</style>
