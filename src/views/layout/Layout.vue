<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar ref="navBar"></navbar>
      <tags-view ref="tagsView"></tags-view>
      <div :style="appMainHeight">
          <app-main ref="appMain" :autoMainHeight="appMainHeight"></app-main>
      </div>
    </div>
    <!--忘记密码-->
    <el-dialog ref="dialog" width="400px" class="dialog-slider" :visible.sync="centerDialogVisible" :before-close="handleClose" title="修改密码">
      <modify-pass @close="dialogClose" v-if="centerDialogVisible"></modify-pass>
    </el-dialog>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import TagsView from './components/TagsView.vue'
import { constantRouterMap } from '@/router'
import modifyPass from '@/components/UserSet/modifyPass.vue'

export default {
  name: 'layout',
  data(){
    return {
      fullHeight:document.documentElement.clientHeight,
      appMainHeight:0,
      centerDialogVisible:false,
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    modifyPass
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    autoHeight(){
      return `height:${this.appMainHeight}px`
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  beforeDestroy(){
    window.removeEventListener('resize',this.handleResize);
  },
  created(){
    let height = 50 + 34;
    this.appMainHeight = `height:${this.fullHeight - height}px`;
    window.addEventListener('resize',this.handleResize)
    //刷新的时候重新获取用户信息存到vuex
    // let userInfo = Lockr.get('userInfo');
    // this.$store.dispatch('setInfo',userInfo);
    
    bus.$on('modifyPass',(res)=>{
      if(res){
        this.centerDialogVisible = true;
        this.$refs.dialog.open();
      }
    })
  },
  methods: {
    dialogClose(){
      this.centerDialogVisible = false;
    },
    handleClose(){
      this.centerDialogVisible = false;
      this.$refs.dialog.close();
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    handleResize(event){
      this.fullHeight = document.documentElement.clientHeight;
      let height = 50 + 34;
      this.appMainHeight = `height:${this.fullHeight - height}px`;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
