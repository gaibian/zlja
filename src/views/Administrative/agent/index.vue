<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container" ref="addTop">
            <el-select v-model="searchForm.agency_id" class="filter-item" size="small" placeholder="请选择机构查询" style="width:200px">
                <el-option v-for="(item,index) in agencyOption" :key="index" :label="item.agency_name" :value="item.id"></el-option>
            </el-select>
            <el-input class="filter-item" size="small" v-model="searchForm.realname" placeholder="请输入员工姓名查询" style="width:200px"></el-input>
            <el-input class="filter-item" size="small" v-model="searchForm.agent_no" placeholder="请输入员工编号查询" style="width:200px"></el-input>
            <el-input class="filter-item" size="small" v-model="searchForm.id_code" placeholder="请输入身份证号查询" style="width:200px"></el-input>
            <el-button class="filter-item" size="small" type="primary" @click="handleAdd">添加代理人</el-button>
            <el-button class="filter-item" size="small" type="warning" @click="handleSearch" style="margin-left:0">查询</el-button>
        </div>
        <el-table border :data="tableData" v-loading="loading" :maxHeight="tableHeight" element-loading-text="数据加载中" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" fixed="left"></el-table-column>
            <el-table-column label="合同号码" prop="contract_code"></el-table-column>
            <el-table-column label="手机号码" prop="info.mobile"></el-table-column>
            <el-table-column label="入司时间" prop="join_time"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span>{{ scope.row.status | status }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <span>
                        <el-button size="mini" type="primary" @click="handleEdit(scope)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope)">删除</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <div ref="btmGroup" style="height:60px;">
            <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="space-between">
                <btn-group @change="refresh" :selectedData="multipleSelection" :type="'admin/customer.customer'" :rule="rule"></btn-group>
                <paging :type="'admin/agent'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </el-row>
        </div>

    </div>
</template>

<script>
import { agentDelete,agentRead } from '@/api/agent'
import { agencyIndex } from '@/api/agency'
export default {
    name:'agentList',

    data() {
        return {
            tableData:[],
            rule:{},
            tableHeight:null,
            multipleSelection: [],
            searchForm:{
                agency_id:'',
                depart_id:'',
                agent_no:'',
                realname:'',
                id_code:'',
            },
            agencyOption:[],
            update:false,
            loading:false,
            dialogVisible:false,
            editFlag:false,
            editId:'',
        }
    },
    created() {
        bus.$on('agentList',text=>{
            this.update = !this.update;
        })
        agencyIndex().then(res => {
            if(res !== 'error'){
                console.log(res)
                this.agencyOption = res.data;
            }
        })

    },
    methods:{
        handleSearch() {
            this.update = !this.update
        },
        handleAdd() {
            this.dialogVisible = true;
            this.$router.push({
                name:'agentAdd'
            })
        },
        handlePaging(data) {
            console.log(data)
            this.tableData = data.data;
            this.loading = false;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            console.log(val)
        },
        handleEdit(scope) {
            console.log(scope)
            this.$router.push({
                name:'agentEdit',
                params:{
                    id:scope.row.id
                },query:{
                    pageClick:true
                }
            })
            
        },
        handleDelete(scope) {
         
            this.$confirm('确定删除该代理人?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                agentDelete(scope.row.id).then(res => {
                    if(res !== 'error'){
                        _g.toastMsg('success','删除成功')
                        setTimeout(() => {
                            this.update = !this.update
                        })
                    }
                })
        
            })
            
        },
        handlePaging(data) {
            console.log(data)
            this.tableData = data.data;
            this.loading = false;
        },
        handleChange(flag) {

        },
        handleClose() {
            this.dialogVisible = false;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

