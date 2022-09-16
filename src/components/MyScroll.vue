<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      pullDownRefresh: true,
      pullUpLoad: true,
      click: true,
    });
    this.bs.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
    this.bs.on("pullingDown", () => {
      this.$emit("pullingDown");
    });
    this.bs.on("scroll", (obj) => {
      this.$emit("scrollTO", obj);
    });
  },
  methods: {
    scrollTop(x, y, time, easing) {
      this.bs.scrollTo(x, y, time, easing);
    },
  },
};
</script>

<style lang="less" scoped>
</style>