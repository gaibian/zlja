<template>
  <div class="app_main_container" ref="mainContainer">
    <div class="top_add_menu_container" ref="topAdd">
      <router-link to="add">
        <el-button size="mini" icon="el-icon-plus" type="primary">添加数据表</el-button>
      </router-link>
      
      
      <!-- <el-button size="mini" type="success" @click="handleImportEcl"><svg-icon style="margin-right:6px" :icon-class="'import'"></svg-icon>导入Excel</el-button> -->
    </div>
    <div class="page_table_box">
      <el-table
        :data="tableData"
        :max-height="tableHeight"
        border
        element-loading-text="数据加载中"
        v-loading="loading"
        style="width:100%">
        <el-table-column label="表格名称" prop="name"></el-table-column>
        <el-table-column label="数据库表名" prop="table_name"></el-table-column>
        <el-table-column label="数据库表引擎" prop="table_engine"></el-table-column>
        <el-table-column label="表字段" width="500px" prop="table_fields"></el-table-column>
        <el-table-column label="添加时间">
          <template slot-scope="scope">
            <span>
              {{ scope.row.add_time | timestampToTime }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <span style="display:block;position:relative">
              <operates>
                <operate label="设计表" icon="CirculationSheetTable" svgIcon @change="handleDesign(scope)"></operate>
              </operates>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--设计表-->
    <el-dialog ref="dialog" width="60%" v-el-drag-dialog title="设计表" :before-close="handleClose" :visible.sync="designDialog">
      <div class="innerbox" ref="innerbox">
        <div class="dialog-table-box" style="margin-bottom:20px;">
          <!--有数据的表-->
          <el-table
            v-if="defaultFlag"
            :data="dialogDataTable">
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="请输入名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="字段名称">
              <template slot-scope="scope">
                <el-input :value="scope.row.field_name" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column label="字段类型">
              <template slot-scope="scope">
                <el-input :value="scope.row.field_type" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column label="允许空">
              <template slot-scope="scope">
                <el-input :value="scope.row.allow_null" disabled></el-input>
              </template>
              <!--<el-input v-model="dialogForm.Null"></el-input>-->
            </el-table-column>
            <el-table-column label="默认值">
              <template slot-scope="scope">
                <el-input :value="scope.row.field_default" disabled></el-input>
              </template>
              <!--<el-input v-model="dialogForm.Default"></el-input>-->
            </el-table-column>
            <el-table-column label="字段注释">
              <template slot-scope="scope">
                <el-input :value="scope.row.field_coment" disabled></el-input>
              </template>
              <!--<el-input v-model="dialogForm.Comment"></el-input>-->
            </el-table-column>
          </el-table>
          <!--没有数据的默认表-->
          <el-table
            v-else
            :data="dialogDataTable">
            <el-table-column label="名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="请输入名称"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="字段名称">
              <template slot-scope="scope">
                <el-input :value="scope.row.Field" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column label="字段类型">
              <template slot-scope="scope">
                <el-input :value="scope.row.Type" disabled></el-input>
              </template>
            </el-table-column>
            <el-table-column label="允许空">
              <template slot-scope="scope">
                <el-input :value="scope.row.Null" disabled></el-input>
              </template>
              <!--<el-input v-model="dialogForm.Null"></el-input>-->
            </el-table-column>
            <el-table-column label="默认值">
              <template slot-scope="scope">
                <el-input :value="scope.row.Default" disabled></el-input>
              </template>
              <!--<el-input v-model="dialogForm.Default"></el-input>-->
            </el-table-column>
            <el-table-column label="字段注释">
              <template slot-scope="scope">
                <el-input :value="scope.row.Comment" disabled></el-input>
              </template>
              <!--<el-input v-model="dialogForm.Comment"></el-input>-->
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div>
        <el-button type="primary" v-if="loadTableFlag" icon="el-icon-download" @click="tableNew" size="mini">加载表信息</el-button>
        <el-button type="primary" icon="el-icon-check" @click="tableSubmit" size="mini">保存</el-button>
      </div>
    </el-dialog>

    

  </div>
</template>
<script>
  import elDragDialog from "@/directive/el-dragDialog";
  import resize from '@/utils/page-mixins'
  import { getViewTables,getTableFields,getViewFields,setViewFields,importEcl,saveCase,saveBtn } from '@/api/dataTable'
  import uploadExcel from "@/components/uploadExcel"
  export default {
    name:'dataTableList',
    directives: { elDragDialog },
    mixins:[resize],
    components: {
      uploadExcel
    },
    data() {
      return {
        checkList:[],
        value1:'',
        previewCaseList:null,
        designLoading:true,
        tableHeight:null,
        previewForm:{
          caseId:'',
          file_name:'',
        },
        res:null,
        previewList:[],
        excelForm:{
          caseTitle:'',
        },
      //   options: {
      //   group: 'mission',
      //   onEnd() {
          
      //   }
      // },
      // list1: [
      //   { name: 'Mission', id: 1 },
      //   { name: 'Mission', id: 2 },
      //   { name: 'Mission', id: 3 },
      //   { name: 'Mission', id: 4 }
      // ],
      // list2: [
      //   { name: 'Mission', id: 5 },
      //   { name: 'Mission', id: 6 },
      //   { name: 'Mission', id: 7 }
      // ],
      // list3: [
      //   { name: 'Mission', id: 8 },
      //   { name: 'Mission', id: 9 },
      //   { name: 'Mission', id: 10 }
      // ],
        form2:{
          text:'',
          numText:'',
          letterNumberText:'',
          realNameText:'',
          id:'',
          plateNumberText:'',
          webSiteText:'',
          mobileText:'',
        },
        tableData:[],
        maxPage:'',
        loading:true,
        designDialog:false,
        excelDialog:false,
        proviewDialog:false,
        previewFlag:false,
        tableName:'',
        fullscreenLoading: false,
        dialogDataTable:[],
        defaultFlag:false,
        loadTableFlag:false,
        sureFlag:false,
        excelData: {
          view_name:'user_organization',
          line:1
        },
        dialogForm:{
          field_name:'',
          name:'',
          Type:'',
          Null:'',
          Field:'',
          Default:'',
          Comment:''
        },
        excelOptions:[],
        fieldsOptions:null,
        caseOptions:[],
        rules:{
          caseTitle: [
            { required: true,message:"请输入方案名称",trigger:'blur' }
          ]
        },
      }
    },
    created(){
  
      this.init();
      bus.$on('dataTableList',text=>{
        this.init();
      })
    },
    mounted() {
      console.log(this.tableHeight)
    },
    methods:{
      handleCheckbox(value,item){
        item.flag = value;
        if(!value){
            item.index = '';
        }
      },
      init(){
        this.loading = true;
        getViewTables().then(res=>{
          if(res !== 'error'){
            this.loading = !this.loading;
            this.tableData = res.data.list;
          }
        })
      },
      tableSubmit(){
        let data1 = {
          table_name:this.tableName,
          data:{
          }
        };
        let flag = false;
        _(this.dialogDataTable).forEach((value,index)=>{
          if(value.name && value.name !== ''){
            if(this.defaultFlag){  //有数据
              data1.data[`${index}`] = {
                name : value.name,
                field_name : value.field_name,
                field_type : value.field_type,
                allow_null : value.allow_null,
                field_default : value.field_default,
                field_coment : value.field_coment,
                id: value.id
              }
            }else{  //没有数据
              data1.data[`${index}`] = {
                name : value.name,
                field_name : value.Field,
                field_type : value.Type,
                allow_null : value.Null,
                field_default : value.Default,
                field_coment : value.Comment,
              }
            }
            flag = true;
          }else{
            flag = false;
            _g.toastMsg('error','请输入名称再保存')
          }
        })
        
        if(flag){
          setViewFields(data1).then(res=>{
            if(res !== 'error'){
              _g.toastMsg('success','保存成功')
              this.designDialog = false;
              this.$refs.dialog.close();
              this.init();
            }
          })
        }
        
      },
      tableNew(){
        getTableFields(this.tableName).then(res=>{
          if(res !== 'error'){
            this.dialogDataTable = res.data;
            _(res.data).forEach(item=>{
            
            })
            
          }
        })
      },
      handleDesign(item){
        console.log(item)
         this.tableName = item.row.table_name;
        let id = item.row.id;
        this.designDialog = true;
        this.$refs.dialog.open();
        
  
        getViewFields(this.tableName).then(res=>{
          if(res !== 'error'){
            this.dialogDataTable = res.data.list;
            /*如果有数据*/
            if(res.data.list && res.data.list.length >0){
              this.defaultFlag = true;
          
              this.loadTableFlag = false;
            }else{  //没有数据
              this.defaultFlag = false;
              this.loadTableFlag = true;
            }
          }
        })
        
      },
      handleExcelClose(){
        this.excelDialog = false;
        this.$refs.excelDialog.close();
      },
      handlePreviewClose(){
        this.proviewDialog = false;
        this.$refs.previewDialog.close();
      },
      handleClose(){
        this.designDialog = false;
        this.$refs.dialog.close();
      }
    }
  }
</script>
<style lang="scss" scoped>

  .titleBox{
    width:100%;
    font-size:0;
    border-bottom:1px #EBEEF5 solid;
    .spanTitle{
      display:inline-block;
      width:45%;
      height:50px;
      line-height:50px;
      text-align: center;
      color:#909399;
      font-weight: bold;
      font-size:14px;
    }
  }
  .previewTitle{
    width:100%;
    height:40px;
    line-height:40px;
    //background: rgba(235,238,245,0.8);
    border:#EBEEF5 1px solid;
    padding:0 12px;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    box-sizing:border-box;
  }
  .previewCaseList{
    width:100%;
    overflow:hidden;
    height:50px;
    //background: rgba(235,238,245,0.8);
    border-bottom:1px #EBEEF5 solid;
    line-height:50px;
    .previewName{
      float:left;
      width:45%;
      padding:0 12px;
      text-align: center;
      -webkit-box-sizing:border-box;
      -moz-box-sizing:border-box;
      box-sizing:border-box;
    }
    &:last-child{
      border-bottom:none;
    }
  }
  .clickStyle{
    font-size:0;
    cursor: pointer;
  }
  .innerbox{
    position: relative;
    width:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    height:100%;
    max-height:360px;
    padding-right:8px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  /*滚动条样式*/
  .innerbox::-webkit-scrollbar {/*滚动条整体样式*/
    width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .innerbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius:6px;
    /*background:#cccaca;*/
    background-color:hsla(220,4%,58%,.3);
    -webkit-transition: background-color 0.3s;
    -moz-transition: background-color 0.3s;
    -ms-transition: background-color 0.3s;
    -o-transition: background-color 0.3s;
    transition: background-color 0.3s;
  }
  .innerbox::-webkit-scrollbar-thumb:hover{
    /*background:#bbbaba;*/
  }
  .innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
    /*background: #f1f4f5;*/
    background:#fff;
  }
</style>
