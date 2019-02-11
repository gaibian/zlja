<template>
    <div>
        <upload-excel :url="'report/importUpload'" :Edata='viewName' @on-selected-file="selected"></upload-excel>
        <el-dialog ref="excelDialog" width="460px" v-el-drag-dialog title="新建方案" :before-close="handleExcelClose" :visible.sync="excelDialog">

          <el-form ref="excelForm" :model="excelForm" :rules="rules" label-width="80px" label-position="top">
            <div>
              <div class="innerbox">
                  <el-row>
          <el-form-item label="方案名称" prop="caseTitle">
            <el-input v-model="excelForm.caseTitle" placeholder="请输入方案名称"></el-input>
          </el-form-item>
        </el-row>
        <el-row :gutter="30" style="margin:0;">
          <el-col :span="24" style="display:block;border:1px #EBEEF5 solid;">
            <!--数据库字段表-->
              <el-row class="titleBox" type="flex" justify="space-between">
                <el-col class="spanTitle">数据列</el-col>
                <el-col class="spanTitle">EXCEL列</el-col>
              </el-row>
              <el-checkbox-group v-model="checkList">
                <div class="previewCaseList" v-for="(item,index) in fieldsOptions" :key="index">
                  <div class="previewName">
                    <el-checkbox :label="index" @change="(value) => handleCheckbox(value,item)">{{item.name}}</el-checkbox>
                  </div>
                  <div style="float:left;width:10%;height:100%;text-align:center;color:#606266">
                        <!-- <svg-icon :icon-class="'Connect'"></svg-icon> -->
                  </div>
                  <div  class="previewName" v-show="item.flag">
                    <el-select v-model="item.index"  placeholder="请选择" style="width:100%;">
                      <el-option v-for="(items,index) in excelOptions" :label="items" :value="index" :key="index"></el-option>
                    </el-select>
                  </div>
                </div>
              </el-checkbox-group>
          </el-col>
        </el-row>
              </div>
            </div>
        <el-row style="margin-top:20px;" type="flex" justify="end">
          <el-button size="mini" type="primary" @click="handleCaseSave">保存方案</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <!--预览选择方案弹窗-->
    <el-dialog ref="previewDialog" width="460px" v-el-drag-dialog title="选择方案" :before-close="handlePreviewClose" :visible.sync="proviewDialog">
      
        <el-row>
          <el-form ref="previewForm" v-model="previewForm" label-width="80px" label-position="top">
            <el-form-item label="选择方案">
              <el-select v-model="previewForm.caseId" placeholder="请选择方案" @change="changePerviewCase">
                <el-option v-for="item in previewList" :key="item.id" :label="item.title" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-row>
        <div>
          <div class="innerbox">
            <el-row v-if="previewFlag" >
              <el-row>
                <el-form ref="excelForm" :model="excelForm" :rules="rules" label-width="80px" label-position="top">
                <el-row>
                  <el-form-item label="方案名称" prop="caseTitle">
                    <div class="previewTitle">
                      {{excelForm.caseTitle}}
                    </div>
                  </el-form-item>
                </el-row>
                <el-row style="border:1px #EBEEF5 solid;">
                  <el-row class="titleBox" type="flex" justify="space-between">
                    <el-col class="spanTitle">数据列</el-col>
                    <el-col class="spanTitle">EXCEL列</el-col>
                  </el-row>
                  <div class="previewCaseList" v-for="item in previewCaseList.fields" :key="item.name">
                      <div class="previewName">
                        {{item.name}}
                      </div>
                      <div style="float:left;width:10%;text-align:center;color:#606266">
                        <svg-icon :icon-class="'Connect'"></svg-icon>
                      </div>
                      <div class="previewName">
                        {{ excelOptions[item.index] }}
                      </div>
                  </div>
                </el-row>
                </el-form>
              </el-row>
            </el-row>
          </div>
        </div>
        <el-row style="margin-top:30px;" type="flex" justify="end">
          <el-button type="primary" size="mini" @click="handleAddCase">新建方案</el-button>
          <el-button type="primary" size="mini" @click="handleSureCase" v-show="sureFlag" element-loading-text="正在导入数据101行" v-loading.fullscreen.lock="fullscreenLoading">确定方案</el-button>
        </el-row>
    </el-dialog>
    </div>
</template>
<script>
 import elDragDialog from "@/directive/el-dragDialog";
import uploadExcel from "@/components/uploadExcel"

import {getTableFields,getViewFields,setViewFields,importEcl,saveCase,saveBtn } from '@/api/dataTable'
    export default {
        name: 'ImportExcel',
        directives: { elDragDialog },
        props:['viewName'],
        data() {
      return {
        checkList:[],
        value1:'',
        previewCaseList:null,
        previewForm:{
          caseId:'',
          file_name:'',
        },
        res:null,
        previewList:[],
        excelForm:{
          caseTitle:'',
        },
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
        tableHeight:null,
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
          view_name:'',
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
        components: {
            uploadExcel
        },
        created() {
            this.excelData.view_name = this.viewName;
        },
        methods: {
            selected(res){
            
                console.log(res)
                this.previewForm.file_name = res.data.file;
                this.maxPage = res.data.import_page;
                if(res.data.type && res.data.type === 2){
                    /* 有方案了先预览 */
                    this.previewCase(res);
                    this.res = res;
                    }else{
                    /* 没有方案 新建 */
                    this.addCase(res);
                    }
            },
            handleSureCase(){
        let data = {
          import_id:this.previewForm.caseId,
          file_name:this.previewForm.file_name,
          page:1,
        }
        this.fullscreenLoading = true;
        let ajaxFun = ()=>{
         
          saveBtn(data).then(res=>{
            if(res !== 'error'){
                data.page ++;
                if(data.page > this.maxPage){
                  _g,toastMsg('success','导入成功')
                  this.fullscreenLoading = false;
                }else{
              
                  ajaxFun();
                }
            }
          })
        }
        ajaxFun();
      },
      /* 新建方案 */
      handleAddCase(){
        this.handlePreviewClose();
        this.addCase(this.res);
      },
      /* 选择预览的方案 */
      changePerviewCase(){
        this.previewFlag = true;
        this.sureFlag = true;
        _(this.previewList).forEach(item=>{
          if(item.id === this.previewForm.caseId){
            this.previewCaseList = item;
          }
        })
        this.excelForm.caseTitle = this.previewCaseList.title;
    
      },
      handleCheckbox(value,item){
        console.log(item)
        item.flag = value;
        if(!value){
            item.index = '';
        }
      },
      handleCaseSave(){
        /* 保存方案 */
        this.caseOptions = [];
        for(let i in this.fieldsOptions){
          //delete this.fieldsOptions[i].flag;
          if(this.fieldsOptions[i].index !== '' && this.fieldsOptions[i].flag){
            this.caseOptions.push(this.fieldsOptions[i]);
          }
        }
        let data = {
          view_name: "student_lesson",
          title: this.excelForm.caseTitle,
          map: this.caseOptions,
          line:1
        }
        console.log(data)
        this.$refs.excelForm.validate((pass)=>{
          if(pass){
            saveCase(data).then(res=>{
              if(res !== 'error'){
               
                _g.toastMsg('success','新建方案成功')
                setTimeout(()=>{
                  /* 保存成功关闭弹窗 */
                  this.handleExcelClose();
                },10)
              }
            })
          }
        })
      },
      handleImportEcl(){

        /* 打开弹窗 */
        /* 先确定是否有方案 */
      
        /* 导入ecl文件 */
        

        // importEcl(data).then(res=>{
        //   if(res !== 'error'){
      
        //     if(res.data.type && res.data.type === 2){
        //       /* 有方案了先预览 */
        //       this.previewCase(res);
        //       this.res = res;
        //     }else{
        //       /* 没有方案 新建 */
        //       this.addCase(res);
        //     }
        //   }
        // })
      },
      previewCase(res){
        /* 重置数据 */
        this.excelForm.caseTitle = '';
        this.checkList = [];
        this.previewCaseList = [];
        this.previewForm.caseId = '';
        this.previewFlag = false;

        this.proviewDialog = true;
        this.$refs.previewDialog.open();
        this.excelOptions = res.data.excel;
        this.previewList = res.data.import.list;

        if(this.previewForm.caseId && this.previewForm.caseId !== ''){
          this.sureFlag = true;
        }else{
          this.sureFlag = false;
        }
        

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
      addCase(res){
     
        /* 需要对数据进行重置 */
        this.excelForm.caseTitle = '';
        this.checkList = [];
        this.fieldsOptions = null;
        /* 打开新建方案弹窗 */
        
        this.excelOptions = res.data.excel;
        
        this.fieldsOptions = res.data.import.fields;
        for(let i in this.fieldsOptions){
          this.$set(this.fieldsOptions[i],'flag',false);
          this.$set(this.fieldsOptions[i],'index','');
        }
        
        this.excelDialog = true;
        this.$refs.excelDialog.open();
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

