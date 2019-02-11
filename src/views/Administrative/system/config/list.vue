<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_config_container" ref="topAdd">
      <router-link class="btn-link-large add-btn" :to="{name:'configAdd'}">
        <el-button v-if="addShow" size="small" icon="el-icon-plus" type="primary">添加参数</el-button>
      </router-link>
    </div>
    <div class="page_table_box" v-if="indexShow">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        element-loading-text="数据加载中"
        v-loading="loading"
        tooltip-effect="dark">
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="描述" prop="description"></el-table-column>
        <el-table-column label="时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.add_time | timestampToTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="185">
          <template slot-scope="scope">
            <div>
              <el-button v-if="readShow" size="mini" type="primary" @click="editClick(scope)"><svg-icon style="margin-right:6px" :icon-class="'operate-edit'"></svg-icon>编辑</el-button>
              <el-button v-if="parameterShow" size="mini" @click="handleSee(scope.row.id)"><svg-icon style="margin-right:6px" :icon-class="'operate-see'"></svg-icon>查看</el-button>
              <!-- <operates>
                <operate label="编辑" svgIcon icon="operate-edit" v-if="readShow" @change="editClick(scope)"></operate>
                <operate label="查看" v-if="parameterShow" @change="handleSee(scope.row.id)" svgIcon icon="operate-see"></operate>
              </operates> -->

            </div>
          </template>
        </el-table-column>
      </el-table>
      <div ref="btmGroup" style="height:70px;">
        <el-row class="pos_rel" style="height:70px;" type="flex" align="middle" justify="end">
          <div class="block pages">
            <paging @configPaging="handlePaging" @loadingChange="loading = true" updateType="config" :update="update" :type="'admin/systemParameter'"></paging>
          </div>
        </el-row>
      </div>
    </div>
    <el-dialog ref="dialog" top="0" width="400px" class="dialog-slider" :visible.sync="centerDialogVisible" :before-close="handleClose" title="参数编辑">
      <config-edit @close="dialogClose" v-if="centerDialogVisible"  :editId="editId"></config-edit>
    </el-dialog>
    
  </div>
</template>
<script>
  import {configListRender} from '@/api/configList'
  import configEdit from './edit.vue'
  export default {
    name:'configList',
    components:{
      configEdit,
    },
    data(){
      return {
        tableData:[],
        loading:true,
        centerDialogVisible:false,
        dataCount:0,
        update:false,
        loadingEditIndex:null,
      }
    },
    created(){
      console.log('系统参数的刷新')
      bus.$on('configList',text=>{
        this.update = !this.update;
      })
    },
    methods:{
      handleCurrentChange(){
      
      },
      handleSee(id) {

        this.$router.push({
            name:'parameterList',
            params:{
                id:id
            },query:{
                pageClick:_g.editRefresh('parameterList'),
            }
        })
        console.log(id)
        //this.$router.push({name:'parameterList',params:{id:id}})
        //this.addRefresh('parameterList')
      },
      handlePaging(data){
        this.loading = true;
        setTimeout(()=>{
          this.tableData = data.map(item=>{
            item.isEditLoading = false;
            return item;
          });
          this.loading = !this.loading;
        },300)
      },
      dialogClose(){
        this.tableData[this.loadingEditIndex].isEditLoading = false;
        this.update = !this.update;
        this.centerDialogVisible = false;
      },
      handleClose(){
        this.tableData[this.loadingEditIndex].isEditLoading = false;
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      },
      editClick(item){
        this.tableData[item.$index].isEditLoading = true;
        this.editId = item.row.id;
        this.loadingEditIndex = item.$index;
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      },
    },
    computed:{  //控制按钮的权限
      indexShow() {
        return _g.getHasRule('admin-systemconfigs-index')
      },
      parameterShow(){
        return _g.getHasRule('admin-systemconfigs-parameter')
      },
      addShow() {
        return _g.getHasRule('admin-systemconfigs-save')
      },
      readShow() {
        return _g.getHasRule('admin-systemconfigs-read')
      },
    },
    watch: {
      '$route' (to, from) {
        if(to.name === from.name){
          this.update = !this.update;
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
.top_add_config_container{
  margin-bottom:20px;
}
</style>
