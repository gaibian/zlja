<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_parameter_container">
      <router-link :to="{name:'parameterAdd',params:{id:id}}">
        <el-button v-if="addShow" type="primary" class="add_btn" icon="el-icon-plus">添加参数项</el-button>
      </router-link>
    </div>
    <div class="page_table_box" v-if="indexShow">
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="数据加载中"
        border
        @selection-change="selectItem"
        style="width:100%">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="value" label="参数值">
        </el-table-column>
        <el-table-column
          prop="description" label="描述">
        </el-table-column>
        <el-table-column
          label="时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.add_time | timestampToTime}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div>
              {{ scope.row.status | status }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import { parameterListRender } from '@/api/parameterList'
  export default {
    name:'parameterList',
    data(){
      return {
        tableData:[],
        loading:false,
        id:null,
      }
    },
    activated() {
        let boo = this.$route.query.pageClick;
        if(boo){
          this.init();
        }
    },
    created(){
      this.init();
      bus.$on('parameterList',text=>{
          this.init();
      })
    },
    methods:{
      init(){
        this.loading = true;
        this.id = this.$route.params.id;
        parameterListRender(this.id).then(res=>{
          this.tableData = res.data;
          this.loading = false;
        })
      },
      selectItem(val){
      
      }
    },
    computed: {  //控制按钮的权限
      indexShow() {
        return _g.getHasRule('admin-systemparameter-index')
      },
      addShow() {
        return _g.getHasRule('admin-systemparameter-save')
      },
    }
  }
</script>
<style lang="scss" scoped>
.top_add_parameter_container{
  margin-bottom:20px;
}
</style>
