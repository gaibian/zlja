<template>
    <div>
        <el-form :model="form" ref="form" :rules="rules" v-loading="loading" element-loading-text="数据加载中">
            <el-form-item label="数据权限-数据类型" prop="type_name">
                <el-input v-model="form.type_name" placeholder="请输入数据权限-数据类型"></el-input>
            </el-form-item>
            <el-form-item label="数据权限对应模型" prop="type_model">
                <el-input v-model="form.type_model" placeholder="请输入数据权限对应模型"></el-input>
            </el-form-item>
            <el-form-item label="数据权限模型对应字段" prop="type_field">
                <el-input v-model="form.type_field" placeholder="请输入数据权限模型对应字段"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="width:100%;display:block;text-align:center">
            <el-button @click="handleChange" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSure" size="small">确 定</el-button>
        </span>
    </div>
</template>
<script>
import { setDataType,dataTypeDetails,setAutoData } from '@/api/rules'
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
                type_name:'',
                type_model:'',
                type_field:'',
            },
            loading:false,
            rules:{
                type_name:[
                    { required:true, message:'请输入数据权限-数据类型', trigger:'blur' }
                ],
                type_model:[
                    { required:true, message:'请输入数据权限对应模型', trigger:'blur' }
                ],
                type_field:[
                    { required:true, message:'请输入数据权限模型对应字段', trigger:'blur' }
                ]
            }
        }
    },
    created() {
        if(this.flag){
            this.loading = true;
            dataTypeDetails(this.id).then(res => {
                if(res !== 'error'){
                    this.form.type_name = res.data.type_name;
                    this.form.type_model = res.data.type_model;
                    this.form.type_field = res.data.type_field;
                    this.loading = false;
                }
            })
        }
    },
    methods:{
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            let data = Object.assign({},this.form)
            if(this.flag){
                data['id'] = this.id
            }
            console.log(data)
            setAutoData(data).then(res => {
                if(res !== 'error'){
                    _g.toastMsg('success','添加成功')
                    this.$emit('change',true)
                }
            })
            
            
        }
    }
}
</script>
