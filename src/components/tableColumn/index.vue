<template>
    <div>
        <!--对于表格的排序 需要进行另外的封装-->
        
        <el-table-column v-for="(item,index) in data" :key="index" :label="item.label" v-bind="$attrs" :prop="handleProp(item)">
            <template slot-scope="scope">
            <!--有时候显示内容需要进行判断-->
            <div v-html="handleRenderDom(scope,item)"></div>
            </template>
        </el-table-column>
    </div>
</template>
<script>
export default {
    name:'tableColumn',
    props:{
        data:{
            type:[Array, Object],
            required: true
        },
        doc:{
            type:String,
            default:''
        },
        domMethods:{
            type: Function,
        }
    },
    mounted() {

    },
    methods: {
        handleProp(item) {
            let field = item.field.split(' ');
            //console.log(field[0]);
            if(field && field.length >= 1){
                return field[0]
            }else{
                console.error('表头数据不存在')
            }

        },
        handleRenderDom(scope,item) {
            let field = item.field.split(' ');
            let doc = '';
            if(field && field.length == 1){
                doc = `<div class="div">${scope.row[field[0]]}</div>`
            }
            //循环了多次之后的结果
    
            if(field && field.length >= 2){  //需要组装html
         
                let newField = {};
                _(field).forEach(value => {
                    newField[value] = value;
                })
                const data = {
                    scope: scope,
                    field: newField,
                    item:item
                }
                doc = this.domMethods(data)
            }
            return doc
        },
    }
}
</script>
<style lang="scss" scoped>

</style>


