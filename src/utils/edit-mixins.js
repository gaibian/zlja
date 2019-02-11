import { debounce } from '@/utils'

export default {
  data(){
    return {
      editContentHeight:null
    }
  },
  mounted() {
    let valHandle = ()=>{
      let winheight = window.innerHeight;
      this.editContentHeight = winheight - 54;
    };
    valHandle();
    this.__resizeMainHanlder = debounce(() => {
      valHandle();
    }, 100);
    window.addEventListener('resize', this.__resizeMainHanlder)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeMainHanlder)
  }
}
