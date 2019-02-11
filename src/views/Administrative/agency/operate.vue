<template>
    <div>
        <el-form :model="form" ref="form" v-loading="loading" element-loading-text="数据加载中">
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="机构名称">
                        <el-input v-model="form.agency_name" placeholder="请输入机构名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="父级机构">
                        <el-select v-model="form.agency_pid" placeholder="请选择父级机构" style="width:100%">
                            <el-option v-for="(item,index) in pidOption" :key="index" :label="item.agency_name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="机构级别">
                        <el-select v-model="form.agency_lever" style="width:100%" placeholder="请选择机构级别">
                            <el-option v-for="(item,index) in leverOption" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="机构简称">
                        <el-input v-model="form.agency_short_name" placeholder="请输入机构简称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="机构负责人">
                        <el-input v-model="form.agency_leader" placeholder="请输入机构负责人"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话">
                        <el-input v-model="form.agency_phone" placeholder="请输入电话"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="传真">
                        <el-input v-model="form.agency_fax" placeholder="请输入传真"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="成立时间">
                        <el-date-picker
                            v-model="form.agency_found_time"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择成立时间">
                        </el-date-picker>
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
import { agencyIndex,agencySave,agencyRead,agencyUpdate } from '@/api/agency'
export default {
    props:{
        flag:{
            type:Boolean,
            default: false
        },
        id:{
            type:[String, Number]
        }
    },
    data() {
        return {
            form:{
                agency_name:'',
                agency_lever:'01',
                agency_short_name:'',
                province:'',
                city:'',
                area:'',
                adress:'',
                agency_leader:'',
                agency_phone:'',
                agency_fax:'',
                agency_found_time:'',
                agency_pid:0,
            },
            loading:false,
            leverOption:[],
            pidOption:[{
                agency_name:'无',
                id:0
            }]
        }
    },
    created() {
        console.log(this.dictionaryData)
        this.leverOption = _g.handleSelect(this.dictionaryData.system,'AGENCY_LEVEL');
        this.init();
        if(this.flag){
            this.loading = true;
            //需要加载详情
            agencyRead(this.id).then(res => {
                if(res !== 'error') {
                    console.log(res)
                    this.form = res.data;
                    this.loading = false;
                }
            })
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    methods:{
        async init() {
            await agencyIndex().then(res => {
                if(res !== 'error') {
                    console.log(res)
                    _(res.data).forEach(value => {
                        this.pidOption.push(value)
                    })
                    
                }
            })
        },
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            let data = Object.assign({},this.form);
            if(this.flag){
                agencyUpdate(this.id,data).then(res => {
                    if(res !== 'error') {
                        _g.toastMsg('success','保存成功')
                        this.$emit('change',true)
                    }
                })
            }else{
                agencySave(data).then(res => {
                    if(res !== 'error') {
                        _g.toastMsg('success','添加成功')
                        this.$emit('change',true)
                    }
                })
            }
            
        }
    }
}
</script>

