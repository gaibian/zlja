<template>
    <div>
        <el-form :model="form" ref="form" label-position="top" :rules="rules" v-loading="loading" element-loading-text="数据加载中">
            <el-form-item label="角色名称" prop="role_name">
                <el-input v-model="form.role_name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色权限">
                <el-row :gutter="20">
                    <el-col :span="6" class="col-height">
                        <div class="col-title">操作权限</div>
                        <div class="tree-col">
                            <el-tree 
                            v-if="menusFlag"
                            :data="menusData" 
                            show-checkbox 
                            node-key="id"
                            default-expand-all
                            :default-expanded-keys="expandedKeys"
                            :default-checked-keys="checkedKeys" 
                            @check="checkClick"
                            :props="defaultProps">
                            </el-tree>    
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="col-title">数据权限</div>
                        <div class="tree-col" style="position:relative">
                            <div class="p-text" v-for="(item,index) in ruleOption" :key="item.id" @click="handleClick(item,index)">
                                <!--有数据权限的菜单-->
                                <!-- <i class="i-bg" v-show="item.checkFlag"></i> -->
                                    <span v-if="item.checkFlag" style="color:#409EFF">
                                        {{item.name}}
                                    </span>
                                    <span v-else>
                                        {{item.name}}
                                    </span>
                                <div class="pos-type" v-show="type_id == item.access_id">
                                    <div v-for="(type,index) in item.access.type" :key="type.id" @click="handleType(type,index,item)">
                                        <span v-if="type.checkFlag" style="color:#409EFF">
                                            {{type.type_name}}
                                        </span>
                                        <span v-else>
                                            {{type.type_name}}
                                        </span>
                                        
                                        <div class="pos-rule" v-show="ruleIndex == index">
                                            <div v-for="(rule) in type.rule" :key="rule.rule_id" @click="handleRule(rule,type)">
                                                <span v-if="rule.checkFlag" style="color:#409EFF">
                                                    {{rule.rule_name}}
                                                </span>
                                                <span v-else>
                                                    {{rule.rule_name}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="width:100%;display:block;text-align:right">
            <el-button @click="handleChange" size="mini">取 消</el-button>
            <el-button type="primary" @click="handleSure" size="mini">确 定</el-button>
        </span>
    </div>
</template>

<script>
import treeTable from './TreeTable'
import treeToArray from './customEval'
import { menuIndex } from '@/api/menus'
import { roleSave,roleRead,roleUpdate } from '@/api/role'
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
            loading:false,
            expandedKeys:[],
            checkedKeys:[],
            ruleIndex:'',
            menusFlag:true,
            typeIndex:'',
            menus:[],
            type_id:'',
            defaultProps: {
                children: 'child',
                label: 'name'
            },
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
    watch:{
       ruleOption() {
           _(this.ruleOption).forEach((item,index) => {
               if(index == 0){
                   this.$set(item,'checkFlag',true)
                   this.type_id = item.access_id;
               }
               _(item.access.type).forEach((type,typeIndex) => {
                   if(typeIndex == 0){
                       this.$set(type,'checkFlag',true)
                   }
               })
           })
       },
       menus() {
           console.log(this.menus)
       }
    },
    methods:{
        async init() {
            if(this.flag) {
                this.loading = true;
            }
            await menuIndex().then(res => {
                if(res !== 'error'){
                    this.menusData = res.data.data;
                }
            })
            if(this.flag){
                this.menusFlag = false;
                this.form.menus = [];
                this.menus = [];
               await roleRead(this.id).then(res => {
                   if(res !== 'error'){
                        this.form.role_name = res.data.role_name;
                        _(res.data.access).forEach(item => {
                            let id = Number(item.menu_id);
                            if(this.isMenus(id)){
                                this.checkedKeys.push(Number(item.menu_id))  //把所有menus有child值的都过滤掉
                            }
                            //ruleOption的数据进行过滤
                            if(item.type_rule === null) {
                                this.menus.push(item.menu_id)
                            }else{
                                let fun = (data) => {
                                    for(let menus of data){
                                        if(menus.id == Number(item.menu_id)){
                                            this.$set(menus,'checkFlag',false);
                                            for(let i of menus.access.type){
                                                this.$set(i,'checkFlag',false)
                                                for(let r of i.rule){  //rule的checkFlag 是需要根据后端返回的值显示
                                                    for(let k of item.type_rule){
                                                        if(r.type_id == k.type_id && r.rule_id == k.rule_id){
                                                            this.$set(r,'checkFlag',true)
                                                            break;
                                                        }else{
                                                            this.$set(r,'checkFlag',false)
                                                        }
                                                    }
                                                }
                                            }
                                            this.ruleOption.push(menus)
                                            break;
                                        }else{
                                            if(menus.child && menus.child.length > 0) {
                                                fun(menus.child)
                                            }
                                        }
                                    }
                                }
                                fun(this.menusData)

                            }
                        })
                        this.menusFlag = true;
                        this.loading = false;
                   }
                })
            }
        },
        isMenus(id) {
            let flag = false;
            let fun = (data) => {
                for(let menus of data){
                    if(menus.id == id){
                        if(menus.child && menus.child.length > 0){
                            flag = false;
                        }else{
                            flag = true;
                        }
                        break;
                    }else{
                        if(menus.child && menus.child.length > 0) {
                            fun(menus.child)
                        }
                    }
                }
            }
            fun(this.menusData)
            return flag
        },
        handleRule(rule,type) {
            for(let i of type.rule){
                this.$set(i,'checkFlag',false)
            }
             this.$set(rule,'checkFlag',true)
        },
        handleType(type,index,item){
            this.ruleIndex = index
            for(let i of item.access.type){
                this.$set(i,'checkFlag',false)
            }
            this.$set(type,'checkFlag',true)
        },
        //所有需要选择数据列表的菜单
        handleClick(item,index) {
            
            this.type_id = item.access_id
            for(let i of this.ruleOption){
                this.$set(i,'checkFlag',false)
            }
            this.$set(item,'checkFlag',true)
        },
        checkClick(val,item) {
            //还需要判断是否是选择还是取消
            console.log(item)
            let nodesArr = item.halfCheckedNodes.concat(item.checkedNodes)
            let checkedArr = item.halfCheckedKeys.concat(item.checkedKeys)
            console.log(checkedArr)
            if(this.ruleOption && this.ruleOption.length == 0){
                for(let half of nodesArr){
                    if(half.access && half.access.type && half.access.type.length != 0){
                        this.$set(half,'checkFlag',false)
                        for(let i of half.access.type){
                            this.$set(i,'checkFlag',false)
                            for(let r of i.rule){
                                this.$set(r,'checkFlag',false)
                            }
                        }
                        this.ruleOption.push(half)
                    }else{
                        this.menus.push(half.id)
                    }
                }
            }else{
                for(let half of nodesArr){  // 存在数组里的都是还选中的
                    if(half.access && half.access.type && half.access.type.length != 0){
                        //还是需要判断是否是存在
                        let id = half.id;
                        let flag = true;
                        for(let rule of this.ruleOption){
                            if(rule.id == id){  //没有的 需要添加进去
                                flag = false;
                                break;
                            }
                        }
                        if(flag){  //需要添加进去
                            this.$set(half,'checkFlag',false)
                            for(let i of half.access.type){
                                this.$set(i,'checkFlag',false)
                                for(let r of i.rule){
                                    this.$set(r,'checkFlag',false)
                                }
                            }
                            this.ruleOption.push(half);
                        }
                    }else{
                        let id = half.id;
                        let flag = true;
                        if(!this.menus.includes(id)){
                            this.menus.push(id)
                        }
                    }
                }

                this.ruleOption = this.ruleOption.filter(rule => {
                    let id = rule.id;
                    if(!checkedArr.includes(id)){
                        //删除掉
                        return false
                    }else{
                        return true
                    }

                })

                this.menus = this.menus.filter(menus => {
                    let id = menus;
                    if(!checkedArr.includes(id)){
                    }else{
                        return true
                    }
                })
            }
        },
 
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            this.form.menus = [];
            _(this.menus).forEach(menus => {
                this.form.menus.push({
                    id:menus
                });
            })
            _(this.ruleOption).forEach(rule => {
                let id = rule.id;
                let index = rule.id
                this.form.menus.push({
                    id:rule.id,
                    type_rule:[]
                })
                _(rule.access.type).forEach(i => {
                    for(let k of i.rule){
                        if(k.checkFlag){
                            _(this.form.menus).forEach(menus => {
                                if(menus.id == index){
                                    menus.type_rule.push({
                                        type_id:k.type_id,
                                        rule_id:k.rule_id
                                    })
                                }
                            })
                        }
                    }
                })
            })
            this.$refs.form.validate(pass => {
                if(pass){
                    if(this.flag) {  //更新数据
                        roleUpdate(this.id,this.form).then(res => {
                            if(res !== 'error'){
                                _g.toastMsg('success','保存成功')
                                this.$emit('change',true)
                            }
                        })
                    }else{
                        roleSave(this.form).then(res => {
                            if(res !== 'error'){
                                _g.toastMsg('success','添加成功')
                                this.$emit('change',true)
                            }
                        })
                    }
                }
            })
        },
        handleClose() {
            this.dialogVisible = false;
        },
    }
}
</script>
<style lang="scss" scoped>
.tree-col{
    overflow-y:auto;
    overflow-x:auto;
    padding:15px 10px;
    box-sizing:border-box;
    border:1px solid #dcdfe6;
    height:350px
}
.i-bg{
    display:inline-block;
    width:2px;
    height:6px;
    background:red;
}
.item-border{
    border-right:1px solid red;
}
.pos-type{
    padding:15px 10px;
    box-sizing:border-box;
    width:33.33%;
    height:100%;
    //overflow-y:auto;
    border-left:1px solid #dcdfe6;
    border-right:1px solid #dcdfe6;
    position:absolute;
    top:0;
    left:33.33%;
}
.pos-rule{
    padding:15px 10px;
    box-sizing:border-box;
    position:absolute;
    top:0;
    left:100%;
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

