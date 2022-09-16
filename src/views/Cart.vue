<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <my-scroll
      class="wrappers"
      ref="wrapper"
      @pullingDown="pullingDown"
      v-if="cartList.length > 0"
    >
      <main>
        <div v-for="item in cartList" :key="item.product_id">
          <van-checkbox v-model="item.checked" @change="changeflag(item)">
            <van-card
              :price="item.price.toFixed(2)"
              :title="item.name"
              :thumb="item.cover"
              @click.stop
            >
              <template #num>
                <van-stepper
                  v-model="item.count"
                  disable-input
                  @change="countChange(item)"
                />
                <van-tag
                  type="danger"
                  size="large"
                  @click="delClick(item.product_id)"
                  >删除</van-tag
                >
              </template>
            </van-card>
          </van-checkbox>
        </div>
      </main>
    </my-scroll>
    <div class="noData" v-else>
      <van-icon name="info-o" />
      <h3>购物车没东西啦...</h3>
    </div>

    <van-submit-bar
      :disabled="toCount < 1"
      class="showdow"
      :price="toPrice"
      button-text="提交订单"
      tip-icon="info-o"
      @submit="addOrderConfirm"
    >
      <template>共计：{{ toCount }}件</template>
    </van-submit-bar>
  </div>
</template>

<script>
import MyScroll from "../components/MyScroll.vue";
import { reqCartList, updataCartList, deleteCartList } from "../ajax/Api";
export default {
  components: { MyScroll },
  data() {
    return { cartList: [] };
  },
  created() {
    this.getCartList();
  },
  methods: {
    addOrderConfirm() {
      sessionStorage.setItem(
        "orderConfirm",
        JSON.stringify(
          this.cartList
            .filter((item) => item.checked)
            .map(({ product_id, name, price, cover, count }) => ({
              product_id,
              name,
              price,
              cover,
              count,
            }))
        )
      );
      this.$router.push("/orderConfirm");
    },
    async changeflag(item) {
      const { product_id, checked } = item;
      await updataCartList({ product_id, checked: +checked });
    },
    async countChange(item) {
      const { product_id, count } = item;
      await updataCartList({ product_id, count });
    },
    async delClick(product_id) {
      await this.$dialog
        .confirm({
          title: "警告",
          message: "确定要删除该商品吗？",
        })
        .then(async () => {
          const res = await deleteCartList(product_id);
          this.cartList = this.cartList.filter(
            (item) => item.product_id != product_id
          );
          if (res != 1) return this.$toast("删除商品失败");
          console.log(res);
          this.$toast("删除商品成功");
        })
        .catch(() => {
          this.$toast("取消了删除");
        });
    },
    pullingDown() {
      this.getCartList();
    },
    async getCartList() {
      const res = await reqCartList();
      this.cartList = res ?? [];
      this.$nextTick(() => {
        this.$refs.wrapper?.bs.refresh();
      });
      this.$refs.wrapper?.bs.finishPullDown();
    },
  },
  computed: {
    toCount() {
      return this.cartList
        .filter((item) => item.checked)
        .reduce((p, c) => p + c.count, 0);
    },
    toPrice() {
      return (
        this.cartList
          .filter((item) => item.checked)
          .reduce((p, c) => p + c.count * c.price, 0) * 100
      );
    },
  },
};
</script>

<style lang="less" scoped>
.wrappers {
  height: calc(100vh - 100px);
  overflow: hidden;
  padding: 0 10px;
  main {
    & > div {
      margin: 10px 0;
      background-color: #fafafa;
      .van-card__price {
        color: red;
      }
    }
  }
}
.noData {
  width: 100vw;
  height: 100vh;
  background-color: rgba(180, 180, 180, 0.1);
  text-align: center;
  .van-icon-info-o {
    color: #aaa;
    font-size: 18vw;
    margin-top: 18vw;
  }
  h3 {
    font-size: 16px;
    color: #aaa;
    margin-top: 10px;
  }
}
</style>