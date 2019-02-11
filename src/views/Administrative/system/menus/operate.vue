<template>
    <div>
        <el-form :model="form" ref="form">
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.name" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="app">
                        <el-input v-model="form.app" placeholder="请输入app"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="controller">
                        <el-input v-model="form.controller" placeholder="请输入controller"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="action">
                        <el-input v-model="form.action" placeholder="请输入action"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
export default {
    props:{
        flag:{
            type:Boolean,
            default: false
        },
        id:{
            type:[String, Number]
        }
    },
    data() {
        return {
            form:{
                name:'',
                app:'',
                controller:'',
                action:'',
            }
        }
    }
}
</script>

