<template>
    <div class="side-popup-container" :class="activeFlag ? 'active' : ''" :style="`width:${width}`">
        <div class="title-header">页面配置</div>
        <div class="content-box">
            <!--是否需要标签页-->
            <div class="item-box">
                <el-switch v-model="form.views" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <span>是否开启标签页</span>
            </div>
            <div class="item-box">
                <el-switch v-model="form.views" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <span>是否全屏</span>
            </div>
        </div>
    </div>
</template>
<script>
//配置项功能
/* 
1.是否需要标签页
2.主题颜色的切换
3.
 */
export default {
    name: 'sidePopup',
    data() {
        return {
            activeFlag:false,
            form:{
                views:false
            },
        }
    },
    props:{
        width: {
            type: String,
            default: '400px'
        },
        visible: {
            type: Boolean,
            default: false,
        }
    },
    watch: {
        visible(val,oldVal) {
            this.activeFlag = val
        }
    },
    created() {
        this.activeFlag = this.visible
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.side-popup-container{
    position: fixed;
    top:0;
    right:0;
    background:#fff;
    height:100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    z-index:999999;
    transform:translate(100%,0);
    transition:all 0.5s;
    padding:20px;
    box-sizing:border-box;
    &.active{
        transform: none;
    }
}
.title-header{
    width:100%;
    font-size:16px;
    color:#606266;
    border-bottom:#DCDFE6 1px solid;
    padding-bottom:12px;
}
.content-box{
    width:100%;
    padding:20px 0;
    .item-box{
        font-size:14px;
        color:#909399;
        margin:12px 0;
        span{
            margin-left:6px;
        }
    }
}
</style>

