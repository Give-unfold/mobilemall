<template>
  <div class="setPassword">
    <van-nav-bar
      title="修改登录密码"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form>
      <van-field
        v-model="password"
        label="旧密码"
        placeholder="请输入旧密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="newPassword"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { validator, required: true, message: '请填写6位数的密码' },
        ]"
      />
    </van-form>

    <button @click="updataPassword" class="button">确认修改</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { updataPassword } from "../ajax/Api";
export default {
  data() {
    return {
      password: "",
      newPassword: "",
    };
  },
  methods: {
    // ...mapActions(["syncUpdataPassword"]),
    validator(val) {
      return val.length > 5;
    },
    async updataPassword() {
      const { password, newPassword } = this;
      const res = await updataPassword({ password, newPassword });
      if (!res) return this.$toast("密码错误,修改失败");
      this.$toast("修改密码成功");
      // this.syncUpdataPassword({ type: "pas", Password: res.newPassword });
      // sessionStorage.clear()
      sessionStorage.removeItem("addresst");
      sessionStorage.removeItem("orderConfirm");
      sessionStorage.removeItem("token");
      this.$router.replace("/login");
    },
  },
};
</script>

<style lang="less" scoped>
</style>