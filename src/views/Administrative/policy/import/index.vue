<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_menu_container" ref="topAdd">
      <div class="filter-container">
        <upload-excel class="filter-item" :url="'admin/insurance.policy/import'" @on-first-file="firstSelected" @on-selected-file="selected" :num="num" @reset="handleReset" :pageCount="pageCount"></upload-excel>
        <a class="filter-item" :href="`http://zlserver.softzhong.com/对账单导入模板.xlsx`">
          <el-button type="primary" size="small">下载模板</el-button>
        </a>
      </div>
      

    </div>
    <el-table
      :data="tableData"
      :max-height="tableHeight"
      v-loading="loading"
      element-loading-text="拼命加载中">
      <el-table-column label="保单号" prop="policy_number"></el-table-column>
      <el-table-column label="投保人" prop="applicant_name"></el-table-column>
      <el-table-column label="保险公司" prop="company_name"></el-table-column>
      <el-table-column label="险种" prop="insurance_name"></el-table-column>
      <el-table-column label="错误信息" prop="msg"></el-table-column>
    </el-table>
  </div>
</template>
<script>

  import uploadExcel from '@/components/uploadExcel/index';
  import resize from '@/utils/page-mixins'
  import request from '@/utils/request'
  export default {
      name:'policyImport',
    components:{
      uploadExcel
    },
    mixins:[resize],
    data(){
      return {
        tableData:[],
        loading:false,
        tableHeight:null,
        pageCount:1,
        num:0,
        number:null,
      }
    },
    created() {
      
    },
    methods:{
      selected(data){
        this.pageCount = data.data.page_count; //3
        this.number = data.data.number;
        this.tableData.push(data.data.res.data)
        this.upload();
      },
      firstSelected(res) {
        console.log(res)
        this.tableData = res.data.res.data;
        console.log(this.tableData)
        this.loading = false;
      },
      handleReset() {
        console.log('重置')
        this.num = 0;
        this.pageCount = 1;
      },
      upload() {
        this.num ++;  //1
        let getData = {
            number:this.number,
            page:this.num,
        }
        console.log(this.num)
        request.post('admin/insurance.policy/import',getData).then(res => {
          if(res !== 'error'){
            if(this.num >= this.pageCount){  //需要判断是否最后一次
              this.loading = false;
            }else{
              this.tableData.push(res.data.res.data)
              this.upload();
            }
          }
        })
      }
    }
  }
</script>
