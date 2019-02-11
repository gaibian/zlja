<template>
  <div>
    <div class="test1" @click="handleClick">
      {{test}}
    </div>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name:'testOne',
    data(){
      return {
        test:'这是测试的组件'
      }
    },
    created(){
   
    },
    methods:{
      handleClick(){
        bus.$emit('test',this.test)
      }
    }
  }
</script>
