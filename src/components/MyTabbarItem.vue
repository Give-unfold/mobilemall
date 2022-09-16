<template>
  <router-link
    :to="to"
    :style="{ backgroundColor: $parent.bgc, color: $parent.color }"
  >
    <div>
      <i :class="icon ? icon : ''"></i> <span><slot></slot></span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default() {
        return "/home";
      },
    },
    tagr: {
      type: String,
    },
    icon: {
      typr: String,
    },
    dot: {},
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
a {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    i {
      font-size: 18px;
    }
  }
}
</style>