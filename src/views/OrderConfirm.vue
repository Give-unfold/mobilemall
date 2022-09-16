<template>
  <div class="orderConfirm">
    <van-nav-bar
      title="确认订单"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell
        title="请选择收获地址"
        is-link
        v-if="!isAddresst"
        :to="{ path: '/addressList', query: { from: 'orderConfirm' } }"
      />
      <van-cell
        is-link
        :label="isAddresst.address"
        v-else
        :to="{ path: '/addressList', query: { from: 'orderConfirm' } }"
      >
        <template #title>
          <span>{{ isAddresst.name }}, </span>
          <span>{{ isAddresst.tel }}</span>
        </template></van-cell
      >
    </van-cell-group>

    <main>
      <van-cell-group>
        <van-cell
          v-for="item in getOrderConfirm"
          :key="item.product_id"
          :title="item.name | mapText"
          :value="item.count + '件'"
          :label="'￥' + item.price"
          :icon="item.cover"
        />
      </van-cell-group>
    </main>

    <van-submit-bar
      class="showdow"
      :price="toPrice || 0"
      button-text="付款"
      tip-icon="info-o"
      @submit="onSubmit"
    >
      <template>共计：{{ toCount || 0 }}件</template>
    </van-submit-bar>
    <my-pop ref="pop" :userAddressId="this.id" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import MyPop from "../components/MyPop.vue";
import { getOrderCreate } from "../ajax/Api";
export default {
  components: { MyPop },
  data() {
    return {
      id: 0,
    };
  },
  methods: {
    async onSubmit() {
      if (!sessionStorage.getItem("addresst"))
        return this.$toast("请选择收货地址");
      if (!sessionStorage.getItem("orderConfirm"))
        return this.$toast("请选择了商品再过来哦，亲~");
      this.$refs.pop.show = true;
      const { id } = await getOrderCreate({
        user_address_id: this.isAddresst.id,
        orderProductList: this.getOrderConfirm,
      });
      this.id = id;
    },
  },
  filters: {
    mapText(a) {
      return a.split(" ")[0];
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    isAddresst() {
      return JSON.parse(sessionStorage.getItem("addresst"));
    },
    getOrderConfirm() {
      return JSON.parse(sessionStorage.getItem("orderConfirm"));
    },
    toCount() {
      return this.getOrderConfirm?.reduce((p, c) => p + c.count, 0);
    },
    toPrice() {
      return (
        this.getOrderConfirm?.reduce((p, c) => p + c.count * c.price, 0) * 100
      );
    },
  },
};
</script>

<style lang="less" scoped>
.orderConfirm {
  & > .van-cell-group {
    & > .van-cell {
      border-top: 10px solid #fafafa;
      border-bottom: 10px solid #fafafa;
    }
  }
  main {
    height: calc(100vh - 96px - 64px);
    overflow: auto;
    .van-icon {
      font-size: 45px;
    }
  }
}
</style>