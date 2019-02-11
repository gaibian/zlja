<template>
    <div>
        <el-form :model="form" ref="form">
            <el-row :gutter="30">
                <el-col :span="6">
                    <el-form-item label="亲属名称">
                        <el-input v-model="form.realname" placeholder="请输入亲属名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="性别">
                        <el-select v-model="form.sex" placeholder="请选择性别">
                            <el-option v-for="(item,index) in sexOption" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="联系电话">
                        <el-input v-model="form.mobile" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="出生日期">
                        <el-date-picker
                            v-model="form.birthday"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请输入出生日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="6">
                    <el-form-item label="身份证号">
                        <el-input v-model="form.id_code" placeholder="请输入身份证号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="存在关系">
                        <el-select v-model="form.ship" placeholder="请选择存在关系">
                            <el-option v-for="(item,index) in shipOption" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
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
export default {
    name:'addRelationship',
    props:['sexOption','shipOption'],
    data() {
        return {
            form:{
                realname:'',
                sex:'',
                mobile:'',
                birthday:'',
                id_code:'',
                ship:''
            },
        }
    },
    created() {

    },
    methods:{
        handleChange() {
            this.$emit('change',false);
        },
        handleSure() {
            this.$emit('formChange',this.form)
        },
    }
}
</script>
<style lang="scss" scoped>

</style>

