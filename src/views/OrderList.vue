<template>
  <div class="orderList">
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <my-scroll
      class="wrappers"
      ref="wrapper"
      @pullingUp="pullingUp"
      @pullingDown="pullingDown"
      @scrollTO="scrollTO"
    >
      <main>
        <van-cell-group v-for="item in orderList" :key="item.id" class="box">
          <van-cell
            :title="'订单ID' + item.id"
            is-link
            :to="{ path: '/orderInfo', query: { id: item.id } }"
          />
          <van-cell
            v-for="citem in item.orderProducts"
            :key="citem.id"
            :icon="citem.cover"
            :title="citem.name"
            :value="citem.count"
            :to="{ path: '/productInfo', query: { id: citem.id } }"
            is-link
          />
        </van-cell-group>
      </main>
    </my-scroll>
  </div>
</template>

<script>
import MyScroll from "../components/MyScroll.vue";
import { getOrderList } from "../ajax/Api";
export default {
  components: { MyScroll },
  data() {
    return {
      page: 1,
      orderList: [],
      totalPages: 1,
      flag: true,
    };
  },
  created() {
    this.getOrderList(this.page);
  },
  methods: {
    async getOrderList(page, size = 10) {
      const { data, totalPages } = await getOrderList({ page, size });
      this.orderList = [...this.orderList, ...data];
      this.totalPages = totalPages;
      this.$nextTick(() => {
        this.$refs.wrapper.bs.refresh();
        this.flag
          ? this.$refs.wrapper.bs.finishPullUp()
          : this.$refs.wrapper.bs.finishPullDown();
      });
    },
    pullingUp() {
      this.flag = true;
      if (this.page > this.totalPages) {
        this.$refs.wrapper.bs.finishPullUp();
        return this.$toast("没有更多内容了");
      }
      this.page++;
      this.getOrderList(this.page);
    },
    pullingDown() {
      this.flag = false;
      this.page = 1;
      this.orderList = [];
      this.getOrderList(this.page);
    },
    scrollTO() {},
  },
};
</script>

<style lang="less" scoped>
.wrappers {
  height: calc(100vh - 46px);
  overflow: hidden;
  li {
    height: 50px;
  }
  .box {
    border-top: 10px solid #fafafa;
    img {
      font-size: 50px;
    }
  }
}
</style>