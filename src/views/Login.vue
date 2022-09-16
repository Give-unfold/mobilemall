<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <van-form>
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          {
            validator,
            message: '最少请输入五个字符',
          },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="[{ validator, required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" @click="loginClick"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqLogin } from "../ajax/Api";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["syncChangeUserInfo"]),
    validator(val) {
      return val.length > 5;
    },
    async loginClick() {
      const { username: name, password } = this;
      const res = await reqLogin({ name, password });
      sessionStorage.setItem("token", res.token);
      this.syncChangeUserInfo(res);
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
</style>