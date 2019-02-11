<template>
  <div :style="{zIndex:zIndex,width:100+'%'}">
    <div ref="pos" :class="className" class="fixed-nav-box"
     :style="{
       top:stickyTop+'px',
       right:0,
       zIndex:zIndex,
       position:position,
       width:appWidth + 'px',
       boxShadow:shadow,
       background:'#fff'}">
      <slot></slot>
    </div>
    <div v-if="posFlag" :style="`height:${divHeight}px`"></div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Sticky',
    props: {
      stickyTop: {
        type: Number,
        default: 0
      },
      zIndex: {
        type: Number,
        default: 22
      },
      className: {
        type: String
      }
    },
    data() {
      return {
        active: false,
        position: '',
        currentTop: '',
        width: undefined,
        child: null,
        stickyHeight: 0,
        back:'',
        wrapperWidth:null,
        shadow:'',
        posFlag:false,
        divHeight:0,
      }
    },
    created() {
      console.log(this.appWidth)
    },
    mounted() {
      //主内容区域滚动事件
  
      bus.$on('appMainScroll',(e) => {
        this.handleScroll();
      })
      this.wrapperWidth = this.appWidth;
      this.divHeight = this.$refs.pos.offsetHeight;
      console.log(this.divHeight)
    },
    activated() {
      this.handleScroll()
    },
    destroyed() {
      /* 需要处理 */
        
    },
    methods: {
      sticky() {
        if (this.active) {
          return
        }
        this.position = 'fixed'
        this.active = true
        this.width = this.appWidth;
        this.back = '#fff'
        this.shadow = '0 5px 3px rgba(0, 0, 0, .1)';
        this.posFlag = true;
      },
      reset() {
        if (!this.active) {
          return
        }
        this.position = ''
        this.width = 'auto'
        this.active = false
        this.back = ''
        this.shadow = ''
        this.posFlag = false;
      },
      handleScroll() {
        this.width = this.$el.getBoundingClientRect().width
        const offsetTop = this.$el.getBoundingClientRect().top
        if (offsetTop < this.stickyTop) {
          this.sticky()
          return
        }
        
        this.reset()
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      appWidth() {
        return this.$store.getters.appWidth
      }
    },

  }
</script>
<style lang="scss" scoped>
  .sub-navbar{
    //background:0 0;
    //transition: all .6s cubic-bezier(.215, .61, .355, 1) 0s;
  }
  // .fixed-nav-box{
  //   box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  // }
</style>
