<template>
  <div>
    <sticky :className="'sub-navbar '+postForm.status" :stickyTop="84">
      <div class="app-main-btm-fixed" ref="appMainFixed">
        <h1 class="page-title-box">
          系统参数<em></em><span>/添加列表项</span>
        </h1>
        <div>
          <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="add" :loading="isLoading">保存</el-button>
        </div>
      </div>
    </sticky>
    <div class="app_main_content">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="top">
        <div class="block-box">
          <h1 class="block-header-box">
            <i></i>
            基本信息
          </h1>
          <div class="block-content-box">
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="显示名" prop="title">
                  <el-input v-model.trim="form.title" placeholder="请输入显示名" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="名称" prop="name">
                  <el-input v-model.trim="form.name" placeholder="请输入名称" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="父节点" prop="pid">
                    <multi-picker :options="options" :width="300" :defaultProps="defaultProps" :treeVal="treeVal" @treeClick="handleNodeClick"></multi-picker>
                  </el-form-item>
              </el-col>
            </el-row>
            
            
            <el-form-item label="节点类型" prop="level">
              <el-radio-group v-model="form.level">
                <el-radio label="1">项目</el-radio>
                <el-radio label="2">模块</el-radio>
                <el-radio label="3">操作</el-radio>
              </el-radio-group>
            </el-form-item>
            
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ruleListAdd, addRuleRender } from "@/api/ruleList";
export default {
  name: "ruleAdd",
  data() {
    return {
      postForm: {
        status: "draft"
      },
      isLoading: false,
      form: {
        title: "",
        name: "",
        pid: null,
        level: "1"
      },
      isBtnActive: false,
      defaultProps: {
        children: "children",
        label: "title"
      },
      treeVal: "请选择父节点",
      options: [{ id: 0, title: "根节点" }],
      rules: {
        title: [{ required: true, message: "请输入节点名称", trigger: "blur" }],
        name: [
          { required: true, message: "请输入节点显示名", trigger: "blur" }
        ],
        level: [{ required: true, message: "请选择节点类型" }],
        pid: [{ type: "number", required: true, message: "请选择父级节点" }]
      }
    };
  },
  methods: {
    handleEmpty() {
      this.form = {
        title: "",
        name: "",
        pid: null,
        level: "1"
      };
    },
    handleNodeClick(data) {
      console.log(data);
      this.isBtnActive = true;
      this.treeVal = data.title;
      this.form.pid = data.id;
    },
    add() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = !this.isLoading;
          ruleListAdd(this.form).then(res => {
            _g.toastMsg("success", "添加成功");
            setTimeout(() => {
              this.goback();
            }, 1500);
            this.isLoading = !this.isLoading;
          });
        }
      });
    },
    getRules() {
      addRuleRender().then(res => {
        this.options = res.data;
      });
    }
  },
  created() {
    this.getRules();
  }
};
</script>
<style lang="scss" scoped>
</style>
