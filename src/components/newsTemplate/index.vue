<template>
    <div class="news-template-container">

    </div>
</template>
<script>
import axios from 'axios'
import request from '@/utils/request'
export default {
    name:'newsTemplate',
    data() {
        return {
            form:{},
            idOptions:[],
        }
    },
    created() {
        // this.init();
        // this.timeTemplate = setInterval(()=>{
        //     this.init();
        // },10000);
    },
    methods:{
        init() {
            //需要返回菜单栏未读的数据 存入vuex
            request.get('admin/insideMessage/getLastMessage').then(res => {
                if(res !== 'error'){
                    this.form = res.data;
                    if(this.form.length != 0){
                        if(this.idOptions.length != 0){
                            if(this.idOptions.some((v) => v === res.data.id)) return false
                        }
                        this.idOptions.push(res.data.id)
                        this.open();
                    }else{
                        this.$store.dispatch('setNewsId','')
                    }
                }
            })

            request.get('admin/circulationSheet/getCount').then(res => {
                if(res != 'error'){
                    this.$store.dispatch('setMenuCount',res.data)
                }
            })
        },
        open() {
            const h = this.$createElement;
            const vm = this;
            this.$notify({
                title: '消息',
                dangerouslyUseHTMLString: true,
                message: h('i', { style: 'color: teal;cursor: pointer;'},this.form.inside_message_title),
                position: 'bottom-right',
                duration:15000,
                onClick() {
                    //如果 页面就是当前页的话，需要处理
                    if(vm.$route.name == 'inSideMessageDetails'){
                        //需要先跳转刷新页面
                        let path = vm.$route.path.split('/');
                        path.splice(path.length - 1,1)
                        path.push(`${vm.form.id}?pageClick=true`)
                        vm.$router.push({
                            path:'/refresh',
                            query:{
                                name:'inSideMessageDetails',
                                path: path.join('/')
                            }
                        })
                    }else{
                        vm.$router.push({
                            name:'inSideMessageDetails',
                            params:{
                                id:vm.form.id
                            },
                            query:{
                                pageClick:_g.editRefresh('inSideMessageDetails'),
                            }
                        })
                    }
                    
                }
            });
        },

    }
}
</script>
<style lang="scss" scoped>

</style>


