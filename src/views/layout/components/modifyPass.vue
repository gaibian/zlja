<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="旧密码" prop="old_pwd">
        <el-input v-model.trim="form.old_pwd"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model.trim="form.new_pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLoading" @click="submit()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import request from '@/utils/request'
  export default {
    data(){
      return {
        form:{
          old_pwd:'',
          new_pwd:'',
          auth_key:'',
        },
        isLoading:false,
        rules:{
          old_pwd:[
            { required: true,message: '请输入旧密码', trigger: 'blur' },
            { min: 6,max: 12,message:'长度在6到12个字符', trigger: 'blur' }
          ],
          new_pwd:[
            { required: true,message: '请输入新密码', trigger: 'blur' },
            { min: 6,max: 12,message:'长度在6到12个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      this.form.auth_key = Lockr.get('authKey');
    },
    methods:{
      submit(){
        this.isLoading = !this.isLoading;
        this.$refs.form.validate(pass=>{
          if(pass){
            request.post('admin/base/setInfo',this.form).then(res=>{
              if(res !== 'error'){
                _g.toastMsg('success','提交成功');
                setTimeout(()=>{
                  this.$emit('close');
                  this.isLoading = !this.isLoading;
                })
              }else{
                this.isLoading = !this.isLoading;
              }
            })
          }
        })
      }
    }
  }
</script>

