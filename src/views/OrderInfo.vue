<template>
  <div class="orderInfo">
    <van-nav-bar
      title="订单详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <van-steps :active="active">
      <van-step>未付款</van-step>
      <van-step>已付款</van-step>
      <van-step>已发货</van-step>
      <van-step>交易完成</van-step>
    </van-steps>

    <van-cell
      class="address"
      :label="
        isAddresst.province +
        isAddresst.city +
        isAddresst.country +
        isAddresst.detail
      "
      :to="{ path: '/addressList', query: { from: 'orderConfirm' } }"
    >
      <template #title>
        <span>{{ isAddresst.name }}, </span>
        <span>{{ isAddresst.mobile }}</span>
      </template></van-cell
    >
    <main>
      <van-cell
        v-for="item in orderConfirm"
        :key="item.id"
        :icon="item.cover"
        :title="item.name"
        :value="item.count"
        :label="'￥' + item.price"
        is-link
      />
    </main>

    <footer>
      <span
        >合计：<i>￥{{ toPrice.toFixed(2) }}</i></span
      >
      <p @click="payment" v-if="active == 0">付款</p>
      <p class="fahuo" v-else-if="active == 1">等待商家发货</p>
    </footer>
    <my-pop ref="pop" :userAddressId="this.id" />
  </div>
</template>

<script>
import { getOrderInfo } from "../ajax/Api";
import MyPop from "../components/MyPop.vue";
export default {
  components: { MyPop },
  data() {
    return { active: 0, id: 0, isAddresst: {}, orderConfirm: [] };
  },
  created() {
    this.getOrderInfo();
    console.log(this.toPrice);
  },
  methods: {
    async getOrderInfo() {
      const res = await getOrderInfo(this.$route.query.id);
      console.log(res);
      const { id, order_status, userAddress, orderProducts } =
        await getOrderInfo(this.$route.query.id);
      this.active = order_status;
      this.id = id;
      this.isAddresst = userAddress;
      this.orderConfirm = orderProducts;
      console.log(
        this.isAddresst,
        userAddress,
        this.orderConfirm,
        orderProducts
      );
    },
    payment() {
      this.$refs.pop.show = true;
    },
  },
  computed: {
    // isAddresst: {
    //   get() {
    //     return JSON.parse(sessionStorage.getItem("addresst")) || {};
    //   },
    //   set(newValue) {
    //     this.isAddresst = newValue;
    //     console.log(newValue);
    //     return newValue;
    //   },
    // },
    // orderConfirm: {
    //   get() {
    //     return JSON.parse(sessionStorage.getItem("orderConfirm")) || [];
    //   },
    //   set(newValue) {
    //     return newValue;
    //   },
    // },
    toPrice() {
      return this.orderConfirm.reduce((p, c) => p + c.count * c.price, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.address {
  border-top: 10px solid #fafafa;
  border-bottom: 10px solid #fafafa;
}
main {
  height: calc(100vh - 59px - 96px - 86px);
  overflow: auto;
  img {
    font-size: 50px;
  }
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  span {
    i {
      color: red;
    }
  }
  p {
    height: 100%;
    width: 80px;
    text-align: center;
    line-height: 50px;
    color: white;
    background-color: rgb(0, 196, 105);
  }
  .fahuo {
    width: 120px;
    background-color: #969799;
  }
}
</style>