<template>
    <div>
        <el-popover ref="elPopover" placement="bottom" width="100" trigger="click" style="padding:0" v-model="popoverFlag">
            <div class="operate-ul">
                <slot @change="handleh"></slot>
            </div>
            <a slot="reference" style="clickStyle">
                <svg-icon :icon-class="'operateList'"></svg-icon>
                <svg-icon :icon-class="'operateDown'" style="font-size:12px;"></svg-icon>
            </a>
        </el-popover>
    </div>
</template>
<script>
export default {
    name: 'operates',
    data() {
        return {
            clickFlag:false,
            popoverFlag:false,
            btnOptions: [
                {
                    label:'设计表'
                }
            ]
        }
    },
    mounted() {
        //this.$refs.elPopover.$el.style.padding = 0;
        let dom = this.$refs.elPopover.$el;
        dom.children[0].style.padding = '12px 0';
    },
    methods: {
        handleh() {
            
        },
        handleClick() {
            this.clickFlag = true;
        }
    }
}
</script>
<style lang="scss" scoped>
.el-popover{
    padding:0;
}
 .clickStyle{
    font-size:0;
    cursor: pointer;
  }
.operate-ul{
    width:100%;
    background:#fff;
    border-radius:4px;
    margin:0;
    padding:0;
    
}
</style>


