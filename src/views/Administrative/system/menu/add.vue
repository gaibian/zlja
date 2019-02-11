<template>
  <div>
    <sticky :className="'sub-navbar '+postForm.status" :stickyTop="84">
      <div class="app-main-btm-fixed" ref="appMainFixed">
        <h1 class="page-title-box">
          菜单管理<em></em><span>/添加列表项</span>
        </h1>
        <div>
          <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="add" :loading="isLoading">保存</el-button>
        </div>
      </div>
    </sticky>
    <div class="app_main_content">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="top">
        <div class="block-box">
          <h1 class="block-header-box">
            <i></i>
            基本信息
          </h1>
          <div class="block-content-box">
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="标题" prop="title">
                  <el-input v-model.trim="form.title" placeholder="请输入标题" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="绑定权限标识" prop="rule_name">
                  <el-input v-model.trim="form.rule_name" clearable placeholder="请选择绑定权限" :disabled="true">
                     <el-button slot="append" @click="openRule()">查找</el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="上级菜单" prop="pid">
                  <multi-picker :options="options" :width="300" :defaultProps="defaultProps" :treeVal="treeVal" @treeClick="handleNodeClick"></multi-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="路径">
                  <el-input v-model.trim="form.url" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="模块" prop="module">
                  <el-input v-model.trim="form.module" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属菜单">
                  <el-input v-model.trim="form.menu" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="排序">
                  <el-input v-model="form.sort" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-form-item label="菜单类型" prop="menu_type">
                  <el-radio-group v-model="form.menu_type">
                    <el-radio label="1">普通三级菜单</el-radio>
                    <el-radio label="2">单页菜单</el-radio>
                    <el-radio label="3">外链</el-radio>
                  </el-radio-group>
                </el-form-item>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>
    <el-dialog ref="dialog" width="800px" v-el-drag-dialog :visible.sync="centerDialogVisible" :before-close="handleClose" title="绑定权限标识">
      <ruleList v-if="centerDialogVisible" ref="ruleList" @closeRule="dialogClose"></ruleList>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from "@/directive/el-dragDialog";
  import ruleList from './rule/rule.vue'
  import { menuAdd,menuListRender } from '@/api/menuList'
  export default {
    name:'menuAdd',
    components: {
      ruleList
    },
    directives: { elDragDialog },
    data() {
      return {
        postForm:{
          status: 'draft',
        },
        isLoading: false,
        centerDialogVisible:false,
        form: {
          title: '',
          rule_name: '',
          rule_id: null,
          pid: '',
          menu_type: '',
          url: '',
          module: '',
          menu: '',
          sort: ''
        },
        treeVal:'请选择上级菜单',
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        options: [{ id: 0, title: '无' }],
        rules: {
          title: [
            { required: true, message: '请输入菜单标题' }
          ],
          menu_type: [
            { required: true, message: '请选择菜单类型' }
          ],
          module: [
            { required: true, message: '请填写菜单模块' }
          ],
          pid: [
            { type: 'number', required: true, message: '请选择上级菜单' }
          ]
        }
      }
    },
    methods: {
      handleEmpty(){
        this.form = {
          title: '',
          rule_name: '',
          rule_id: null,
          pid: '',
          menu_type: '',
          url: '',
          module: '',
          menu: '',
          sort: ''
        }
      },
      dialogClose(data){
        this.centerDialogVisible= false;
        this.form.rule_name = data.rule_name;
        this.form.rule_id = data.rule_id;
      },
      handleNodeClick(data) {
        console.log(data);
        //this.treeVal = data.name;
        //this.isBtnActive = true;
//        this.pagingData = {
//          organization_id:data.id
//        }
        this.treeVal = data.else;
        this.form.pid = data.id;
      },
      add(form) {
        this.$refs.form.validate((pass) => {
          if (pass) {
            this.isLoading = !this.isLoading
            menuAdd(this.form).then(res=>{
              if(res !== 'error'){
                _g.toastMsg('success', '添加成功')
                setTimeout(() => {
                  this.goback()
                  this.isLoading = !this.isLoading
                }, 1500)
              }else{
                this.isLoading = !this.isLoading
              }
            })
          }
        })
      },
      openRule() {
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      },
      handleClose(){
        this.centerDialogVisible = false;
        this.$refs.dialog.close();
      }
    },
    created() {
//      this.apiGet('admin/menus').then((res) => {
//        this.handelResponse(res, (data) => {
//          let array = []
//          _(data).forEach((ret) => {
//            if (ret.level != 3 && ret.menu_type == 1) {
//              array.push(ret)
//            }
//          })
//          this.options = this.options.concat(array)
//        })
//      })
      menuListRender().then(res=>{
        if(res !== 'error'){
          let array = []
          _(res.data).forEach((ret) => {
            if (ret.level != 3 && ret.menu_type == 1) {
              array.push(ret)
            }
          })
          console.log(array);
          this.options = array;
          //this.options = this.options.concat(array)
        }
      })
    },
  }
</script>
<style lang="scss" scoped>

</style>
