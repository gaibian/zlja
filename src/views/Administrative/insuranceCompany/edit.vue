<template>
    <div>
        <sticky :className="'sub-navbar'" :stickyTop="84">
            <div class="app-main-btm-fixed" ref="appMainFixed">
                <h1 class="page-title-box">
                    保险公司编辑
                </h1>
                <div>
                <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
                <el-button type="primary" icon="el-icon-check" size="mini" @click="handleSubmit" :loading="isLoading">保存</el-button>
                </div>
            </div>
        </sticky>
        <div class="app_main_content">
            <el-form :model="form" ref="form">
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="保险公司名称">
                            <el-input v-model="form.company_name" placeholder="请输入保险公司名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="区域">
                            <el-input v-model="form.area_name" placeholder="请输入区域"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="类型">
                            <el-select v-model="form.type_name" placeholder="请选择类型" style="width:100%;">
                                <el-option v-for="(item,index) in typeOption" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="排序">
                            <el-input v-model="form.sort" placeholder="请输入排序"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { companyRead,companyUpdate } from '@/api/company'
export default {
    name:'companyEdit',
    data() {
        return {
            isLoading: false,
            form:{
                company_name:'',
                area_name:'',
                type_name:'',
                sort:'',
            },
            typeOption:[],
        }
    },
    activated() {
        let boo = this.$route.query.pageClick;
        if(boo){
            console.log('jinqule')
            this.init();
        }
    },
    created() {
        //this.init();
    },
    methods:{
        async init() {
            this.$store.dispatch('setLoading',true)
            this.typeOption = await _g.handleSelect(this.dictionaryData.system,'COMPANY_TYPE')
            await companyRead(this.$route.params.id).then(res => {
                if(res !== 'error'){
                    this.form = res.data;
                    this.$store.dispatch('setLoading',false)
                }
            })
        },
        handleSubmit() {
            this.isLoading = true;
            companyUpdate(this.$route.params.id,this.form).then(res => {
                if(res !== 'error'){
                    _g.toastMsg('success','保存成功')
                    setTimeout(() => {
                        this.addRefresh('companyList');
                    },300)
                }
                this.isLoading = false;
            })
        },
        handleEmpty() {

        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

