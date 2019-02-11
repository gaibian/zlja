<template>
  <div>
    <sticky :className="'sub-navbar '+postForm.status" :stickyTop="84">
      <div class="app-main-btm-fixed" ref="appMainFixed">
        <h1 class="page-title-box">数据表<em></em><span>添加列表项</span></h1>
        <div>
          <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="add('form')" :loading="isLoading">保存</el-button>
        </div>
      </div>
    </sticky>
    <div class="app_main_content">
      <el-form :model="form" ref="form" label-width="60px" label-position="top">
        <div class="block-box">
          <el-row class="block-header-box">
            <i></i>
            基本信息
          </el-row>
          <div class="block-content-box">
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="表格名称" prop="name">
                  <el-input v-model.trim="form.name" placeholder="请输入表格名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数据库表名" prop="table_name">
                  <el-select
                    v-model.trim="form.table_name"
                    style="width:100%"
                    @change="handleTableName"
                  >
                    <el-option
                      v-for="(item,index) in tableNameOptions"
                      :key="index"
                      :label="item.Name"
                      :value="item.Name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="数据库表引擎" prop="table_engine">
                  <el-input v-model="form.table_engine" placeholder="请输入数据库表引擎" disabled></el-input>
                </el-form-item>
              </el-col>
              <!--<el-col :span="6">-->
                <!--<el-form-item label="表字段">-->
                  <!--<el-input v-model="form.table_fields" placeholder="请输入表字段"></el-input>-->
                <!--</el-form-item>-->
              <!--</el-col>-->
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="表是否写入数据">
                  <el-radio-group v-model="form.table_type" @change="handleTransfer()">
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { getTables,getViewTables,getTableFields,getTableInfo,setViewTable,setViewFields } from '@/api/dataTable'
  export default {
    name:'dataTableAdd',
    data() {
      return {
        postForm: {
          status: "draft"
        },
        form:{
          name:'',
          table_name:'',
          table_engine:'',
          table_type:'',
          table_fields:'',
        },
        tableNameOptions:[],
        isLoading:false,
      }
    },
    created(){
      getTables().then(res=>{
        if(res !== 'error'){
          this.tableNameOptions = res.data;
        }
      })
    },
    methods:{
      add(){
        
        this.$refs.form.validate(pass=>{
          if(pass){
            this.isLoading = !this.isLoading;
            setViewTable(this.form).then(res=>{
              if(res !== 'error'){
                _g.toastMsg('success','添加成功');
                setTimeout(()=>{
                  this.addRefresh('dataTableList');
                },1500)
              }
              this.isLoading = !this.isLoading;
            })
          }
        })
      },
      handleTableName(val){
        _(this.tableNameOptions).forEach(item=>{
          if(val == item.Name){
            this.form.table_engine = item.Engine
            return false;
          }
        })
        
        
      },
      handleTransfer(){
      
      },
      handleEmpty(){
        this.form = {
          name:'',
          table_name:'',
          table_engine:'',
          table_type:'',
          table_fields:'',
        }
      }
    }
  }
</script>
