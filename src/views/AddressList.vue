<template>
  <div class="addressList">
    <van-nav-bar
      :title="fromMe ? '我的收货地址' : '请选择收获地址'"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"
    />

    <van-address-list
      :list="list"
      :switchable="!fromMe"
      @select="addresst"
      @edit="toEdit"
      @add="addressEdit"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { reqUserInfo } from "../ajax/Api";
export default {
  created() {
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["syncChangeUserInfo"]),
    async getUserInfo() {
      const res = await reqUserInfo();
      this.syncChangeUserInfo(res);
    },
    addressEdit() {
      this.$router.push({ path: "/addressEdit", query: { id: 0 } });
    },
    toEdit({ id }) {
      this.$router.push({ path: "/addressEdit", query: { id } });
    },
    addresst(item) {
      sessionStorage.setItem("addresst", JSON.stringify(item));
      this.$router.back();
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    list() {
      return this.userInfo.addressList?.map(
        ({ id, name, mobile: tel, province, city, country, detail }) => ({
          id,
          name,
          tel,
          address: `${province} ${city} ${country} ${detail}`,
        })
      );
    },
    fromMe() {
      return this.$route.query.from == "me";
    },
  },
};
</script>

<style lang="less" scoped>
.van-address-list {
  padding: 0 !important;
  .van-radio-group {
    height: calc(100vh - 96px);
    margin-top: 44px;
    overflow: auto;
  }
}
</style>