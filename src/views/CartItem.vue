<template>
  <div class="cartItem">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <my-scroll class="wrappers" ref="wrapper" @pullingDown="pullingDown">
      <main>
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="#008BFA">
          <van-swipe-item v-for="item in cartItem?.imgList" :key="item.id"
            ><img v-lazy="item.path" alt="" @load="imgLoad"
          /></van-swipe-item>
        </van-swipe>
        <van-cell :title="cartItem?.name" :label="cartItem?.price | mapPrice" />

        <van-cell-group>
          <van-cell class="contentText">
            <van-col span="11">免运费</van-col>
            <van-col span="13">剩余: {{ cartItem?.stock ?? 0 }}</van-col>
          </van-cell>
          <van-cell class="contentText">
            <van-col span="11">销量：{{ cartItem?.sales }}</van-col>
            <van-col span="13">收藏: {{ cartItem?.likes }}</van-col>
          </van-cell>
        </van-cell-group>

        <van-tabs v-model="active">
          <van-tab title="图片">
            <img
              :src="item.path"
              alt=""
              v-for="item in cartItem?.detailImgList"
              :key="item.id"
              @load="imgLoad"
            />
          </van-tab>
          <van-tab title="参数">
            <van-cell-group>
              <van-cell v-for="item in cartItem?.properties" :key="item.id">
                <van-col span="11">{{ item.name }}</van-col>
                <van-col span="13">{{ item.detail }}</van-col>
              </van-cell>
            </van-cell-group>
          </van-tab>
        </van-tabs>
      </main>
    </my-scroll>
    <van-goods-action>
      <van-goods-action-icon
        :icon="isLogin ? (likeShow ? 'like' : 'like-o') : 'like-o'"
        text="收藏"
        @click="updataLike(cartItem)"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="isLogin ? $router.push('/cart') : $router.push('/login')"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCartList(cartItem.id)"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="toOrderConfirm"
      />
    </van-goods-action>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { reqCartItem, addLike, deletLike, updataCartList } from "../ajax/Api";
import MyScroll from "../components/MyScroll.vue";
export default {
  components: { MyScroll },
  data() {
    return {
      cartItem: {},
      active: 0,
    };
  },
  created() {
    this.getCartItem();
  },
  methods: {
    ...mapActions(["syncUpdataUserInfo"]),
    toOrderConfirm() {
      const { id: product_id, name, price, cover } = this.cartItem;
      sessionStorage.setItem(
        "orderConfirm",
        JSON.stringify([{ product_id, name, price, cover, count: 1 }])
      );
      this.isLogin
        ? this.$router.push("/orderConfirm")
        : this.$router.push("/login");
    },
    async addCartList(product_id) {
      if (!this.isLogin) return this.$router.push("/login");
      const res = await updataCartList({ product_id });
      if (typeof res != "undefined") return this.$toast("已添加过该商品");
      this.$toast("添加商品成功");
    },
    async updataLike(parmas) {
      if (!this.isLogin) return this.$router.push("/login");
      const { cover, name, price, id: product_id } = parmas;
      if (this.likeShow) {
        const res = await deletLike(parmas.id);
        this.syncUpdataUserInfo({
          type: false,
          obj: { product_id },
        });
      } else {
        const res = await addLike(parmas.id);
        this.syncUpdataUserInfo({
          type: true,
          obj: { product_id, cover, name, price },
        });
      }
    },
    pullingDown() {
      this.cartItem = this.getCartItem();
    },
    imgLoad() {
      this.$refs.wrapper.bs.refresh();
    },
    async getCartItem() {
      const cartItem = await reqCartItem(this.$route.query.id);
      this.cartItem = cartItem;
      this.$refs.wrapper?.bs.refresh();
      this.$refs.wrapper?.bs.finishPullDown();
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    // ...mapGetters(["isLogin"]),
    isLogin() {
      return sessionStorage.getItem("token");
    },
    likeShow() {
      return (
        this.userInfo.likeList?.some(
          (item) => item.product_id == this.$route.query.id
        ) ?? []
      );
    },
  },
  filters: {
    mapPrice(price = 0) {
      return `￥${price.toFixed(2)}`;
    },
  },
};
</script>

<style lang="less" scoped>
.wrappers {
  height: calc(100vh - 100px);
  overflow: hidden;
  main {
    .my-swipe {
      height: 300px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .van-cell__label {
      color: red !important;
    }
    .contentText {
      font-size: 12px;
    }
    .van-tab__pane {
      img {
        width: 100%;
      }
    }
  }
}
.cartItem :deep(.van-icon-like) {
  color: red !important;
}
</style>