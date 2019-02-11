<template>
  <div class="app-wrapper" :class="classObj">
      <div :style="appMainHeight">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view ref="child"></router-view>
            </keep-alive>
            <!-- <router-view ref="child"></router-view> -->
        </transition>
      </div>
  </div>
</template>

<script>
  import { Navbar, Sidebar } from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import TagsView from './components/TagsView.vue'
  import { constantRouterMap } from '@/router'
  import modifyPass from '@/components/UserSet/modifyPass.vue'

  export default {
    name: 'layout1',
    data(){
      return {
        fullHeight:document.documentElement.clientHeight,
        appMainHeight:0,
      }
    },
    mixins: [ResizeMixin],
    computed: {
      notCacheName() {
        return(this.$route.meta && this.$route.meta.noCache) ? this.$route.name : ''
      },
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
      sidebar() {
        return this.$store.state.app.sidebar
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
    },
    methods: {
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
