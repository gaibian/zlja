<template>
    <div class="img-preview-container" v-show="status">
        <div class="preview-close-btn" :class="mouseFlag ? 'active' : ''" @click="handlePreviewClose" @mouseleave="handleOut" @mouseenter="handleOver">
            <svg-icon style="font-size:30px;" :icon-class="'operate-delete'"></svg-icon>
        </div>
        <img class="img" :src="src">
        <div class="preview-mask-box"></div>

        <router-view>
            <router-view></router-view>
        </router-view>

    </div>
</template>
<script>
export default {
    name: 'filePreview',
    props:['url'],
    data() {
        return {
            dialogVisible:false,
            src:'',
            mouseFlag:false,
        }
    },
    computed: {
        status() {
            return this.$parent.previewStatus
        }
    },
    created() {
       this.src = `${this.urlAds}uploads/csfile${this.url}`;
    },
    methods: {
        handleOut() {
            this.mouseFlag = false;
        },
        handleOver() {
            this.mouseFlag = true;
        },
        handlePreviewClose() {
            this.$emit('previewClose')
        },
        handleClose(done) {
            this.$emit('previewClose')
        }
    }
}
</script>
<style lang="scss" scoped>
.img-preview-container{
    position: fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    font-size:0;
    z-index:999999999;
    img{
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        z-index:999999999;
        max-width:1200px;
        max-height:700px;
        background:#fff;
    }
}
.preview-close-btn{
    position: absolute;
    top:20px;
    right:20px;
    font-size:14px;
    color:#fff;
    cursor: pointer;
    z-index:999999999;
    transition: 0.5s;
    transform:rotate(0);
    &.active{
        transform: rotate(270deg)
    }
}
.preview-mask-box{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.85);
    z-index:999999;
}
</style>


