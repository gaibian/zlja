<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container" ref="topAdd">
            <el-button type="primary" size="small" @click="handleAdd">添加菜单</el-button>
        </div>
        <tree-table :data="tableData" border v-loading="loading" :maxHeight="tableHeight" element-loading-text="数据加载中" :evalFunc="func" :evalArgs="args" :expandAll="expandAll">
            <!-- <el-table-column label="菜单名称" prop="name"></el-table-column> -->
            <el-table-column label="模块" prop="app"></el-table-column>
            <el-table-column label="控制器" prop="controller"></el-table-column>
            <el-table-column label="方法" prop="action"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </tree-table>
        <el-dialog
        title="配置菜单"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>

<script>
import operate from './operate'
import resize from '@/utils/page-mixins'
  import treeTable from './TreeTable'
  import treeToArray from './customEval'
import { rulesMenuIndex,rulesMenuDelete } from '@/api/rulesAdmin'
export default {
    name:'rulesMenus',
    components:{
        operate,
        treeTable
    },
    mixins: [resize],
    data() {
        return {
            func: treeToArray,
            args: [null, null, 'timeLine'],
            expandAll: true,
            dialogVisible:false,
            tableData:[],
            editFlag:false,
            loading:false,
            editId:'',
            tableHeight:null,
        }
    },
    created() {
        console.log('caidan')
        this.init();
    },
    activated() {
        console.log('caidan1')
    },
    destroyed() {

    },
    methods:{
        init() {
            this.loading = true;
            rulesMenuIndex().then(res => {
                if(res !== 'error') {
                    this.tableData = res.data.data;
                    this.loading = false;
                }
            })
        },
        handleDelete(scope) {
            this.$confirm('确定删除该用户?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                rulesMenuDelete(scope.row.id).then(res => {
                    if(res !== 'error'){
                        _g.toastMsg('success','删除成功')
                        this.init()
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
                this.init()
            }
            this.dialogVisible = false;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleEdit(scope) {
            this.editFlag = true;
            this.editId = scope.row.id;
            this.dialogVisible = true;
        }
    }
}
</script>

<style>

</style>
