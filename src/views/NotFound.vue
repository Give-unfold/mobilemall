<template>
  <div>
    <h3>404~~页面找不到啦~~</h3>
    <van-button type="primary" @click="$router.replace('/home')"
      >回到首页</van-button
    >
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>