<template>
  <div>
    <sticky :className="'sub-navbar '+postForm.status" :stickyTop="84">
      <div class="app-main-btm-fixed" ref="appMainFixed">
        <h1 class="page-title-box">
          系统参数-参数项<em></em><span>/添加列表项</span>
        </h1>
        <div>
          <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="add" :loading="isLoading">保存</el-button>
        </div>
      </div>
    </sticky>
    <div class="app_main_content">
      <div class="block-box">
          <h1 class="block-header-box">
            <i></i>
            基本信息
          </h1>
          <div class="block-content-box">
            <el-form ref="form" :model="form" :rules="rules" label-width="130px" label-position="top">
              <el-row :gutter="30">
                <el-col :span="6">
                  <el-form-item label="参数值" prop="value">
                    <el-input v-model.trim="form.value" placeholder="请输入参数值"></el-input>
                  </el-form-item>    
                </el-col>
                <el-col :span="18">
                  <el-form-item label="描述" prop="description">
                    <el-input v-model.trim="form.description" placeholder="请输入描述"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
      </div>
      
    </div>
  
  </div>
</template>
<script>
  import { parameterSave } from '@/api/parameterList'
  export default {
    name:'parameterAdd',
    data(){
      return {
        postForm:{
          status: 'draft',
        },
        form:{
          value:'',
          description:''
        },
        id:null,
        isLoading:false,
        rules: {
          value: [
            {
              require: true, message: '请输入参数值',trigger:'blur'
            }
          ],
          description:[
            {
              require: true, message: '请输入描述内容',trigger:'blur'
            }
          ]
        }
      }
    },
    created(){
      this.id = this.$route.params.id;
    },
    methods:{
      handleEmpty() {
        this.form = {
          value:'',
          description:''
        }
      },
      add(){
        this.isLoading = true;
        this.$refs.form.validate(pass=>{
          if(pass){
            this.isLoading = !this.isLoading;
            let data = {
              parameter_id:this.id,
              value:this.form.value,
              description:this.form.description
            };
            parameterSave(data).then(res=>{
              _g.toastMsg('success','提交成功');
              setTimeout(()=>{
                this.isLoading = false;
                this.goback();
              },1500)
            })
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
