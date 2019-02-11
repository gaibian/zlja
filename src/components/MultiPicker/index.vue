<template>
    <div class="multi-picker">
        <el-popover placement="bottom-start" :width="width" trigger="click" v-model="popoverFlag">
            <!--多选-->
            <el-tree v-if="checkBoxFlag" style="maxHeight:300px;overflow-y:auto" 
            node-key="id" 
            show-checkbox 
            :data="options" 
            :props="defaultProps"
            v-model="treeV"
             
             @check-change="checkChange1"  
            ref="tree"></el-tree>
            <!--单选-->
            <el-tree v-else style="maxHeight:300px;overflow-y:auto" 
            node-key="id" 
            show-checkbox 
            :check-strictly="true" 
            @check-change="checkChange" 
            accordion 
            v-bind="$attrs"
            :data="options" 
            :props="defaultProps" 
            @node-click="handleNodeClick" 
            ref="tree"></el-tree>
            <el-row type="flex" style="margin-top:12px;padding:12px 0;" align="middle" justify="end">
                <el-button type="primary" size="mini" @click="handleSure">确定</el-button>
                <el-button type="primary" size="mini" @click="handleCancel">取消</el-button>
            </el-row>
            <el-button v-bind="$attrs" :class="btnFlag ? 'activeBtn' : 'btn'" slot="reference">{{treeVal}}</el-button>
        </el-popover>
    </div>
</template>
<script>
export default {
    name: 'multiPicker',
    props: {
        options: {  //下拉参数
            type: Array,
            required: true,
            default() {
                return []
            }
        },
        checkBoxFlag: {
            type:[String, Boolean],
            default: false,
        },
        treeVal: {  //显示的默认值
            type: String,
            required: true,
            default: '',
        },
        id:{
            type:[String, Number]
        },
        width: {
            default: 360  //显示的宽度
        },
        defaultProps: {
            type: Object,
            default() {
                return {
                    children: 'children',
                    label: 'label'
                }
            }
        }
    },
    data() {
        return {
            popoverFlag:false,
            editCheckId:'',
            nodeArr: [],
            nodeDom: [],
            treeV:[],
            manyItem:[],
        }
    },
    watch:{
        id() {
            this.$refs.tree.setCheckedKeys([this.id])
        }
    },
    mounted() {
        console.log(this.id)
        this.$refs.tree.setCheckedKeys([this.id])
    },
    computed: {
        btnFlag: {
            get(){
                if(this.treeVal.indexOf('请输入') === -1 && this.treeVal.indexOf('请填写') === -1 && this.treeVal.indexOf('请选择') === -1){
                    return this.btnFlag = true;
                }else {
                    return this.btnFlag = false;
                }
            },
            set(newVal) {
                
            }
            
        }
    },
    methods: {
        handleSure() {
            //确定
            //分单选和多选
            if(!this.checkBoxFlag){  //单选
                this.$emit('treeClick',this.treeData)
                this.btnFlag = true;
                this.popoverFlag = false;
            }else{
                let data = {
                    id:this.$refs.tree.getCheckedKeys().toString(),
                    item: this.manyItem[this.manyItem.length - 1],
                }
                this.$emit('treeClick',data)
                this.btnFlag = true;
                this.popoverFlag = false;
            }
        },
        handleCancel() {
            //取消
            this.popoverFlag = false;
        },
        checkChange(item,node,self) {
            if(node == true){
                this.editCheckId = item.id;
                this.treeData = item;
                this.$refs.tree.setCheckedKeys([item.id])
            }else{
                if(this.editCheckId == item.id){
                    this.$refs.tree.setCheckedKeys([item.id])
                }
            }
        },
        handleNodeClick(item,node,self) {
            this.editCheckId = item.id;
            this.treeData = item;
            this.$refs.tree.setCheckedKeys([item.id])
            this.treeData = node
        },
        checkChange1(item,node,self) {
            console.log(item)
            if(node == true){
                this.treeData = item;
                this.manyItem.push(item)
            }else{
                //取上一个name
    
                
                _(this.manyItem).forEach( (value,index) => {
                    if(value.id == item.id){
                        this.$delete(this.manyItem,index);
                        return false;
                    }
                })
       
                
            }
        },
        handleNodeClick1(item,node,self) {
            // this.editCheckId = item.id;
            this.treeData = item;
            if(node.checked == true){  //表示已经选中了
                //需要看有没有children
                if(item.children && item.children.length > 0){
                    _(item.children).forEach((value,index) => {
                        
                    })
                }else{
                    let indexArr = 0;
                    _(this.nodeArr).forEach((value,index) => {
                        if(value == item.id){
                            indexArr = index;
                        }
                    });
                    // this.nodeArr.splice(indexArr, 1);
                    this.$delete(this.nodeArr,indexArr);
                    console.log(this.nodeArr)
                    let arr = this.nodeArr.concat();
                    this.$refs.tree.setCheckedKeys(arr)
                }
            }else{   //没有选中
                if(item.children && item.children.length > 0){
                    this.nodeArr.push(item.id)
                    _(item.children).forEach((value,index) => {
                        this.nodeArr.push(value.id)
                    })
                }else{
                    this.nodeArr.push(item.id)
                }
                
            }
            this.$refs.tree.setCheckedKeys(this.nodeArr)
        }
    }
}
</script>
<style lang="scss" scoped>
.activeBtn{
    width:100%;
    text-align: left;
    padding-left:15px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    color:#606266;
}
.btn{
    width:100%;
    text-align: left;
    padding-left:15px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    color:#C0C4CC;
}
</style>


