<template>
    <div>
    <sticky :className="'sub-navbar'" :stickyTop="84">
      <div class="app-main-btm-fixed" ref="appMainFixed">
        <h1 class="page-title-box">
          新闻管理<em></em><span>/添加列表项</span>
        </h1>
        <div>
          <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="add" v-if="editShow" :loading="isLoading">保存</el-button>
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
                        <el-col :span="6" class="col-item">
                            <el-form-item label="标题">
                                <el-input v-model="form.title" placeholder="请输入新闻标题" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" class="col-item">
                            <el-form-item label="排序">
                                <el-input v-model="form.sort" placeholder="请输入排序" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30" style="margin-right:0">
                        <el-col :span="24">
                            <el-form-item label="描述">
                                <tinymce :height="200" ref="editor" v-model="tinyForm.content"></tinymce>
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
import { editNews,editNewsSave } from '@/api/newsAdmin'
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
            },
            formLoading:false,
            tinyForm: Object.assign({}, defaultForm),
            isLoading:false,
        }
    },
    activated() {
        let boo = this.$route.query.pageClick;
        if(boo){
          this.init();
        }
    },
    created() {
        this.init()
    },
    methods:{
        init() {
            this.$store.dispatch('setLoading', true)
            let id = this.$route.params.id;
            editNews(id).then(res => {
                if(res !== 'error'){
                    this.form = res.data;
                    this.tinyForm.content = res.data.content;
                    this.$store.dispatch('setLoading', false)   
                }
                
            })
        },
        add() {
            this.isLoading = true;
            let id = this.$route.params.id;
            this.form.content = this.tinyForm.content;
            editNewsSave(id,this.form).then(res => {
                if(res !== 'error'){
                    _g.toastMsg('success','保存成功')
                    setTimeout(()=>{
                     this.addRefresh('newsAdmin');
                    })
                }
                this.isLoading = false;
            })
        },
        handleEmpty() {
            this.form = {
                title:'',
                content:'',
                sort:'',
            }
            this.tinyForm.content = '';
        }
    },
    computed:{
      editShow() {
        return _g.getHasRule('insurance-news-update')
      },
    }
}
</script>

