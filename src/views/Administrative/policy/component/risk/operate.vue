<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="主附险标志">
                        <el-select v-model="form.main_flag" style="width:100%" placeholder="请选择主附险标志" @change="handleRiskChange">
                            <el-option v-for="(item,index) in mainOption" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="险种名称" prop="insurance_name">
                        <el-select v-model="form.insurance_id" placeholder="请选择险种" :disabled="insuranFlag" @change="handleInsuranceChange">
                            <el-option v-for="item in insuranceOption" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="险种编号" prop="insurance_number">
                        <el-input v-model="form.insurance_number" disabled placeholder="请输入险种编号"></el-input>
                    </el-form-item>
                </el-col>
                
            </el-row>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="受理日期" prop="accept_date">
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
                <el-col :span="8">
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
                <el-col :span="8">
                    <el-form-item label="被保人">
                        <el-input v-model="form.insured_name" placeholder="请输入被保人"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="年期">
                        <el-select v-model="form.year" placeholder="请选择年期">
                            <el-option v-for="(item,index) in yearOption" :key="index" :label="item.detail" :value="item.year"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="保额">
                        <el-input v-model="form.amount" placeholder="请输入保额"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="保费">
                        <el-input v-model="form.premium" placeholder="请输入保费"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer" style="width:100%;display:block;text-align:center">
            <el-button @click="handleChange" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSure" size="small">确 定</el-button>
        </span>
    </div>
</template>
<script>
import { policyRiskSave,policyRiskRead,policyRiskUpdate } from '@/api/policy'
import { riskIndex } from '@/api/risk'
export default {
    props:{
        flag:{
            type:Boolean,
            default:false
        },
        id:{
            type:[String, Number]
        },
        companyId:{
            type:[String,Number]
        }
    },
    data() {
        return {
            form:{
                insurance_number:'',
                insurance_name:'',
                accept_date:'',
                start_date:'',
                main_flag:'',
                insured_name:'',
                year:'',
                amount:'',
                insurance_id:'',
                premium:'',
            },
            insuranFlag:true,
            insuranceOption:[],
            loading:false,
            mainOption:[],
            yearOption:[],
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    async created() {
        if(this.flag){
            this.loading = true
        }
        this.mainOption = _g.handleSelect(this.dictionaryData.system,'RISK_MAIN_FLAG');
        if(this.flag){
            
            await policyRiskRead(this.id).then(res => {
                if(res !== 'error'){
                    this.handleRiskChange(res.data.main_flag);
                    this.form = res.data
                    
                }
            })
        }
    },
    methods:{
        handleRiskChange(val) {
            this.insuranceOption = [];
            this.form.insurance_number = '';
            this.form.insurance_name = '';
            this.form.insurance_id = '';
            let data = {
                params:{
                    company_id:this.companyId,
                    main_flag:val
                }
            }
            riskIndex(data).then(res => {
                if(res !== 'error') {
                    console.log(res)
                    this.insuranceOption = res.data.data
                    this.insuranFlag = false;
                    this.handleInsuranceChange(this.form.insurance_id)
                    this.loading = false;
                }
            })
        },
        handleInsuranceChange(id) {
            this.yearOption = [];
            for(let i of this.insuranceOption){
                if(i.id == id){
                    this.form.insurance_name = i.name
                    this.form.insurance_number = i.number
                    this.yearOption = JSON.parse(i.fee_year)
                }
            }
            console.log(this.yearOption)
        },
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            let data = Object.assign({},this.form)
            if(this.flag) {
                policyRiskUpdate(this.id,data).then(res => {
                    if(res !== 'error') {
                        _g.toastMsg('success','保存成功');
                        this.$emit('change',true)
                    }
                })
            }else{
                data['policy_id'] = this.$route.params.id;
                policyRiskSave(data).then(res => {
                    if(res !== 'error') {
                        console.log(res)
                        _g.toastMsg('success','添加成功');
                        this.$emit('change',true)
                    }
                })
            }
            
        },
    }
}
</script>
