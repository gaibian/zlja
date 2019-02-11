<template>
  <div @click="handleChil">{{testTwo}}</div>
</template>
<script>
  export default {
    data(){
      return {
        testTwo:'这是第二个组件'
      }
    },
    methods:{
      handleChil(){
        console.log('触发了');
        bus.$emit('testTwo',this.testTwo)
      }
    }
  }
</script>
