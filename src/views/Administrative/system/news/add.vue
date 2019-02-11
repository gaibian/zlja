<template>
    <div>
    <sticky :className="'sub-navbar'" :stickyTop="84">
      <div class="app-main-btm-fixed" ref="appMainFixed">
        <h1 class="page-title-box">
          新闻管理<em></em><span>/添加列表项</span>
        </h1>
        <div>
          <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="add" :loading="isLoading">保存</el-button>
        </div>
      </div>
    </sticky>
    <div class="app_main_content">
        <el-form ref="form" :model="form" label-width="50px" label-position="top">
            <div class="block-box">
                <h1 class="block-header-box">
                    <i></i>
                    基本信息
                </h1>
                <div class="block-content-box">
                    <el-row :gutter="30">
                        <el-col :span="24" class="col-item4">
                            <el-form-item label="标题">
                                <el-input v-model="form.title" placeholder="请输入新闻标题" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" style="margin-right:0">
                        <el-col :span="24">
                            <el-form-item label="新闻内容">
                                <tinymce :height="200" ref="editor" v-model="tinyForm.content"></tinymce>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="block-box">
                <h1 class="block-header-box">
                    <i></i>
                    其他信息
                </h1>
                <div class="block-content-box">
                    <el-row :gutter="30">
                        <el-col :span="6" class="col-item">
                            <el-form-item label="状态">
                                <el-select v-model="form.status" placeholder="请选择状态">
                                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" class="col-item">
                            <el-form-item label="排序">
                                <el-input v-model="form.sort" placeholder="请输入排序" clearable></el-input>
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
const defaultForm = {
    status: 'draft',
    title: '', // 文章题目
    content: '', // 文章内容
    content_short: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    source_name: '', // 文章外部作者
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false
}
import { addNews } from '@/api/newsAdmin'
import Tinymce from '@/components/Tinymce'
export default {
    name:'newsAdminAdd',
    components:{
        Tinymce
    },
    data() {
        return {
            form:{
                title:'',
                content:'',
                sort:'',
                status:'',
            },
            statusOptions:[{
                label:'隐藏',
                value:0
            },{
                label:'显示',
                value:1
            },{
                label:'置顶',
                value:2
            }],
            tinyForm: Object.assign({}, defaultForm),
            isLoading:false,
        }
    },
    methods:{
        handleEmpty() {
            this.form = {
                title:'',
                content:'',
                sort:'',
            }
        },
        add() {
            this.isLoading = true;
            this.form.content = this.tinyForm.content;
            console.log(this.form);
            let data = Object.assign({},this.form);
            addNews(this.form).then(res => {
                if(res !== 'error'){
                    this.isLoading = false;
                    console.log(res)
                    _g.toastMsg('success','添加成功')
                    setTimeout(()=>{
                     this.addRefresh('newsAdmin');
                    })
                }else{
                    this.isLoading = false;
                }
            })
        }
    }
}
</script>

