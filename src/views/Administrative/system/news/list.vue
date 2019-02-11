<template>
    <div class="app_main_container" ref="mainContainer">
        <div class="page_table_box">
            <div class="filter-container" ref="topAdd">
                <router-link class="btn-link-large add-btn" to="add" v-if="addShow">
                    <el-button type="primary" size="mini" icon="el-icon-plus">添加新闻</el-button>
                </router-link>
            </div>
            <el-table :data="tableData" border :maxHeight="tableHeight" v-if="indexShow" v-loading="loading" element-loading-text="数据加载中">
                <el-table-column label="名称" prop="title" min-width="250"></el-table-column>
                <!-- <el-table-column label="描述" prop="content"></el-table-column> -->
                <el-table-column label="排序" prop="sort" width="80"></el-table-column>
                <el-table-column label="发布时间" min-width="170">
                    <template slot-scope="scope">
                        <span>{{ scope.row.add_time | timestampToTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="185">
                    <template slot-scope="scope">
                        <div>
                            <el-button v-if="readShow" size="mini" type="primary" @click="handleEdit(scope)"><svg-icon style="margin-right:6px" :icon-class="'operate-edit'"></svg-icon>编辑</el-button>
                            <el-button v-if="deleteShow" size="mini" type="danger" style="margin-left:4px" @click="handleDelete(scope)"><svg-icon style="margin-right:6px;" :icon-class="'operate-delete'"></svg-icon>删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div ref="btmGroup" style="height:60px;">
                <el-row class="pos_rel" style="height:60px;" type="flex" align="middle" justify="end">
                <div class="block pages">
                    <paging :type="'insurance/news'" @loadingChange="loading = true" :updateType="'sheet'" :pagingdata="searchForm" :update="update" @sheetPaging="handlePaging"></paging>
                </div>
                </el-row>
            </div>
        </div>

    </div>
</template>
<script>
import resize from "@/utils/page-mixins";
import { deleteNews } from '@/api/newsAdmin'
import newsEdit from './edit.vue'
export default {
    name:'newsAdmin',
    mixins: [resize],
    components: {
        newsEdit
    },
    data() {
        return {
            tableData:[],
            searchForm:{},
            update:false,
            loading:false,
            tableHeight:null,
    
        }
    },
    created() {
        bus.$on('newsAdmin',() => {
            this.update = !this.update
        })
    },
    methods:{

        handleEdit(item) {
            this.$router.push({
                name:'newsAdminEdit',
                params:{
                    id:item.row.id
                },
                query:{
                    pageClick:_g.editRefresh('newsAdminEdit'),
                }
            })
        },
        handleDelete(item) {
            this.$confirm('确定删除该新闻?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deleteNews(item.row.id).then(res=>{
                if(res !== 'error'){
                    _g.toastMsg('success','删除成功');
                    setTimeout(()=>{
                    this.update = !this.update;
                    })
                }
                })
            })
        },
        handlePaging(data) {
            this.loading = true;
            setTimeout(() => {
                this.tableData = data.map(item => {
                return item;
                });
                this.loading = !this.loading;
        
            }, 300);
        },
    },
    computed: {
        //控制按钮的权限
        indexShow() {
        return _g.getHasRule("insurance-news-index");
        },
        addShow() {
        return _g.getHasRule("insurance-news-save");
        },
        readShow() {
        return _g.getHasRule("insurance-news-read");
        },
        deleteShow() {
        return _g.getHasRule("insurance-news-delete");
        }
    },
}
</script>

