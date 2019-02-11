<template>
  <dialog-scroll :formLoading="formLoading">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item label="显示名" prop="title">
        <el-input v-model.trim="form.title" clearable class="h-40"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="form.name" clearable class="h-40"></el-input>
      </el-form-item>
      <el-form-item label="节点类型" prop="level">
        <el-radio-group v-model="form.level">
          <el-radio label="1" disabled>项目</el-radio>
          <el-radio label="2" disabled>模块</el-radio>
          <el-radio label="3" disabled>操作</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="父节点" prop="pid">
        <!-- <el-popover placement="bottom-start" width="200" trigger="click">
          <el-tree :data="options" :props="defaultProps" @node-click="handleNodeClick">
          </el-tree>
          <el-button style="width:100%" :class="{ popBtnActive: isBtnActive }" class="pop-btn" slot="reference">{{treeVal}}</el-button>
        </el-popover> -->
        <multi-picker :options="options" :width="300" :defaultProps="defaultProps" :treeVal="treeVal" @treeClick="handleNodeClick"></multi-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="editShow" @click="edit('form')" :loading="isLoading">提交</el-button>
      </el-form-item>
    </el-form>
  </dialog-scroll>
</template>

<script>
  import { editRuleSave,editIdInfo,addRuleRender } from '@/api/ruleList'
  export default {
    props:[
      'editId'
    ],
    data() {
      return {
        isLoading: false,
        form: {
          id: null,
          title: '',
          name: '',
          pid: null,
          level: null
        },
        formLoading:false,
        disabled:false,
        treeVal:'请选择父节点',
        isBtnActive:false,
        options: [{ id: 0, name: '根节点'}],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        rules: {
          title: [
            { required: true, message: '请输入节点名称' ,trigger:'blur'}
          ],
          name: [
            { required: true, message: '请输入节点显示名',trigger:'blur' }
          ],
          level: [
            { required: true, message: '请选择节点类型' }
          ],
          pid: [
            { type: 'number', required: true, message: '请选择父级节点' }
          ]
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        this.isBtnActive = true;
        this.treeVal = data.title;
        this.form.pid = data.id;
      },
      edit(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.isLoading = !this.isLoading
            editRuleSave(this.editId,this.form).then(res=>{
              _g.toastMsg('success','编辑成功');
              setTimeout(()=>{
                this.$emit('close')
                this.isLoading = !this.isLoading;
              },1500)
            })
          }
        })
      },
      getRules() {
        addRuleRender().then(res=>{
          this.options = res.data;
        })
      },
      getRuleInfo() {
        editIdInfo(this.editId).then(res=>{
          res.data.level = res.data.level.toString();
          this.form = res.data;
          if(res.data.p_title === null){
            this.treeVal = '顶级权限';
            this.disabled = true;
          }else{
            this.treeVal = res.data.p_title;
            this.disabled = false;
          }
          this.formLoading = false;
        })
      }
    },
    created() {
      this.formLoading = true;
      this.getRules()
      this.getRuleInfo()
    },
    computed:{
      editShow() {
        return _g.getHasRule('admin-rules-update')
      },
    }
  }
</script>
<style lang="scss" scoped>

</style>
