<template>
  <div class="mypop">
    <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
      <van-nav-bar title="付款" @click-left="popShow">
        <template #left>
          <van-icon name="cross" />
        </template>
      </van-nav-bar>
      <van-password-input
        :value="password"
        info="密码为 6 位数字"
        @focus="numShow = true"
        length="6"
      />
      <van-number-keyboard
        v-model="password"
        random-key-order
        :show="numShow"
        @input="clickNum"
        @blur="numShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getOrderPay } from "../ajax/Api";
export default {
  props: ["userAddressId"],
  data() {
    return { show: false, password: "", numShow: true };
  },
  methods: {
    popShow() {
      this.show = false;
      this.$router.push({
        path: "/orderInfo",
        query: { id: this.userAddressId },
      });
    },
    clickNum() {
      this.$nextTick(async () => {
        if (this.password.length > 5) {
          const res = await getOrderPay(this.userAddressId, this.password);
          console.log(res);
          if (res != "支付成功") {
            (this.password = ""), this.$toast("支付密码错误");
            return;
          }
          this.$toast(res);
          this.$router.push("/success");
        }
      });
    },
  },
};
</script>

<style>
</style>