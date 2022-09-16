<template>
  <div class="setting">
    <van-nav-bar
      title="用户设置"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="基本信息" class="textColor" />
      <van-cell icon="setting-o" title="修改昵称" is-link to="/setUserName" />
      <van-cell icon="setting-o" title="修改头像" is-link to="/setAvatar" />
    </van-cell-group>
    <van-cell-group>
      <van-cell title="安全" class="textColor" />
      <van-cell
        icon="setting-o"
        title="修改登录密码"
        is-link
        to="/setPassword"
      />
      <van-cell
        icon="setting-o"
        title="修改支付密码"
        is-link
        to="/setPayPasswords"
      />
    </van-cell-group>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.textColor {
  color: rgb(150, 151, 153);
}
</style>