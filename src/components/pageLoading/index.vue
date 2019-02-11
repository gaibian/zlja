<template>
    <div>
        <div :style="`height:${bgHeight}px;top:${loadingHeight}px`" class="pos-bg"></div>
        <el-row v-loading="true" :style="`height:${loadingHeight}px`" element-loading-text="数据加载中..." class="pos-box"></el-row>
    </div>
</template>
<script>
export default {
    name:'pageLoading',
    props:['height'],
    data() {
        return {
            loadingHeight:null,
            bgHeight:null,
        }
    },
    created() {
    
    },
    mounted() {
        window.addEventListener('resize',() => {
            this.loadingHeight = window.innerHeight - 50 - 34; 
            this.bgHeight = this.height - this.loadingHeight;
        })
        this.loadingHeight = window.innerHeight - 50 - 34;
        this.bgHeight = this.height - this.loadingHeight;
    },
    computed:{
        mainHeight() {
            return this.$store.state.mainHeight.height
        },
    }
}
</script>

