<template>
  <div class="mytabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    bgc: {
      type: String,
      default: "white",
    },
    color: {
      type: String,
      default: "black",
    },
  },
};
</script>

<style lang="less" scoped>
.mytabbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
