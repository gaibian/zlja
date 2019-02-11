<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_rule_container" ref="topAdd">
      <router-link class="btn-link-large add-btn" to="add">
        <el-button icon="el-icon-plus" v-if="addShow" size="small" type="primary">添加节点</el-button>
      </router-link>
    </div>
    <div class="page_table_box" v-if="listShow">
      <tree-table @selectVal="getSelectVal" :data="tableData" element-loading-text="数据加载中"
      :evalFunc="func" :evalArgs="args" :expandAll="expandAll"    :max-height="tableHeight" border v-loading="loading">
        <el-table-column
          prop="name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <div>
              <el-tag :type="scope.row.status === 1 ? '' : 'warning'">
                {{ scope.row.status | status}}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="185">
          <template slot-scope="scope">
            <div>
              <el-button v-if="readShow" size="mini" type="primary" @click="editClick(scope)"><svg-icon style="margin-right:6px" :icon-class="'operate-edit'"></svg-icon>编辑</el-button>
              <el-button v-if="deleteShow" size="mini" type="danger" @click="confirmDelete(scope)"><svg-icon style="margin-right:6px;" :icon-class="'operate-delete'"></svg-icon>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </tree-table>
      <div class="table_btn_box" ref="btmGroup" style="height:70px;" >
        <el-row class="pos_rel" style="height:70px;" type="flex" align="middle" justify="space-between">
          <btnGroup @change="refresh" :selectedData="multipleSelection" :rule="rule" :type="'admin/rules'"></btnGroup>
        </el-row>
      </div>
    </div>
    <el-dialog ref="dialog" top="0" width="400px" class="dialog-slider" :visible.sync="centerDialogVisible" :before-close="handleClose" title="权限编辑">
      <rule-edit @close="dialogClose" v-if="centerDialogVisible" :editId="editId"></rule-edit>
    </el-dialog>
    
  </div>
</template>
<script>
  import resize from '@/utils/page-mixins'
  import {ruleListDelete,ruleListRender} from '@/api/ruleList'
  import ruleEdit from './edit.vue'
  import treeTable from './TreeTable'
  import treeToArray from './customEval'
  export default {
    name:'ruleList',
    mixins:[resize],
    components: {
      ruleEdit,
      treeTable
    },
    data() {
      return {
        func: treeToArray,
        args: [null, null, 'timeLine'],
        tableData: [],
        multipleSelection: [],
        expandAll: false,
        centerDialogVisible:false,
        loading:true,
        tableHeight:null,
        loadingEditIndex:null,
        rule:null,
      }
    },
    methods: {
      init(){
        this.loading = true;
        ruleListRender().then(res=>{
          this.tableData = res.data.map(item=>{
            //item.isEditLoading = false;
            //item.isDeleteLoading = false;
            return item;
          });
          this.loading = !this.loading;
        })
      },
      getSelectVal(val){
        this.multipleSelection = val;
      },
      dialogClose(){
        //this.tableData[this.loadingEditIndex].isEditLoading = false;
        this.refresh();
        this.centerDialogVisible = false;
      },
      handleClose(){
        //this.tableData[this.loadingEditIndex].isEditLoading = false;
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      },
      editClick(item){
        //this.tableData[item.$index].isEditLoading = true;
        this.loadingEditIndex = item.$index;
        this.editId = item.row.id;
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      },
      selectItem(val) {
        this.multipleSelection = val
      },
      confirmDelete(item) {
        //this.tableData[item.$index].isDeleteLoading = true;
        this.$confirm('确认删除该权限?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          ruleListDelete(item.row.id).then(res=>{
            _g.toastMsg('success', '删除成功')
            this.loading = !this.loading
            setTimeout(() => {
              this.refresh();
            }, 1500)
          })
        }).catch(() => {
          //this.tableData[item.$index].isDeleteLoading = false;
        })
      }
    },
    created() {
      console.log('权限的刷新了')
      this.init();
      this.rule = {
        deletesShow:this.deletesShow,
        enablesShow:this.enablesShow
      }
    },
    computed: {
      addShow() {
        return _g.getHasRule('admin-rules-save')
      },
      readShow(){
        return _g.getHasRule('admin-rules-read')
      },
      deletesShow(){
        return _g.getHasRule('admin-rules-deletes')
      },
      enablesShow(){
        return _g.getHasRule('admin-rules-enables')
      },
      deleteShow() {
        return _g.getHasRule('admin-rules-delete')
      },
      listShow(){
        return _g.getHasRule('admin-rules-index')
      }
    },
    watch:{
      '$route'(to,from){
        if(to.name === from.name){
          this.init();
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .top_add_rule_container{
    margin-bottom:20px;
  }
  .pos_rel{
    position: relative;
  }
</style>
