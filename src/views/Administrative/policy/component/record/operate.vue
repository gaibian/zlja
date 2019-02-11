<template>
    <div>
        <el-form :model="form" ref="form" label-position="top" v-loading="loading" element-loading-text="数据加载中">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="记录属性" prop="type">
                        <el-row :gutter="10">
                            <el-col :span="12">
                                <el-select v-model="form.type" placeholder="请选择" @change="selectChange">
                                    <el-option v-for="(item,index) in typeOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-select v-model="form.record_attr" placeholder="请选择">
                                    <el-option v-for="(item,index) in attrOption" :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="开始日期">
                        <el-date-picker
                            v-model="form.start_date"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择开始日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结束日期">
                        <el-date-picker
                            v-model="form.end_date"
                            type="date"
                            style="width:100%"
                            value-format="yyyy-MM-dd"
                            clearable
                            placeholder="请选择结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="24">
                    <el-form-item label="属性内容">
                        <el-input v-model="form.content" placeholder="请输入属性内容"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="附加档案">
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
import { policyRecordSave,policyRecordRead,policyRecordUpdate } from '@/api/policy'
import { datadictIndex } from '@/api/dataDictionary'
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
                type:'',
                record_attr:'',
                content:'',
                start_date:'',
                end_date:'',
                remark:'',
                url:'',
                format:'',
                size:'',
            },
            loading:false,
            imageUrl:'',
            typeOption:[],
            attrOption:[],
            dictOption:[],
        }
    },
    computed:{
        dictionaryData() {
            return this.$store.state.appMain.dataDictionary
        }
    },
    async created() {
        if(this.flag){
            this.loading = true;
        }
        let data = {
            params:{
                currentPage:1,
                limit:1000
            }
        };
        await datadictIndex(data).then(res => {
            if(res !== 'error') {
                this.dictOption = res.data.data;
            }
        })
         this.typeOption = _g.handleSelect(this.dictionaryData.system,'RECORD_ATTR');
        if(this.flag){
            await policyRecordRead(this.id).then(res => {
                if(res !== 'error'){
                    this.form = res.data;
                    this.selectChange(this.form.type)
                    this.imageUrl = `${this.urlAds}${res.data.url}`;
                    console.log(this.imageUrl)
                    this.loading = false;
                }
            })
        }
    },
    methods:{
        selectChange(val) {
            let text = '';
            _(this.typeOption).forEach(item => {
                if(item.value == val){
                    text = item.label;
                }
            })
            _(this.dictOption).forEach(item => {
                if(item.title == text){
                    this.attrOption = _g.handleSelect(this.dictionaryData.system,item.name);
                }
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            console.log(file)
            this.form.format = file.response.data.file_info.type;
            this.form.size = file.response.data.file_info.size;
            this.form.url = file.response.data.path;
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
        handleChange() {
            this.$emit('change',false)
        },
        handleSure() {
            let data = Object.assign({},this.form)
            if(this.flag) {
                policyRecordUpdate(this.id,data).then(res => {
                    if(res !== 'error') {
                        _g.toastMsg('success','保存成功');
                        this.$emit('change',true)
                    }
                })
            }else{
                data['policy_id'] = this.$route.params.id;
                policyRecordSave(data).then(res => {
                    if(res !== 'error') {
                        console.log(res)
                        _g.toastMsg('success','添加成功');
                        this.$emit('change',true)
                    }
                })
            }
            
        },
    }
}
</script>
