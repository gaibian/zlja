<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="filter-container" ref="topAdd">
            <el-input class="filter-item" v-model="searchForm.realname" placeholder="请输入姓名查询" size="small" style="width:200px"></el-input>
            <el-input class="filter-item" v-model="searchForm.id_code" placeholder="请输入身份证查询" size="small" style="width:200px"></el-input>
            <el-input class="filter-item" v-model="searchForm.address" placeholder="请输入住址查询" size="small" style="width:200px"></el-input>
            <el-input class="filter-item" v-model="searchForm.mobile" placeholder="请输入手机号码查询" size="small" style="width:200px"></el-input>
            <el-select class="filter-item" v-model="searchForm.customer_type" placeholder="请选择客户类型查询" style="width:200px">
                <el-option v-for="(item,index) in typeOption" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button class="filter-item" size="small" type="primary" @click="handleAdd">添加客户</el-button>
            <el-button class="filter-item" size="small" type="warning" @click="handleSearch" style="margin-left:0">查询</el-button>
        </div>
        <el-table border :data="tableData" v-loading="loading" :maxHeight="tableHeight" element-loading-text="数据加载中" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" fixed="left"></el-table-column>
            <el-table-column label="客户姓名" prop="realname"></el-table-column>
            <el-table-column label="身份证号" prop="id_code"></el-table-column>
            <el-table-column label="性别">
                <template slot-scope="scope">
                    <span>{{ scope.row.sex | sex }}</span>
                </template>
            </el-table-column>
            <el-table-column label="联系电话" prop="mobile"></el-table-column>
            <el-table-column label="联系邮箱" prop="emial"></el-table-column>
            <el-table-column label="联系地址" prop="address"></el-table-column>
            <el-table-column label="出生日期" prop="birthday"></el-table-column>
            <el-table-column label="客户类别" prop="customer_type">
                <template slot-scope="scope">
                    <span>
                        {{ dictionary(scope.row.customer_type) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
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
                <paging :type="'admin/customer'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
            </el-row>
        </div>
        <!--资料弹窗-->
        <!-- <el-dialog
        title="设置客户信息"
        :visible.sync="dialogVisible"
        width="800px"
        :before-close="handleClose">
        <operate @change="handleChange" :flag="editFlag" :id="editId" v-if="dialogVisible"></operate>
        </el-dialog> -->
    </div>
</template>

<script>
import operate from './operate.vue'
import { customerDelete,customerGetDetail } from '@/api/customer'
import resize from '@/utils/page-mixins'
export default {
    name:'customerList',
    components:{
        operate
    },
    mixins: [resize],
    data() {
        return {
            tableData:[],
            rule:{},
            tableHeight:null,
            multipleSelection: [],
            typeOption:[],
            searchForm:{
                realname:'',
                id_code:'',
                address:'',
                customer_type:'',
                mobile:'',
            },
            update:false,
            loading:false,
            dialogVisible:false,
            editFlag:false,
            editId:'',
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    created() {
        console.log(this.dictionaryData)
        bus.$on('customerList',text=>{
            this.update = !this.update;
        })
        this.typeOption = _g.handleSelect(this.dictionaryData.system,'CUSTOMER_TYPE');
    },
    methods:{
        dictionary(val) {
            let text = '';
            _(this.typeOption).forEach(item => {
                if(item.value == val){
                    text = item.label
                }
            })
            return text
        },
        handleAdd() {
            this.dialogVisible = true;
            this.$router.push({
                name:'customerAdd'
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
            console.log(val)
        },
        handleEdit(scope) {
            
            this.$router.push({
                name:'customerEdit',
                params:{
                    id:scope.row.id
                },query:{
                    pageClick:true
                }
            })
            
        },
        handleSearch() {
            this.update = !this.update
        },
        handleDelete(scope) {
         
            this.$confirm('确定删除该用户?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                customerDelete(scope.row.id).then(res => {
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

