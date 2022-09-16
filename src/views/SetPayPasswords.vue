<template>
  <div class="setPayPassword">
    <van-nav-bar
      title="修改支付密码"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell-group>
      <van-field v-model="password" label="旧密码" placeholder="请输入旧密码" />
      <van-field
        v-model="newPassword"
        label="新密码"
        placeholder="请输入新密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { validator, required: true, message: '请填写6位数的密码' },
        ]"
      />
    </van-cell-group>

    <button @click="updataPassword" class="button">确认修改</button>
  </div>
</template>

<script>
import { updataPayPassword } from "../ajax/Api";
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
      const res = await updataPayPassword({ password, newPassword });
      if (!res) return this.$toast("修改失败");
      this.$toast("修改支付密码成功");
      // this.syncUpdataPassword({ type: "pay", pay_password: res.newPassword });
      this.$router.replace("/me");
    },
  },
};
</script>

<style lang="less" scoped>
</style>