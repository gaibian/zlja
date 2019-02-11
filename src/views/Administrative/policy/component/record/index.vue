<template>
    <div>
        <el-table :data="tableData" border v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="类别" prop="type">
                <template slot-scope="scope">
                    <span>{{ dictionary1(scope.row.type) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="记录属性" prop="record_attr">
                <template slot-scope="scope">
                    <span>{{ dictionary(scope.row.record_attr) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="属性内容" prop="content"></el-table-column>
            <el-table-column label="有效期起" prop="start_date"></el-table-column>
            <el-table-column label="有效期止" prop="end_date"></el-table-column>
            <!-- <el-table-column label="附件" prop=""></el-table-column> -->
            <el-table-column label="附件格式" prop="format"></el-table-column>
            <el-table-column label="大小" prop="size"></el-table-column>
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
                    <paging :type="'admin/insurance/policyRecord'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
                </div>
            </el-row>
        </div>
        <el-dialog
        title="配置保单记录属性"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>

<script>
import operate from './operate'
import { policyRecordDelete } from '@/api/policy'
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
            jlOption:[],
            typeOption:[],
            editId:'',
            dialogVisible:false,
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    created() {
        this.jlOption = _g.handleSelect(this.dictionaryData.system,'RECORD_ATTR');
        this.typeOption = _g.handleSelect(this.dictionaryData.system,'POLICY_TYPE');
    },
    methods:{
        dictionary1(val) {
            let text = '';
            _(this.jlOption).forEach(item => {
                if(item.value == val){
                    text = item.label
                }
            })
            return text
        },
        dictionary(val) {
            let text = '';
            _(this.typeOption).forEach(item => {
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
                policyRecordDelete(scope.row.id).then(res => {
                    if(res !== 'error') {
                        _g.toastMsg('success','删除成功')
                        this.update = !this.update;
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
