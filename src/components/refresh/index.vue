<template>
  <div></div>
</template>
<script>
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (vm.$route.query.name) {
          vm.cachedViews.push(vm.$route.query.name)

          if(vm.$route.query.name == 'inSideMessageDetails'){
            router.replace({ path: vm.$route.query.path })
          }else{
            router.replace({ path: vm.$route.query.path});
          }
          
          bus.$emit('refresh')
        } else {
          console.log('refresh fail')
        }
      })
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews
      },
    }
  }
</script>
