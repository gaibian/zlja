<template>
  <div class="dialog_scroll_conatiner" :style="height != '' ? `height:${height}` : `height:${editContentHeight}px`">
    <div class="innerbox" :style="`overflowY:${overflow}`">
      <div class="scrollContent">
        <el-row v-loading="formLoading" :style="`height:${loadingHeight}px`" element-loading-text="数据加载中..." class="pos-box"></el-row>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  import editMixin from '@/utils/edit-mixins'
  export default {
    name:'dialogScroll',
    mixins: [editMixin],
    props:{
      height:{
        type:String,
        default:''
      },
      formLoading:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        overflow:'auto',
        loadingHeight:null,
      }
    },
    watch: {
      formLoading(newValue,oldValue) {
        if(newValue){
          this.overflow = 'hidden'
        }else{
          this.overflow = 'auto'
        }
      }
    },
    created() {
      this.formLoading ? this.overflow = 'hidden' : this.overflow = 'auto'
    },
    mounted() {
      window.addEventListener('resize',() => {
        this.loadingHeight = window.innerHeight - 54 - 12; 
      })
      this.loadingHeight = window.innerHeight - 54 - 12; 
    },
  }
</script>
<style lang="scss" scoped>
.dialog_scroll_conatiner{
  overflow:hidden;
}
.pos-box{
  position:absolute;
  top:0;
  left:0;
  width:100%;
}
.scrollContent{
  position: relative;
  width:100%;
  padding:0 20px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.innerbox{
  width:100%;
  padding:12px 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
}
/*滚动条样式*/
.innerbox::-webkit-scrollbar {/*滚动条整体样式*/
  width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
}
.innerbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius:6px;
  background-color:hsla(220,4%,58%,.3);
  -webkit-transition: background-color .3s;
  -moz-transition: background-color .3s;
  -ms-transition: background-color .3s;
  -o-transition: background-color .3s;
  transition: background-color .3s;
}
.innerbox::-webkit-scrollbar-thumb:hover{
  /*background:#bbbaba;*/
}
.innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
  background: #fff;
}
</style>
