<template>
    <div>
        <el-button type="primary" size="small" @click="dialogVisible = true">页面配置</el-button>
        <el-dialog ref="dialog" v-el-drag-dialog width="400px" title="页面配置" :visible.sync="dialogVisible" :before-close="handleClose">
            <div class="table-box">

                <el-table :data="newTableData" border :maxHeight="400">
                    <el-table-column label="序号" type="index" width="50"></el-table-column>
                    <el-table-column label="列名称" prop="label"></el-table-column>
                    <el-table-column label="是否显示">
                        <template slot-scope="scope">
                            <span>
                                <el-button size="small" @click="handleClick(scope)" :type="scope.row.flag ? 'primary' : 'default'">{{scope.row.flag ? '已显示' : '未显示'}}</el-button>
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-row type="flex" align="center" justify="end" style="margin-top:20px">
                <el-button type="success" size="small" @click="handleInit">恢复默认设置</el-button>
                <el-button type="primary" size="small" @click="handleSave">保存</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import elDragDialog from "@/directive/el-dragDialog";
export default {
    name:'pageConfig',
    directives: { elDragDialog },
    props:{
        data: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            dialogVisible:false,
            newTableData:[],
        }
    },
    created() {
        this.newTableData = JSON.parse(JSON.stringify(this.data))
    },
    
    methods:{
        handleClick(item) {
            item.row.flag = !item.row.flag;
        },
        handleInit() {
            _(this.newTableData).forEach(item => {
                item.flag = true;
            })
        },
        handleSave() {
            let data = JSON.parse(JSON.stringify(this.newTableData));
            this.$emit('change',data);
            this.$refs.dialog.close();
            this.dialogVisible = false;
        },
        
        //关闭弹窗
        handleClose() {
            this.$refs.dialog.close();
            this.dialogVisible = false;
        },
        
    }
}
</script>
<style lang="scss" scoped>
.table-box{
    width:100%;
}
</style>


