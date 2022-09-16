<template>
  <div class="home">
    <my-navbar
      @clickLeft="$router.push('/citylist')"
      @clickRight="$router.push('/search')"
    >
      <template v-slot:left>
        <i class="icon-location2"></i>
        <span>{{ positionCity }}</span>
      </template>
      <template v-slot:center>
        <span>首页</span>
      </template>
      <template v-slot:right>
        <i class="icon-search"></i>
      </template>
    </my-navbar>
    <my-scroll
      class="wrappers"
      ref="wrapper"
      @pullingUp="pullingUp"
      @pullingDown="pullingDown"
      @scrollTO="scrollTO"
    >
      <main>
        <my-card
          v-for="item in list"
          :key="item.id"
          :title="item.name"
          :imgUrl="item.cover"
          :price="item.price"
          :id="item.id"
          @clickListItem="clickListItem(item.id)"
        ></my-card>
      </main>
    </my-scroll>
    <div class="ding" @click="toTop" v-show="toShow">
      <van-icon name="back-top" />
    </div>
  </div>
</template>

<script>
import MyCard from "../components/MyCard.vue";
import MyNavbar from "../components/MyNavbar.vue";
import MyScroll from "../components/MyScroll.vue";
import mixinJs from "../mixin/index";
import { mapState } from "vuex";

export default {
  components: { MyNavbar, MyCard, MyScroll },
  mixins: [mixinJs],
  data() {
    return {
      toShow: false,
    };
  },
  created() {
    this.getHomeData({ page: this.page });
  },
  mounted() {},
  methods: {
    scrollTO({ y }) {
      this.toShow = Math.abs(y) > 1000;
    },
    toTop() {
      this.$refs.wrapper.scrollTop(0, 0, 300);
    },
    pullingDown() {
      this.flag = false;
      this.page = 1;
      this.list = [];
      this.getHomeData({ page: this.page });
    },
    clickListItem(id) {
      this.$router.push({
        path: "/productInfo",
        query: { id },
      });
    },
  },
  computed: {
    ...mapState(["positionCity"]),
  },
};
</script>

<style lang="less" scoped>
.ding {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  position: fixed;
  bottom: 80px;
  right: 20px;
  background-color: rgba(100, 100, 100, 0.6);
  color: white;
  border-radius: 50%;
  font-size: 20px;
}
.wrappers {
  height: calc(100vh - 100px);
  overflow: hidden;
  main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    & > div {
      width: 45%;
    }
  }
}
</style>