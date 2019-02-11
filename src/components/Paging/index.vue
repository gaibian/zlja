<template>
      <el-pagination
        v-show="pagflag"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataCount">
      </el-pagination>
</template>
<script>
  /*
  * api
  * */
  import request from '@/utils/request'
  export default {
    name:'paging',
    props: {
      type: {
        type: String,
        required: true,
      },
      updateType: {
        type: String,
        required: true,
      },
      update:{
        default:false
      },
      pagingdata:{
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentPage:1,  //当前页数
        limit:50,
        dataCount:null,
        pagflag:false,
      }
    },
    created(){
      this.init();
    },
    mounted(){

    },
    methods:{
      init(){
        this.getData();
      },
      getData(){
        
        this.$emit('loadingChange',true)

        if(this.pagingdata.queryCheck === 1){  //  1代表查询  0代表不是查询
          this.currentPage = 1
        }
        let newData = {
          params:{
            page: this.currentPage,
            limit: this.limit
          }
        };
        if(this.pagingdata && this.pagingdata.length === 0){
          
        }else{
          newData.params = Object.assign(newData.params,this.pagingdata);
        }
        request.get(`${this.type}`,newData).then(res=>{
          if(res !== 'error'){
            this.dataCount = res.data.total;
            
            this.dataCount == 0 ? this.pagflag = false : this.pagflag = true;
            console.log(res)
            this.$emit(`${this.updateType}Paging`,res.data);
          }
        })
      },
      handleSizeChange(val){  //选择每页显示的条目数
        if(this.pagingdata.queryCheck == 1){
          this.pagingdata.queryCheck = 0;
        }
        this.limit = val;
        this.currentPage = 1;
        this.getData();
      },
      handleCurrentChange(page){  //点击显示第几页
        this.currentPage = page;
        if(this.pagingdata.queryCheck == 1){
          this.pagingdata.queryCheck = 0;
        }
        this.getData();
      },
    },
    watch: {
      update(){
        this.init();
      }
    }
  }
</script>
<style>

</style>
