<template>
    <div ref="div">
        <el-form :model="form" ref="form" :rules="rules" v-loading="loading" element-loading-text="数据加载中">
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="用户名称" prop="user_name">
                        <el-input v-model="form.user_name" placeholder="请输入用户名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="用户密码" prop="password" v-if="!flag">
                        <el-input v-model="form.password" type="password" placeholder="请输入用户密码"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="12">
                        <el-form-item label="机构组织">
                            <el-select v-model="form.agency_id" placeholder="请选择机构组织" style="width:100%;">
                                <el-option v-for="(item,index) in agencyOption" :key="index" :label="item.agency_name" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-form-item label="选择角色">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="item in cities" :label="item.role_id" :key="item.role_id">{{item.role_name}}</el-checkbox>
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

import { userSave,userRead,userUpdate } from '@/api/user'
import { roleIndex } from '@/api/role'
import { agencyIndex } from '@/api/agency'
export default {
    props:{
        flag:{
            type:Boolean,
            default:false,
        },
        id:{
            type:[String, Number]
        }
    },
    data() {
        return {
            form:{
                user_name:'',
                password:'',
                agency_id:'',
                role:[],
            },
            loading:false,
            checkAll: false,
            checkedCities: [],
            cities: [],
            agencyOption:[],
            isIndeterminate: true,
            rules:{
                user_name:[
                    { required:true, message:'请输入用户名称', trigger:'blur' }
                ],
                password:[
                    { required:true, message:'请输入用户密码', trigger:'blur' }
                ]
            }
        }
    },
    async created() {
        if(this.flag){
            this.loading = true;
        }
        await roleIndex().then(res => {
            if(res !== 'error') {
                console.log(res)
                this.cities = res.data.data;
            }
        })

        await agencyIndex().then(res => {
            if(res !== 'error') {
                this.agencyOption = res.data;
            }
        })

        if(this.flag){
            await userRead(this.id).then(res => {
                if(res !== 'error') {
                    console.log(res)
                    this.form = Object.assign({},res.data);
                    this.form.role = [];
                    this.checkedCities = [];
                    _(res.data.role).forEach(item => {
                        this.checkedCities.push(item.role_id)
                    })
                    console.log(this.checkedCities)
                    this.loading = false;
                }
            })
        }
    },
    mounted() {
        
    },
    methods:{
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            this.$refs.form.validate(pass => {
                if(pass) {
                    let data = Object.assign({},this.form)
                    data.role = this.checkedCities;
                    if(this.flag){
                        userUpdate(this.id,data).then(res => {
                            if(res !== 'error'){
                                _g.toastMsg('success','保存成功');
                                this.$emit('change',true)
                            }
                        })
                    }else{
                        userSave(data).then(res => {
                            if(res !== 'error'){
                                console.log(res)
                                _g.toastMsg('success','添加成功')
                                this.$emit('change',true)
                            }
                        })
                    }
                }
            })
            
        },
        handleCheckAllChange(val) {
            if(val){
                _(this.cities).forEach(item => {
                    this.checkedCities.push(item.role_id)
                })
            }else{
                this.checkedCities = [];
            }
            
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
    }
}
</script>
