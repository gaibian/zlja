<template>
    <div>
        <el-form :model="form" ref="form" label-position="top" v-loading="loading" element-loading-text="数据加载中">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="缴费型别" prop="type">
                        <el-select style="width:100%" v-model="form.type" placeholder="请选择缴费型别">
                            <el-option v-for="(item,index) in typeOption" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="交费类别" prop="pay_type">
                        <el-select style="width:100%" v-model="form.pay_type" placeholder="请选择交费类别">
                            <el-option v-for="(item,index) in payTypeOption" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="交费方式">
                        <el-select style="width:100%" v-model="form.pay_method" placeholder="请选择交费类别">
                            <el-option v-for="(item,index) in methodOption" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="实交保费">
                        <el-input v-model="form.real_premium" placeholder="请输入被保人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="交费日期">
                        <el-date-picker
                            v-model="form.pay_date"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择交费日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="计绩日期">
                        <el-row :gutter="10" type="flex" align="middle">
                            <el-col>
                                <el-date-picker
                                    v-model="payNum"
                                    type="year"
                                    style="width:100%"
                                    value-format="yyyy"
                                    clearable
                                    placeholder="请选择年">
                                </el-date-picker>
                            </el-col>
                            <el-col style="width:50px">
                                <span>年</span>
                            </el-col>
                            <el-col style="width:130px">
                                <el-input v-model="payCount"></el-input>
                            </el-col>
                            <el-col style="width:50px">
                                <span>次</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年度缴次" prop="year_times">
                        <el-row :gutter="10" type="flex" align="middle">
                            <el-col>
                                <el-input v-model="yearNum" placeholder="请输入"></el-input>
                            </el-col>
                            <el-col style="width:50px">
                                <span>年</span>
                            </el-col>
                            <el-col style="width:130px">
                                <el-input v-model="yearCount"></el-input>
                            </el-col>
                            <el-col style="width:50px">
                                <span>次</span>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                
            </el-row>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="发生月">
                        <el-input v-model="form.happen_date" placeholder="请输入发生月"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="平衡月">
                        <el-input v-model="form.balance_date" placeholder="请输入平衡月"></el-input>
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
import { policyPaySave,policyPayRead,policyPayUpdate } from '@/api/policy'
export default {
    props:{
        flag:{
            type:Boolean,
            default:false
        },
        id:{
            type:[String, Number]
        }
    },
    data() {
        return {
            form:{
                type:'',
                year_times:'',
                pay_type:'',
                pay_method:'',
                real_premium:'',
                pay_date:'',
                deal_date:'',
                happen_date:'',
                balance_date:'',
            },
            loading:false,
            yearNum:'',
            yearCount:'',
            payNum:'',
            payCount:'',
            methodOption:[],
            typeOption:[],
            payTypeOption:[],
            //mainOption:[],
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    created() {
        if(this.flag){
            this.loading = true;
        }
         this.typeOption = _g.handleSelect(this.dictionaryData.system,'POLICY_PAY_TYPE');
         this.payTypeOption = _g.handleSelect(this.dictionaryData.system,'PAY_TYPE');
         this.methodOption = _g.handleSelect(this.dictionaryData.system,'PAYMENTMETHOD');
         console.log(this.typeOption)
        if(this.flag){
            policyPayRead(this.id).then(res => {
                if(res !== 'error'){
                    this.form = res.data
                    this.yearNum = res.data.year_times.substring(0,2)
                    this.yearCount = res.data.year_times.substring(2,4)
                    this.payNum = res.data.deal_date.substring(0,4)
                    this.payCount = res.data.deal_date.substring(4,6)
                    this.loading = false;
                }
            })
        }else{
            this.payNum = '2019';
            this.payCount = '1';
            this.yearNum = '1';
            this.yearCount = '1';
        }
    },
    methods:{
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            let data = Object.assign({},this.form)
            if(this.yearCount.length == 1){
                    this.yearCount = `0${this.yearCount}`
            }
            if(this.payNum.length == 1){
                this.payNum = `0${this.payNum}`
            }
            if(this.payCount.length == 1){
                this.payCount = `0${this.payCount}`
            }
            if(this.yearNum.length == 1){
                this.yearNum = `0${this.yearNum}`
            }
            data.year_times = `${this.yearNum}${this.yearCount}`
            data.deal_date = `${this.payNum}${this.payCount}`
            if(this.flag) {
                policyPayUpdate(this.id,data).then(res => {
                    if(res !== 'error') {
                        _g.toastMsg('success','保存成功');
                        this.$emit('change',true)
                    }
                })
            }else{
                data['policy_id'] = this.$route.params.id;
                policyPaySave(data).then(res => {
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
