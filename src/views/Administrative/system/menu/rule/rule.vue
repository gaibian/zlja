<template>
 <dialog-scroll height="500px">
   <div style="padding-bottom:20px;">
     <tree-table @selectVal="getSelectVal" :data="tableData"
                 :evalFunc="func" :evalArgs="args" element-loading-text="数据加载中" :expandAll="expandAll"    :max-height="tableHeight" border v-loading="loading">
       <el-table-column
         prop="title"
         label="规则名称">
       </el-table-column>
       <el-table-column
         prop="name"
         label="规则标识"
         width="180">
       </el-table-column>
       <el-table-column
         label="操作"
         width="100">
         <template slot-scope="scope">
           <div>
             <el-button size="small" @click="selectRule(scope.row)">选择</el-button>
           </div>
         </template>
       </el-table-column>
     </tree-table>
   </div>
 </dialog-scroll>
</template>
<script>
  import { menuRuleRender } from '@/api/menuList'
  import treeTable from './TreeTable'
  import treeToArray from './customEval'
  export default {
    props:[
      'flag'
    ],
    components:{
      treeTable
    },
    data() {
      return {
        func: treeToArray,
        args: [null, null, 'timeLine'],
        keyword: '',
        tableData: [],
        newFlag:false,
        expandAll: false,
        loading:true,
        tableHeight:null,
        multipleSelection:[],
      }
    },
    methods: {
      getSelectVal(val){
        this.multipleSelection = val;
      },
      selectRule(item) {
        let data = {
          rule_name : item.title,
          rule_id : item.id,
        };
        this.$emit("closeRule",data);
      },
      getRules() {
        menuRuleRender().then(res=>{
          this.tableDataShow = _(res.data).forEach((ret) => {
            ret.showInput = false
          })
          this.tableData = this.tableDataShow
          this.loading = !this.loading;
        })
      }
    },
    created() {
      let data = store.state.rules
      if (data && data.length) {
        this.tableDataShow = _(data).forEach((res) => {
          res.showInput = false
        })
        this.tableData = this.tableDataShow
      } else {
        console.log('aaa');
        this.getRules()
      }
      console.log(data);
    },
  }
</script>
<style lang="scss" scoped>
  .search-btn {
    position: absolute;
    top: 0px;
    right: 0px;
  }
</style>
