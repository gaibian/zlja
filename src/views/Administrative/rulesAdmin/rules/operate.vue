<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules" label-position="top" v-loading="loading" element-loading-text="数据加载中">
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="名称" prop="access_name">
                        <el-input v-model="form.access_name" placeholder="请输入显示名"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="模块" prop="app">
                        <el-input v-model="form.app" placeholder="请输入模块"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="控制器" prop="controller">
                        <el-input v-model="form.controller" placeholder="请输入控制器"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="操作" prop="action">
                        <el-input v-model="form.action" placeholder="请输入操作"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-form-item label="关联数据类型">
                <!-- <el-select v-model="form.typeData" placeholder="请选择数据类型" style="width:100%">
                    <el-option v-for="(item,index) in typeOption" :key="index" :label="item.type_name" :value="item.type_id"></el-option>
                </el-select> -->
                <el-checkbox-group v-model="type1" @change="handleChange1">
                    <el-checkbox v-for="(item,index) in typeOption" :label="item.type_id" :key="index">{{item.type_name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="width:100%;display:block;text-align:center">
            <el-button @click="handleChange" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSure" size="small">确 定</el-button>
        </span>
    </div>
</template>
<script>
import { setRules,getDataTypeList,rulesDetails,accessUpdate } from '@/api/rules'

export default {
    name:'rulesOperate',
    props:{
        flag:{
            type: Boolean,
            default: false,
        },
        id:{
            type:[String, Number]
        }
    },
    data() {
        return {
            form:{
                access_name:'',
                app:'',
                controller:'',
                action:'',
                type:[],
            },
            typeOption:[],
            type1:[],
            loading:false,
            rules:{
                access_name:[
                    { required:true, message:'请输入显示名', trigger:'blur' }
                ],
                app:[
                    { required:true, message:'请输入名称', trigger:'blur' }
                ],
                controller:[
                    { required:true, message:'请输入显示名', trigger:'blur' }
                ],
                action:[
                    { required:true, message:'请输入显示名', trigger:'blur' }
                ],
   
            }
        }
    },
    created() {
        this.init();
    },
    methods:{
        handleChange1(val) {
            this.form.type = [];
            _(val).forEach(value => {
                _(this.typeOption).forEach(item => {
                    if(value == item.type_id){
                        this.form.type.push({
                            type_id:item.type_id,
                            type_name:item.type_name
                        })
                    }
                })
            })
            
            console.log(this.form.type)
        },
        async init() {
            if(this.flag){
                this.loading = true
            }

            await getDataTypeList().then(res => {
                if(res !== 'error'){
                    console.log(res)
                    this.typeOption = res.data.data
                }
            })

            if(this.flag){
                console.log('sss')
                await rulesDetails(this.id).then(res => {
                    if(res !== 'error'){
                        this.form = Object.assign({},res.data);
                        this.form.type = [];
                        this.type1 = [];
                        _(res.data.type).forEach(value => {
                            console.log(value)
                            this.form.type.push({
                                type_id:value.type_id,
                                type_name:value.type_name
                            })
                            this.type1.push(value.type_id)
                        })
                        console.log(this.form)
                        this.loading = false;
                    }
                })
            }
            
        },
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            let data = Object.assign({},this.form)
            if(this.flag){
                accessUpdate(this.id,data).then(res => {
                    if(res !== 'error'){
                        _g.toastMsg('success','保存成功')
                        this.$emit('change',true)
                    }
                })
            }else{
                setRules(data).then(res => {
                    console.log(res)
                    if(res !== 'error'){
                        _g.toastMsg('success','添加成功')
                        this.$emit('change',true)
                    }
                })
            }
            
            
        }
    }
}
</script>
