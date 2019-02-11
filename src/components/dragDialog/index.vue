<template>
    <el-dialog v-el-drag-dialog title="Shipping address" :visible.sync="state">
      <slot></slot>
    </el-dialog>
</template>
<script>

export default {
  name: "dragDialog",
  props: ["state"],
  data() {
    return {
      dialogTableVisible: true
    };
  },
  created() {

  }
};
</script>
<style lang="scss" scoped>
</style>
