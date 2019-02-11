<template>
    <div>
        <div class="operate-li" @click="handleLiClick">
            <svg-icon v-if="svgIcon" :icon-class="icon == undefined ? '' : icon" :style="`margin-right:12px;font-size:16px;color:${color}`"></svg-icon>
            <i v-else :class="icon" style="margin-right:12px"></i>
            <span>{{label}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"operate",
    props:{
        label:{
            type:String,
            required: true,
        },
        icon:{
            type:String,
        },
        svgIcon:{
            type:Boolean,
            default: false
        },
        
    },
    data() {
        return {
            color:'',
        }
    },
    watch:{
        icon() {
            if(this.icon == 'operate-edit'){
                this.color = '#E6A23C';
            }else if(this.icon == 'operate-delete'){
                this.color = '#F56C6C'
            }else if(this.icon == 'operate-yes'){
                this.color = '#67C23A'
            }
        }
    },
    created() {
        if(this.icon == 'operate-edit'){
            this.color = '#E6A23C';
        }else if(this.icon == 'operate-delete'){
            this.color = '#F56C6C'
        }else if(this.icon == 'operate-yes'){
            this.color = '#67C23A'
        }
    },
    methods: {
        handleLiClick() {
            this.$parent.$parent.popoverFlag = false;
            this.$emit('change')
        }
    }
}
</script>
<style lang="scss" scoped>
    .operate-li{
        width:100%;
        height:32px;
        line-height:32px;
        font-size:12px;
        color:#606266;
        background:#fff;
        padding:0 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        cursor: pointer;
        &:hover{
            background:#F2F6FC;
        }
    }
</style>


