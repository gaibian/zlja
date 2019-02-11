<template>
<div>
    <div class="data-add-popup">
        <el-form ref="form" :model="dataForm" v-loading="loading" element-loading-text="数据加载中">
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="标题">
                        <el-input v-model="dataForm.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="名称">
                        <el-input v-model="dataForm.name" placeholder="请输入名称"></el-input>
                    </el-form-item>        
                </el-col>
            </el-row>
            <el-form-item label="配置值">
                <el-input style="height:200px" type="textarea" v-model="dataForm.value" placeholder="请输入配置值"></el-input>
            </el-form-item>
        </el-form>
    </div>
    <span slot="footer" class="dialog-footer" style="width:100%;display:block;text-align:center">
        <el-button @click="handleChange" size="small">取 消</el-button>
        <el-button type="primary" @click="handleSure" size="small">确 定</el-button>
    </span>
</div>
</template>
<script>
import { datadictSave,datadictUpdate,datadictRead } from '@/api/dataDictionary'
export default {
    name:'dataDictionaryOperate',
    props:{
        flag:{
            type: Boolean,
            default: false
        },
        id:{
            type:[String, Number]
        }
    },
    data() {
        return {
            dataForm:{
                title:'',
                name:'',
                value:'',
            },
            loading:false,
        }
    },
    created() {
        this.init();
        console.log(this.flag)
    },
    methods:{
        init() {
            if(this.flag){ //查看
                this.loading = true;
                datadictRead(this.id).then(res => {
                    if(res != 'error'){
                        console.log(res)
                        this.dataForm.title = res.data.title
                        this.dataForm.name = res.data.name
                        this.dataForm.value = res.data.value[0]
                        this.loading = false;
                    }
                })
            }
        },
        handleSure() {
            if(this.flag){ //查看
            let data = Object.assign({},this.dataForm)
            data['id'] = this.id;
            datadictUpdate(this.id,data).then(res => {
                if(res !== 'error'){
                    _g.toastMsg('success','修改成功')
                    this.$emit('change',true)
                }
            })
            }else{ //添加
                let data = Object.assign({},this.dataForm)
                datadictSave(data).then(res => {
                    _g.toastMsg('success','添加成功')
                    this.$emit('change',true)
                })
            }
        },
        handleChange() {
            this.$emit('change',false)
        }
    }
}
</script>
