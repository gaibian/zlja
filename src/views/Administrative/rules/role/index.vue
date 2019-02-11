<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container" ref="topAdd">
            <el-button type="primary" size="small" @click="handleAdd">添加角色</el-button>
        </div>
        <el-table :data="tableData" border v-loading="loading" :maxHeight="tableHeight" element-loading-text="数据加载中">
            <el-table-column label="角色名称" prop="role_name"></el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
        title="配置角色"
        v-el-drag-dialog
        :visible.sync="dialogVisible"
        width="900px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog>
    </div>
</template>

<script>
import operate from './add'
import elDragDialog from "@/directive/el-dragDialog";
import resize from '@/utils/page-mixins'
import {roleIndex,roleDelete} from '@/api/role'
export default {
    name:'rulesRole',
    directives: { elDragDialog },
    components:{
        operate
    },
    mixins: [resize],
    data() {
        return {
            tableData:[],
            loading:false,
            tableHeight:null,
            dialogVisible:false,
            editFlag:false,
            editId:'',
        }
    },
    created() {
        this.init()
    },
    methods:{
        init() {
            this.loading = true;
            roleIndex().then(res => {
                if(res !== 'error'){
                    this.tableData = res.data.data;
                    this.loading = false;
                }
            })
        },
        handleAdd() {
            this.editFlag = false;
            this.editId = '';
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        handleEdit(scope) {
            this.editFlag = true;
            this.editId = scope.row.role_id;
            this.dialogVisible = true;
        },
        handleDelete(scope) {
            console.log(scope)
            this.$confirm('确定删除该用户?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                roleDelete(scope.row.role_id).then(res => {
                    if(res !== 'error') {
                        _g.toastMsg('success','删除成功')
                        this.init();
                    }
                })
            })
        },  
        handleChange(flag) {
            if(flag){
                this.init();
            }
            this.dialogVisible = false;
        }
    }
}
</script>

<style>

</style>
