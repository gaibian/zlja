<template>
    <div>
        <sticky :className="'sub-navbar'" :stickyTop="84">
            <div class="app-main-btm-fixed" ref="appMainFixed">
                <h1 class="page-title-box">
                    险种添加
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
                        <el-form-item label="编号">
                            <el-input v-model="form.number" placeholder="请输入编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="名称">
                            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="简单名称">
                            <el-input v-model="form.simple_name" placeholder="请输入简单名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="公司">
                            <el-select v-model="form.company_id" placeholder="请选择保险公司" style="width:100%" @change="handleCompanyChange">
                                <el-option v-for="(item,index) in companyOption" :key="index" :label="item.company_name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="参数区别">
                            <el-select v-model="form.param_diff" placeholder="请选择参数区别" style="width:100%">
                                <el-option v-for="(item,index) in paramOption" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="主附险标志">
                            <el-select v-model="form.main_flag" placeholder="请选择主附险标志" style="width:100%">
                                <el-option v-for="(item,index) in mainOption" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="类型">
                            <el-select v-model="form.type" placeholder="请选择主附险标志" style="width:100%">
                                <el-option v-for="(item,index) in typeOption" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="开始时间">
                            <el-date-picker
                            v-model="form.start"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择开始时间">
                        </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="结束时间">
                            <el-date-picker
                            v-model="form.end"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择结束时间">
                        </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="24">
                        <div class="block-box">
                            <h1 class="block-header-box">
                                <i></i>
                                费率年期
                            </h1>
                            <div class="block-content-box">
                                <div style="margin-bottom:20px;">
                                    <el-table :data="form.fee_year" border>
                                        <el-table-column label="年期/分档">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.year" placeholder="请输入年期/分档"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="说明">
                                            <template slot-scope="scope">
                                                <el-input v-model="scope.row.detail" placeholder="请输入说明"></el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作">
                                            <template slot-scope="scope">
                                                <span>
                                                    <svg-icon class="svg-btn" :class="isPlusActive ? 'svgActive' : ''" @mouseenter.native="handleEnter('plus')" @mouseleave.native="handleLeave('plus')" @click.native="handleAdd(scope)" :icon-class="'plus'"></svg-icon>
                                                </span>
                                                <span style="margin-left:4px;">
                                                    <svg-icon class="svg-btn" :class="isReduceActive ? 'svgActive' : ''" @mouseenter.native="handleEnter('reduce')" @mouseleave.native="handleLeave('reduce')" @click.native="handleDelete(scope)" :icon-class="'reduce'"></svg-icon>
                                                </span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import { riskSave } from '@/api/risk'
import { companyIndex } from '@/api/company'
export default {
    name:'riskAdd',
    data() {
        return {
            isLoading: false,
            isPlusActive:false,
            isReduceActive:false,
            form:{
                name:'',
                simple_name:'',
                number:'',
                company_id:'',
                param_diff:'',
                type:'',
                fee_year:[{
                    year:'',
                    detail:'',
                }],
            },
            companyOption:[],
            mainOption:[],
            typeOption:[],
        }
    },
    created() {
        this.paramOption = _g.handleSelect(this.dictionaryData.system,'PARAM_DIFF');
        this.mainOption = _g.handleSelect(this.dictionaryData.system,'RISK_MAIN_FLAG');
        
        this.init();
    },
    methods:{
        init() {
           companyIndex().then(res => {
               if(res !== 'error'){
                   console.log(res)
                   this.companyOption = res.data.data
               }
           })
        },
        handleAdd(item) {
            let o = {
                year:'',
                detail:'',
            };
            this.form.fee_year.splice(item.$index + 1,0,o)
        },
        handleDelete(item) {
            if(this.form.fee_year.length == 1){
                _g.toastMsg("error", "至少保留一条险种");
                return false;
            }
            this.form.fee_year.splice(item.$index,1);
        },
        handleEnter(val) {
            if(val == 'reduce'){
                this.isReduceActive = true;
                this.isPlusActive = false;
            }
            if(val == 'plus'){
                this.isReduceActive = false;
                this.isPlusActive = true;
            }
            
        },
        handleLeave(val) {
            if(val == 'reduce'){
                this.isReduceActive = false;
            }
            if(val == 'plus'){
                this.isPlusActive = false;
            }
        },
        handleCompanyChange(val) {
            console.log(val)
            _(this.companyOption).forEach(item => {
                if(item.id == val){
                    console.log(item)
                    if(item.type_name == '00'){  //产险
                        this.typeOption = _g.handleSelect(this.dictionaryData.system,'CHAN_RISK_TYPE');
                    }else{  //寿险
                        this.typeOption = _g.handleSelect(this.dictionaryData.system,'SHOU_RISK_TYPE');
                    }
                    console.log(this.typeOption)
                }
            })
        },
        handleSubmit() {
            this.isLoading = true;
            let data = Object.assign({},this.form);
            data.fee_year = JSON.stringify(data.fee_year)
            riskSave(data).then(res => {
                if(res !== 'error'){
                    console.log(res)
                    _g.toastMsg('success','保存成功')
                    setTimeout(() => {
                         this.addRefresh('riskList');
                     },1000)
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
.svg-btn{
    font-size:25px;
    color:#909399;
    cursor:pointer;
    &.svgActive{
        color:#F56C6C;
    }
}
</style>

