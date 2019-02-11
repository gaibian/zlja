<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中">
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="投保单号">
                            <el-input v-model="form.apply_policy_number" placeholder="请输入投保单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="保单号">
                            <el-input v-model="form.policy_number" placeholder="请输入保单号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="保险公司名称">
                            <el-select v-model="form.company_id" placeholder="请选择保险公司名称" style="width:100%;" @change="companyChange">
                                <el-option v-for="(item,index) in companyOption" :key="index" :label="item.company_name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="险种名称">
                            <el-select v-model="form.insurance_id" placeholder="请输入险种名称" style="width:100%;" :disabled="riskDisabled" @change="riskChange">
                                <el-option v-for="(item,index) in riskOption" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="险种编码">
                            <el-input v-model="form.insurance_number" placeholder="请输入险种编码" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="投保人姓名">
                            <el-input v-model="form.applicant_name" placeholder="请输入投保人姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="投保人身份证号">
                            <el-input v-model="form.applicant_card_num" placeholder="请输入投保人身份证号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="投保人电话">
                            <el-input v-model="form.applicant_phone" placeholder="请输入投保人电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="受益人姓名">
                            <el-input v-model="form.benefit_name" placeholder="请输入受益人姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="受益人身份证号">
                            <el-input v-model="form.benefit_card_num" placeholder="请输入受益人身份证号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="受益人电话">
                            <el-input v-model="form.benefit_phone" placeholder="请输入受益人电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="受理日期">
                            <el-date-picker
                            v-model="form.accept_date"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择受理日期">
                        </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="生效日期">
                            <el-date-picker
                            v-model="form.start_date"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择生效日期">
                        </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="签发日期">
                            <el-date-picker
                            v-model="form.sign_date"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择签发日期">
                        </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="回执状态">
                            <el-select v-model="form.back_status" placeholder="请输入回执状态" style="width:100%;">
                                <el-option v-for="(item,index) in backStatusOption" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="回执日期">
                            <el-date-picker
                            v-model="form.back_date"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择回执日期">
                        </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="年期">
                            <el-input v-model="form.year" placeholder="请输入年期"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="保额">
                            <el-input v-model="form.amount" placeholder="请输入保额"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="保费">
                            <el-input v-model="form.premium" placeholder="请输入保费"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="保单类别">
                            <el-select v-model="form.type" placeholder="请选择保单类别" style="width:100%;">
                                <el-option v-for="(item,index) in typeOption" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="30">
                    <el-col :span="6" class="col-item">
                        <el-form-item label="缴费类别">
                            <el-select v-model="form.pay_type" placeholder="请选择缴费类别" style="width:100%;">
                                <el-option v-for="(item,index) in payOption" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col-item">
                        <el-form-item label="缴费方式">
                            <el-select v-model="form.pay_method" placeholder="请选择缴费方式" style="width:100%;">
                                <el-option v-for="(item,index) in methodOption" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <el-button type="danger" size="mini" icon="el-icon-close" @click="handleEmpty()">清空表单</el-button>
            <el-button type="primary" icon="el-icon-check" size="mini" @click="handleSubmit" :loading="isLoading">保存</el-button>
    </div>
</template>
<script>
import { policyRead,policyUpdate,policyCheckSave } from '@/api/policy'
import { companyIndex } from '@/api/company'
import { riskIndex,riskRead } from '@/api/risk'
export default {
    data() {
        return {
            form:{
                apply_policy_number:'',
                policy_number:'',
                company_name:'',
                company_id:'',
                insurance_name:'',
                insurance_id:'',
                insurance_number:'',
                applicant_name:'',
                applicant_card_num:'',
                applicant_phone:'',
                benefit_name:'',
                benefit_card_num:'',
                benefit_phone:'',
                sign_date:'',
                start_date:'',
                accept_date:'',
                back_status:'',
                back_date:'',
                year:'',
                amount:'',
                premium:'',
                type:'',
                pay_type:'',
                pay_method:'',
            },
            isLoading: false,
            riskDisabled:true,
            companyOption:[],
            loading:false,
            riskOption: [],
            backStatusOption:[],
            typeOption:[],
            payOption:[],
            methodOption:[],
        }
    },
    created() {
        this.backStatusOption = _g.handleSelect(this.dictionaryData.system,'RECEIPT')
        this.typeOption = _g.handleSelect(this.dictionaryData.system,'POLICY_TYPE')
        this.payOption = _g.handleSelect(this.dictionaryData.system,'POLICY_PAY_TYPE')
        this.methodOption = _g.handleSelect(this.dictionaryData.system,'PAYMENTMETHOD')
        this.init();
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    methods:{
        async init() {
            this.loading = true;
            this.$store.dispatch('setLoading',true)
            //this.companyOption = _g.handleSelect(this.dictionaryData.system,'COMPANY_TYPE')
            await companyIndex().then(res => {
                if(res !== 'error'){
                    this.companyOption = res.data.data;
                    console.log(this.companyOption)
                }
            })

            await policyRead(this.$route.params.id).then(res => {
                if(res !== 'error'){
                    console.log(res)
                    this.form = res.data;
                    this.form.company_name = Number(this.form.company_name);
                    this.form.insurance_name = Number(this.form.insurance_name);
                    
                    this.$store.dispatch('setLoading',false)
                    this.loading = false;
                }
            })

            let data = {
                params:{
                    company_id:this.form.company_name
                }
            }

            await riskIndex(data).then(res => {
                if(res !== 'error'){
                    console.log(res)
                    this.riskOption = res.data.data;
                    this.riskDisabled = false;
                    console.log(this.riskOption)
                }
            })
        },
        handleSubmit() {
            this.isLoading = true;
            let data = Object.assign({},this.form);
            data['id'] = this.$route.params.id;
            policyCheckSave(data).then(res => {
                if(res !== 'error'){
                    console.log(res)
                    _g.toastMsg('success','保存成功')
                    setTimeout(() => {
                         this.addRefresh('policyNoExamine');
                     },1000)
                }
                this.isLoading = false;
            })
        },
        handleEmpty() {

        },
        riskChange(id) {
            let data = {
                params:{
                    id:id
                }
            }
            riskRead(id).then(res => {
                if(res !== 'error'){
                    this.form.insurance_number = res.data.number;
                }
            })
            _(this.riskOption).forEach(item => {
                if(item.id == id){
                    this.form.insurance_name = item.insurance_name;
                }
            })
        },
        companyChange(id) {
            let data = {
                params:{
                    company_id:id
                }
            }
            riskIndex(data).then(res => {
                if(res !== 'error'){
                    this.riskOption = res.data.data;
                    this.riskDisabled = false;
                }
            })
            _(this.companyOption).forEach(item => {
                if(item.id == id){
                    this.form.company_name = item.company_name;
                }
            })
        },
    }
}
</script>

