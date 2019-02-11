<template>
    <div>
        <el-form :model="form" ref="form" label-position="top" :rules="rules" v-loading="loading">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="父级菜单">
                        <multi-picker :options="options" :width="300" :defaultProps="defaultProps" v-if="treeFlag" :id="treeValId" :treeVal="treeVal" @treeClick="handleNodeClick"></multi-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="菜单名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="菜单类型" prop="type">
                        <el-select v-model="form.type" style="width:100%" placeholder="请选择类型" @change="handleMenuChange">
                            <el-option v-for="(item,index) in typeOption" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30" v-if="ruleFlag">
                <el-col :span="24">
                    <el-form-item label="权限节点">
                        <el-row :gutter="30">
                            <el-col :span="8">
                                <el-form-item label="模块" prop="app">
                                    <el-select v-model="form.app" placeholder="请选择模块" @change="handleAppChange" style="width:100%">
                                        <el-option v-for="(item,index) in appOption" :key="index" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="控制器" prop="controller">
                                    <el-select v-model="form.controller" placeholder="请选择控制器" @change="handleControllerChange" style="width:100%">
                                        <el-option v-for="(item,index) in controllerOption" :key="index" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="操作" prop="action">
                                    <el-select v-model="action" placeholder="请选择操作" @change="handleActionChange" style="width:100%">
                                        <el-option v-for="(item,index) in actionOption" :key="index" :label="item.label" :value="item.label"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
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
import { rulesNodeList,rulesMenuSave,rulesMenuRead,rulesMenuUpdate } from '@/api/rulesAdmin'
import { menuIndex } from '@/api/menus'
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
                parent_id:0,
                name:'',
                app:'',
                controller:'',
                action:'',
                access_id:'',
                type:'',
            },
            loading:false,
            treeFlag:true,
            treeValId:'',
            options: [{ id:0, name: '顶级菜单' }],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            treeVal:'请选择上级菜单',
            rules:{
                app:[
                    { required: true, message:'请选择模块',trigger:'change' }
                ],
                controller:[
                    { required: true, message:'请选择控制器',trigger:'change' }
                ],
                action:[
                    { required: true, message:'请选择操作',trigger:'change' }
                ],
                type:[
                    { required: true, message:'请选择菜单类型',trigger:'change' }
                ],
                name:[
                    { required: true, message:'请输入菜单名称',trigger:'blur' }
                ]
            },
            ruleFlag:false,
            app:'',
            controller:'',
            action:'',
            appOption:[],
            controllerOption:[],
            actionOption:[],
            typeOption:[{
                label:'普通菜单',
                value:1
            },{
                label:'页面菜单',
                value:2
            },{
                label:'操作菜单',
                value:3
            }],
            menuOption:[],
            nodeList:[],
        }
    },
    async created() {
        if(this.flag){
            this.loading = true;
        }
        await menuIndex().then(res => {
            if(res !== 'error'){
                 
                _(res.data.data).forEach(item => {
                    this.options.push(item);
                })
            }
        })
        await rulesNodeList().then(res => {
            if(res !== 'error') {
                console.log(res)
                this.nodeList = res.data.data.nodes;
                this.appOption = [];
                _(this.nodeList).forEach(item => {
                    this.appOption.push({
                        label:item.name
                    })
                })
            }
        })
        if(this.flag){
            await rulesMenuRead(this.id).then(res => {
                if(res !== 'error') {
                    this.form = res.data;
                    this.treeValId = res.data.parent_id;
                    //this.treeVal = res.data.name;
                    if(this.form.type == 2 || this.form.type == 3){
                        this.ruleFlag = true;
                        this.action = this.form.action;
                    }else{
                        this.ruleFlag = false;
                    }
             
                }
                this.loading = false;
            })
        }
        
        if(this.form.type == 1) {
            this.ruleFlag = false;
        }
    },
    methods:{
        handleNodeClick(data) {
            console.log(data);
            this.treeVal = data.name;
            this.form.parent_id = data.id;
        },
        handleAppChange(val) {
            this.controllerOption = [];
            this.actionOption = [];
            this.form.controller = '';
            this.action = '';
            _(this.nodeList).forEach(item => {
                if(item.name == val) {
                    _(item.child).forEach(value => {
                        this.controllerOption.push({
                            label:value.name,
                            child:value.child
                        })
                    })
                }
            })
        },
        handleControllerChange(val) {
            this.actionOption = [];
            this.action = '';
            _(this.controllerOption).forEach(item => {
                if(item.label == val){
                    _(item.child).forEach(value => {
                        this.actionOption.push({
                            label:value.name,
                            id:value.access_id
                        })
                    })
                }
            })
            console.log(this.actionOption)
        },
        handleActionChange(val) {
            this.form.action = val;
            _(this.actionOption).forEach(item => {
                if(item.label == val){
                    this.form.access_id = item.id
                }
            })
        },
        handleMenuChange(val) {
            if(val == 2 || val == 3) {
                this.ruleFlag = true;
            }else{
                this.ruleFlag = false;
            }
        },
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {

            if(this.form.type == 1) {
                this.form.app = '';
                this.form.controller = '';
                this.form.action = '';
            }

            this.$refs.form.validate(pass => {
                if(pass){
                    if(this.flag){
                        rulesMenuUpdate(this.id,this.form).then(res => {
                            if(res !== 'error'){
                                _g.toastMsg('success','保存成功');
                                this.$emit('change',true)
                            }
                        })
                    }else{
                        rulesMenuSave(this.form).then( res => {
                            if(res !== 'error'){
                                console.log(res)
                                _g.toastMsg('success','添加成功')
                                this.$emit('change',true)
                            }
                        })
                    }
                }
            })
            
        }
    }
}
</script>
