<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_menu_container" ref="topAdd">
        <router-link class="btn-link-large add-btn" to="add">
          <el-button type="primary" v-if="addShow" size="mini" icon="el-icon-plus">添加菜单</el-button>
        </router-link>
    </div>
    <div class="page_table_box" v-if="indexShow">
      <tree-table @selectVal="getSelectVal" :data="tableData" element-loading-text="数据加载中"
                  :evalFunc="func" :evalArgs="args" :expandAll="expandAll"    :max-height="tableHeight" border v-loading="loading">
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <div>
              <el-tag :type="scope.row.status === 1 ? '' : 'warning'">
                {{ scope.row.status | status }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="185">
          <template slot-scope="scope">
            <div>
              <el-button v-if="readShow" size="mini" type="primary" @click="clickEdit(scope.row)"><svg-icon style="margin-right:6px" :icon-class="'operate-edit'"></svg-icon>编辑</el-button>
              <el-button v-if="deleteShow" size="mini" type="danger" @click="confirmDelete(scope.row)"><svg-icon style="margin-right:6px;" :icon-class="'operate-delete'"></svg-icon>删除</el-button>
              <!-- <operates>
                <operate label="编辑" v-if="readShow" svgIcon icon="operate-edit" @change="clickEdit(scope.row)"></operate>
                <operate label="删除" v-if="deleteShow" svgIcon icon="operate-delete" @change="confirmDelete(scope.row)"></operate>
              </operates> -->
            </div>
          </template>
        </el-table-column>
      </tree-table>
      <div class="pos-rel p-t-20" ref="btmGroup" style="height:70px;" type="flex" align="middle">
        <el-row type="flex" align="middle" style="height:100%" justify="space-between">
          <btnGroup @change="refresh" :selectedData="multipleSelection" :type="'admin/menus'" :rule="rule"></btnGroup>
        </el-row>
      </div>
    </div>
    <el-dialog ref="dialog" top="0" width="400px" class="dialog-slider" lock-scroll :visible.sync="centerDialogVisible" :before-close="handleClose" title="菜单编辑">
      <menu-edit @close="dialogClose" v-if="centerDialogVisible"  :editId="editId"></menu-edit>
    </el-dialog>
    
  </div>
</template>

<script>
  import resize from '@/utils/page-mixins'
  import request from '@/utils/request'
  import {menuListRender,menuListDelete} from '@/api/menuList'
  import menuEdit from './edit.vue'
  import treeTable from './TreeTable'
  import treeToArray from './customEval'
  export default {
    name:'menuList',
    mixins: [resize],
    components: {
      menuEdit,
      treeTable
    },
    data() {
      return {
        func: treeToArray,
        args: [null, null, 'timeLine'],
        tableData: [],
        multipleSelection: [],
        loading:true,
        expandAll: false,
        centerDialogVisible:false,
        tableHeight:null,
        rule:null,
      }
    },
    methods: {
      init(){
        this.loading = true;
        request.get('admin/menus').then(res=>{
          this.tableData = res.data;
          this.loading = !this.loading;
        })
      },
      getSelectVal(val){
        this.multipleSelection = val;
      },
      dialogClose(){
        this.init();
        this.centerDialogVisible = false;
      },
      handleClose(){
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      },
      clickEdit(item){
        this.editId = item.id;
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      },
      selectItem(val) {
        this.multipleSelection = val
      },
      confirmDelete(item) {
        this.$confirm('确认删除该菜单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          menuListDelete(item.id).then(res=>{
            _g.toastMsg('success', '删除成功')
            setTimeout(() => {
              this.refresh();
            }, 1500)
          })
        }).catch(() => {
    
        })
      }
    },
    created() {
      this.init();
      this.rule = {
        deletesShow:this.deletesShow,
        enablesShow:this.enablesShow
      }
    },
    computed: {
      indexShow(){
        return _g.getHasRule('admin-menus-index')
      },
      addShow() {
        return _g.getHasRule('admin-menus-save')
      },
      readShow() {
        return _g.getHasRule('admin-menus-read')
      },
      deletesShow() {
        return _g.getHasRule('admin-menus-deletes')
      },
      enablesShow() {
        return _g.getHasRule('admin-menus-enables')
      },
      deleteShow() {
        return _g.getHasRule('admin-menus-delete')
      }
    },
  }
</script>
<style lang="scss" scoped>
  
</style>
