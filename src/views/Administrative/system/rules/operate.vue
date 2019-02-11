<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules">
            <el-form-item label="名称" prop="access_name">
                <el-input v-model="form.access_name" placeholder="请输入显示名"></el-input>
            </el-form-item>
            <el-form-item label="app" prop="app">
                <el-input v-model="form.app" placeholder="请输入权限名称"></el-input>
            </el-form-item>
            <el-form-item label="controller" prop="controller">
                <el-input v-model="form.controller" placeholder="请输入权限名称"></el-input>
            </el-form-item>
            <el-form-item label="action" prop="action">
                <el-input v-model="form.action" placeholder="请输入权限名称"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="width:100%;display:block;text-align:center">
            <el-button @click="handleChange" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSure" size="small">确 定</el-button>
        </span>
    </div>
</template>
<script>
import { setRules } from '@/api/rules'
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
            },
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
                ]
            }
        }
    },
    created() {

    },
    methods:{
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            let data = Object.assign({},this.form)
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
</script>
