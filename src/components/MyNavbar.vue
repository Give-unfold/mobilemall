<template>
  <div class="mynavbar">
    <p class="left" @click="clickLeft"><slot name="left"></slot></p>
    <p class="center"><slot name="center"></slot></p>
    <p class="right" @click="clickRight"><slot name="right"></slot></p>
  </div>
</template>

<script>
export default {
  methods: {
    clickLeft() {
      this.$emit("clickLeft");
    },
    clickRight() {
      this.$emit("clickRight");
    },
  },
};
</script>

<style lang="less" scoped>
.mynavbar {
  height: 50px;
  width: 100%;
  display: flex;
  background-color: #eee;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  i {
    color: #1989fa !important;
  }
  .left {
    span {
      font-size: 12px;
    }
  }

  .left,
  .right,
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left,
  .right {
    width: 20%;
    height: 100%;
  }
  .center {
    font-size: 20px;
    font-weight: 700;
    flex: 1;
  }
}
</style>