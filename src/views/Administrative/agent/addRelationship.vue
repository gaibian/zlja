<template>
    <div>
        <el-form :model="form" ref="form">
            <el-row :gutter="30">
                <el-col :span="6">
                    <el-form-item label="文档类型">
                        <el-select v-model="form.file_id" placeholder="请选择文档名称" style="width:100%">
                            <el-option v-for="(item,index) in fileOption" :label="item.label" :value="item.value" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="内容(卡号)号码">
                        <el-input v-model="form.value" placeholder="请输入内容(卡号)号码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="有效期起">
                        <el-date-picker
                            v-model="form.start_time"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请输入有效期起">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="有效期止">
                        <el-date-picker
                            v-model="form.end_time"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请输入有效期止">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="24">
                    <el-form-item label="备注">
                        <el-input v-model="form.note" placeholder="请输入备注"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="24">
                    <el-form-item label="影像文档">
                        <el-upload
                        class="avatar-uploader"
                        :action="`${urlAds}admin/upload/index`"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
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
                file_id:'',
                value:'',
                start_time:'',
                end_time:'',
                files:'',
                note:''
            },
            imageUrl:'',
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    created() {
        this.fileOption = _g.handleSelect(this.dictionaryData.system,'FILE_TYPE');
    },
    methods:{
        handleChange() {
            this.$emit('change',false);
        },
        handleSure() {
            this.$emit('formChange',this.form)
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(file)
            // this.form.format = file.response.data.file_info.type;
            // this.form.size = file.response.data.file_info.size;
             this.form.file = file.response.data.path;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
    }
}
</script>
<style lang="scss" scoped>

</style>

