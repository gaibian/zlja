<template>
    <div>
        <el-form :model="form" ref="form" label-position="top" :rules="rules">
            <el-form-item label="角色名称" prop="role_name">
                <el-input v-model="form.role_name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="选择菜单">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <div class="tree-col">
                            <el-tree 
                            :data="menusData" 
                            show-checkbox 
                            node-key="id" 
                            @check-change="handleTreeChange"
                            :props="defaultProps">
                            </el-tree>    
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="tree-col">
                            <p class="p-text" :class="item.active ? 'active' : ''" v-for="(item,index) in ruleOption" :key="item.id" @click="handleClick(item,index)">{{item.name}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="tree-col">
                            <p class="p-text" :class="item.active ? 'active' : ''" v-for="item in typeOption" :key="item.type_id" @click="handleTypeClick(item)">{{item.type_name}}</p>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="tree-col">
                            <p class="p-text" :class="item.active ? 'active' : ''" v-for="(item,index) in rulesOption" :key="item.rule_id" @click="handleRuleClick(item,index)">{{item.rule_name}}</p>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="width:100%;display:block;text-align:center">
            <el-button @click="handleChange" size="small">取 消</el-button>
            <el-button type="primary" @click="handleSure" size="small">确 定</el-button>
        </span>
    </div>
</template>

<script>
import treeTable from './TreeTable'
import treeToArray from './customEval'
import { menuIndex } from '@/api/menus'
import { roleSave,roleRead } from '@/api/role'
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
    components:{
        treeTable
    },
    data() {
        return {
            form:{
                role_name:'',
                menus:[]
            },
            ruleIndex:'',
            menus:[],
            defaultProps: {
                children: 'child',
                label: 'name'
            },
            // ruleOption:[  //应该保持这样的目录结构到操作数据
            //     {
            //         name:'客户管理',
            //         typeOption:[
            //             {
            //                 name:'组织',
            //                 rulesOption:[]
            //             }
            //         ]
            //     }
            // ],
            ruleOption:[], //需要权限的菜单
            rulesOption:[],
            typeOption:[], //显示type的列表
            dialogVisible:false,
            func: treeToArray,
            args: [null, null, 'timeLine'],
            expandAll: false,
            loading:false,
            menusData:[],
            rules:{
                role_name:[
                    { required:true, message:'请输入角色名称',trigger:'blur' }
                ]
            }
        }
    },
    created() {
        this.init();
    },
    methods:{
        async init() {
            await menuIndex().then(res => {
                if(res !== 'error'){
                    this.menusData = res.data.data;
                    console.log(this.menusData)
                }
            })
            if(this.flag){
               await roleRead(this.id).then(res => {
                   if(res !== 'error'){
                       console.log(res)
                   }
                })
            }
        },
        //所有需要选择数据列表的菜单
        handleClick(item) {
            this.typeOption = [];
            this.rulesOption = [];
            _(this.ruleOption).forEach(i => {
                i.active = false;
            })
            item.active = true;
            //注意type有可能为空 => 为空的话 就表示是跟目录
            this.typeOption = item.access.type.map(value => {
                value.main_id = item.id
                return value
            });
            this.form.menus = this.menus;
        },
        handleTypeClick(item) {
            console.log(item)
            _(this.typeOption).forEach(i => {
                i.active = false;
            })
            item.active = true;
            //是需要数据权限的 数据需要整合
            this.rulesOption = item.rule.map(value => {
                value.main_id = item.main_id
                return value
            })
            this.form.menus = this.menus;
        },
        handleRuleClick(item,index) {  //点击rule
            //需要找到菜单id 插入到对应的地方
            _(this.rulesOption).forEach(i => {
                this.$set(i,'active',false)
            })
            this.$set(item,'active',true)
            _(this.menus).forEach(value => {
                if(value.id == item.main_id){
                    if(value.type_rule){
                        let flag = false;
                        _(value.type_rule).forEach(val => {
                            if(val.type_id == item.type_id){
                                val.rule_id = item.rule_id
                                flag = true
                            }
                        })
                        if(!flag){
                            value.type_rule.push({
                                type_id:item.type_id,
                                rule_id:item.rule_id,
                            })
                        }
                        // value.type_rule = {
                        //     type_id:item.type_id,
                        //     rule_id:item.rule_id,
                        // }
                    }else{
                        value['type_rule'] = [];
                        value.type_rule.push({
                            type_id:item.type_id,
                            rule_id:item.rule_id,
                        })
                    }
                    
                }
            })
            this.form.menus = this.menus
            console.log(this.form.menus)
        },
        handleTreeChange(val,flag,item) {
            console.log(val)
            console.log(flag)
            //选中一个节点之后 移入到右边
            //需要判断是否需要数据规则
            val['active'] = false;
            if(flag){
                if(val.access === null || (val.access.type && val.access.type.length === 0)){
                    this.menus.push({
                        id:val.id,
                    }) 
                    return false;
                }
                this.menus.push({
                    id:val.id
                })
                
                this.ruleOption.push(val)
                
            }else{  //需要删除掉选择的菜单
                let index = this.ruleOption.indexOf(val)
                let indexId = '';
                _(this.menus).forEach((item,index) => {
                    if(item.id == val.id){
                        indexId = index;
                    }
                })
   
                if(index > -1){
                    this.ruleOption.splice(index,1)
                }
                if(indexId > -1){
                    this.menus.splice(indexId,1)
                }
                
            }
            console.log(this.menus)
            this.form.menus = this.menus;

        },
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            this.$refs.form.validate(pass => {
                if(pass){
                    if(this.flag) {  //更新数据

                    }else{
                        roleSave(this.form).then(res => {
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
        selectVal(val) {
            console.log(val)
        },
        handleClose() {
            this.dialogVisible = false;
        },
 
    }
}
</script>
<style lang="scss" scoped>
.tree-col{
    padding:15px 10px;
    box-sizing:border-box;
    border:1px solid #dcdfe6;
    height:400px
}
.p-text{
    margin:0;
    padding:0;
    cursor: pointer;
}
.active{
    color:#409EFF
}
</style>

