<template>
    <el-select
        v-model="salesman"
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
        :loading="loading">
        <el-option
            v-for="item in options4"
            :key="item.id"
            :label="item.realname"
            :value="item.id"
        ></el-option>
    </el-select>
</template>
<script>
import request from "@/utils/request";
export default {
    name:'userInput',
    props:{
        placeholder:{
            type:String,
            default:'请输入'
        },
        label:{
            type:String,
            default:'realname'
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
        }
    },
    data() {
        return {
            loadingText:'无数据',
            loading: true,
            options4:[],
            salesman:'',
        }
    },
    watch:{
        value(value) {
            this.salesman = value;
        },
        data:{
            handler(curVal,oldVal) {
                if(curVal.realname !== '' && curVal.id !== ''){
                    this.options4 = [];
                    this.options4.push({
                        realname: curVal.realname,
                        id: curVal.id
                    })
                    
                }
            },
            deep:true,
        }
    },

    created() {

        if(this.data.realname !== '' && this.data.id !== ''){
            this.options4 = [];
            console.log(this.options4)
            this.options4.push({
                realname: this.data.realname,
                id: this.data.id
            })
            
        }
    },
    methods: {
        handleChange() {
            console.log(this.salesman)
            this.$emit('input',this.salesman)
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

