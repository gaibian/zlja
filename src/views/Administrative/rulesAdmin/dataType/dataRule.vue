<template>
    <div>
        <el-table :data="tableData" border style="margin-bottom:20px" :maxHeight="260" v-loading="loading" element-loading-text="数据加载中">
            <el-table-column label="数据规则标题" prop="rule_title">
                <template slot-scope="scope">
                    <span v-if="scope.row.flag">{{scope.row.rule_title}}</span>
                    <el-input v-else v-model="scope.row.rule_title"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="数据规则名称" prop="rule_name">
                <template slot-scope="scope">
                    <span v-if="scope.row.flag">{{scope.row.rule_name}}</span>
                    <el-input v-else v-model="scope.row.rule_name"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" :width="width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" v-if="!btnFlag" @click="handleModify(scope)">修改</el-button>
                    <span v-else>
                        <el-button type="primary" size="mini" @click="handleCancel(scope)">取消</el-button>
                        <el-button type="primary" size="mini" @click="handleModifySave(scope)">保存</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <el-form :model="form" ref="form" :rules="rules" v-show="formFlag" style="margin-top:20px">
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="数据规则标题" prop="rule_title">
                        <el-input v-model="form.rule_title" placeholder="请输入数据规则标题"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="数据规则名称" prop="rule_name">
                        <el-input v-model="form.rule_name" placeholder="请输入数据规则名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer" style="display:block;text-align:right">
            <!-- <el-button @click="handleChange" size="mini" v-if="formFlag">取 消</el-button>
            <el-button type="primary" @click="handleSure" size="mini" v-if="formFlag">确 定</el-button> -->
            <el-button size="mini" @click="handleClosePopup">关闭窗口</el-button>
            <el-button type="primary" size="mini" @click="handleAdd" v-if="!formFlag">添加数据规则</el-button>
            <el-button type="primary" size="mini" @click="handleSave" v-if="formFlag">保存</el-button>
        </span>
    </div>
</template>
<script>
import { setDataRule,dataTypeDetails } from '@/api/rules'
export default {
    name:'setDataRule',
    props:{
        flag:{
            type:Boolean,
            default:false
        },
        id:{
            type:[String, Number]
        }
    },
    watch:{
        id() {
            console.log('id变化了')
            this.init()
        }
    },
    data() {
        return {
            tableData:[],
            loading:false,
            formFlag:false,
            btnFlag:false,
            width:80,
            form:{
                rule_title:'',
                rule_name:'',
                type_id:'',
            },
            rules:{
               rule_title:[
                   { required:true, message:'请输入数据规则标题', trigger:'blur' }
               ],
               rule_name:[
                   { required:true, message:'请输入数据规则名称', trigger:'blur' }
               ]
            }
        }
    },
    created() {
        this.form.type_id = this.id;
        this.init();
    },
    methods:{
        init() {
            if(this.flag){
                console.log('sss')
                this.loading = true;
                dataTypeDetails(this.id).then(res => {
                    if(res !== 'error'){
                        console.log(res)
                        this.tableData = res.data.rule.map(item => {
                            item.flag = true;
                            return item
                        })
                        this.loading = false;
                    }
                })
            }
            
        },
        handleAdd() {
            this.formFlag = true;
        },
        handleModify(scope) {
            console.log(scope)
            this.width = 150;
            scope.row.flag = false;
            this.btnFlag = !this.btnFlag
            
        },
        handleCancel(scope) {
            this.width = 80;
            this.btnFlag = !this.btnFlag
        },
        handleClosePopup() {
            this.$emit('change',false)
        },
        handleModifySave(scope) {
            console.log(scope)
            let data = {
                rule_id:scope.row.rule_id,
                rule_title:scope.row.rule_title,
                rule_name:scope.row.rule_name,
                type_id:scope.row.type_id,
            }
            setDataRule(data).then(res => {
                if(res !== 'error'){
                    console.log('jinlailesss')
                    console.log(res)
                    _g.toastMsg('success','修改成功')
                    this.init();
                    this.width = 80;
                    this.btnFlag = !this.btnFlag
                }
            })
            
        },
        handleSave() {
            let data = Object.assign({},this.form)
            setDataRule(data).then(res => {
                if(res !== 'error'){
                    _g.toastMsg('success','添加成功')
                    this.init()
                    //this.$emit('change',true)
                }
            })
            
        },
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            
        }
    }
}
</script>
