<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="交费型别" prop="type">
                <template slot-scope="scope">
                    <span>{{dictionary(jfOption,scope.row.type)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="年度缴次" prop="year_times"></el-table-column>
            <el-table-column label="交费方式" prop="pay_method">
                <template slot-scope="scope">
                    <span>{{ dictionary(methodOption,scope.row.pay_method) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="交费类别" prop="pay_type">
                <template slot-scope="scope">
                    <span>{{ dictionary(typeOption,scope.row.pay_type) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="实交保费" prop="real_premium"></el-table-column>
            <el-table-column label="交费日期" prop="pay_date"></el-table-column>
            <el-table-column label="计绩年月" prop="deal_date"></el-table-column>
            <el-table-column label="是否核佣" prop="is_check_commission"></el-table-column>
            <el-table-column label="核发状态" prop="check_status"></el-table-column>
            <el-table-column label="发生月" prop="happen_date"></el-table-column>
            <el-table-column label="账目状态" prop="account_status"></el-table-column>
            <el-table-column label="平衡月" prop="balance_date"></el-table-column>
            <el-table-column label="操作" width="150">
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
                <paging :type="'admin/insurance/policyPay'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </div>
            </el-row>
        </div>
        <el-dialog
        title="配置保单交费记录"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>

<script>
import operate from './operate'
import { policyPayDelete } from '@/api/policy'
export default {
    components:{
        operate
    },
    data() {
        return {
            tableData:[],
            loading:false,
            editFlag:false,
            searchForm:{
                policy_id:this.$route.params.id
            },
            update:false,
            editId:'',
            jfOption:[],
            methodOption:[],
            typeOption:[],
            dialogVisible:false,
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    created() {
        this.jfOption = _g.handleSelect(this.dictionaryData.system,'POLICY_PAY_TYPE');
        this.methodOption = _g.handleSelect(this.dictionaryData.system,'PAYMENTMETHOD');
        this.typeOption = _g.handleSelect(this.dictionaryData.system,'PAY_TYPE');
    },
    methods:{
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
                policyPayDelete(scope.row.id).then(res => {
                    if(res !== 'error'){
                        _g.toastMsg('success','删除成功')
                        this.update = !this.update
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
