<template>
    <el-select
        v-model="company_id"
        filterable
        remote
        reserve-keyword
        clearable
        v-bind="$attrs"
        @change="handleChange"
        style="width:100%"
        :loading-text="loadingText"
        :placeholder="placeholder"
        :remote-method="remoteMethod"
        :disabled="disabled"
        :loading="loading">
        <el-option
            v-for="item in options4"
            :key="item.id"
            :label="item.company_name"
            :value="item.id"
        ></el-option>
    </el-select>
</template>
<script>
import request from "@/utils/request";
export default {
    name:'companyInput',
    props:{
        placeholder:{
            type:String,
            default:'请输入保险公司查询'
        },
        label:{
            type:String,
            default:'company_name'
        },
        value:{
            type:[String,Number],
            default:''
        },
        url:{
            type:String,
            required:true,
        },
        data: {
            type:Object,
            default() {
                return {}
            }
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            loadingText:'无数据',
            loading: true,
            options4:[],
            company_id:'',
        }
    },
    watch:{
        value(value) {
            this.company_id = value;
        },
        data:{
            handler(curVal,oldVal) {
                if(curVal.company_name !== '' && curVal.id !== ''){
                    this.options4 = [];
                    this.options4.push({
                        company_name: curVal.company_name,
                        id: curVal.id
                    })
                    
                }
            },
            deep:true,
        }
    },

    created() {
        console.log(this.value)
        if(this.data.company_name !== '' && this.data.id !== ''){
            this.options4 = [];
            console.log(this.options4)
            this.options4.push({
                company_name: this.data.company_name,
                id: this.data.id
            })
            
        }
    },
    methods: {
        handleChange(item) {
            console.log(this.company_id)
            this.$emit('input',this.company_id)
            _(this.options4).forEach(item => {
                if(item.id == this.company_id){
                    this.$emit('change',item)
                }
            })
            //this.$emit('change')
        },
        remoteMethod(query) {
            this.loading = true;
            if (query !== "") {
                this.loadingText = '数据正在请求中...';
                console.log(this.data)
                let data = {
                    params: Object.assign(this.data,{
                        keywords: query,
                    })
                }
         
                request.get(this.url,data).then(res => {
                    if (res !== "error") {
                        this.options4 = res.data.list;
                        this.loading = false;
                    } else {
                        this.loading = false;
                        this.options4 = [];
                    }
                })
 
            }
        },
    }
}
</script>

