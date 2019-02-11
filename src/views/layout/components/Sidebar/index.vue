<template>
  <div class="side-block">
    <user-set ref="userSet"></user-set>
    <div class="innerbox" :style="`height:${setHeight}px`">
      <div class="scrollContent">
        <el-menu
          mode="vertical"
          :show-timeout="200"
          :default-active="$route.path"
          :collapse="isCollapse"
          :unique-opened="true"
          background-color="#081c27"
          text-color="#79909e"
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#fff">
          <sidebar-item :routes="permission_routers"></sidebar-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
import SidebarItem from './SidebarItem'
import UserSet from '@/components/UserSet'

export default {
  data() {
    return {
      scrollHeight:{
        height:0 + 'px',
        overflowX:'hidden'
      },
      setHeight:null,
    }
  },
  components: {
    SidebarItem,
    UserSet
  },
  created(){
    this._height();
    window.addEventListener('resize',()=>{
      this._height();
    })
    console.log(this.permission_routers)
  },
  mounted(){
    let winHeight = document.body.clientHeight
    let userSetHeight = this.$refs.userSet.$el.clientHeight
    this.setHeight = winHeight - userSetHeight
  },
  methods:{
    _height() {
      let winHeight = document.body.clientHeight;
      this.scrollHeight.height = `${winHeight - 140}px`
    },
    handleOpen(index,indexPath){

    },
    handleClose(){

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers',
      'permission_routers1',
      'themeColor'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    newPermissionRouters() {
      return this.$store.getters.permission_routers;
    },
    operateArr() {
      return this.$store.getters.permission_routers;
    }
  }
}
</script>
<style lang="scss" scoped>
  .side-block{
    width:100%;
    height:100%;
    background-color:#081c27;
  }
  .innerbox{
    width:100%;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    padding:0 !important;
  }
  /*滚动条样式*/
  .innerbox::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .innerbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius:6px;
    /*background:#143648;*/
    background:rgba(255,255,255,0.2);
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    -ms-transition: all 1s;
    -o-transition: all 1s;
    transition: all 1s;
  }
  /*.innerbox::-webkit-scrollbar-thumb:hover{*/
    /*background:#bbbaba;*/
  /*}*/
  .innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
    background: #081c27;
  }
</style>
