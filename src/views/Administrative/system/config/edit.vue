<template>
  <dialog-scroll :formLoading="formLoading">
    <el-form ref="form" :model="form" :rules="rules" label-width="50px" label-position="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="form.name" clearable placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" clearable placeholder="请输入描述信息" v-model.trim="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="editShow" @click="add('form')" :loading="isLoading">提交</el-button>
      </el-form-item>
    </el-form>
  </dialog-scroll>
</template>
<script>
  import {editConfig,saveConfig} from '@/api/configList'
export default {
  props:[
    'editId'
  ],
  data(){
    return {
      form:{
        name:'',
        description:'',
      },
      formLoading:false,
      id:null,
      rules:{
        name:[
          {required:true,message:'请输入名称',trigger:'blur'}
        ],
        description:[
          {required:true,message:'请输入描述信息',trigger:'blur'}
        ],
      },
      isLoading:false
    }
  },
  created(){
    this.formLoading = true;
    this.id = this.editId;
    editConfig(this.id).then(res=>{
      this.form.name = res.data.name;
      this.form.description = res.data.description;
      this.formLoading = false;
    })
  },
  methods:{
    add(){
      this.$refs.form.validate(pass=>{
        if(pass){
          this.isLoading = !this.isLoading;
          saveConfig(this.id,this.form).then(res=>{
            _g.toastMsg('success','提交成功');
            setTimeout(()=>{
              this.$emit('close');
            },1500)
            
          })
        }
      })
    }
  },
  computed: {  //控制按钮的权限
    editShow() {
      return _g.getHasRule('admin-systemconfigs-update')
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
