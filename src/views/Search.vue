<template>
  <div class="search">
    <van-nav-bar left-text="返回" left-arrow @click-left="$router.back()">
      <template #title>
        <van-search
          v-model="search"
          @input="changeValue"
          placeholder="请输入搜索关键词"
        />
      </template>
    </van-nav-bar>

    <my-scroll
      class="wrappers"
      ref="wrapper"
      @pullingUp="pullingUp"
      @pullingDown="pullingDown"
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
  </div>
</template>

<script>
import mixinJs from "../mixin/index";
import MyScroll from "../components/MyScroll.vue";
import MyCard from "../components/MyCard.vue";
export default {
  components: { MyScroll, MyCard },
  mixins: [mixinJs],
  data() {
    return {
      search: "",
      falg: false,
      time: "",
    };
  },
  methods: {
    clickListItem(id) {
      this.$router.push({
        path: "/productInfo",
        query: { id },
      });
    },
    changeValue() {
      this.list = [];
      clearTimeout(this.time);
      if (this.search.length < 1) return;
      this.time = setTimeout(async () => {
        this.falg = true;
        if (this.falg) {
          this.falg = false;
          console.log(this.search);
          const a = await this.getHomeData({
            page: this.page,
            key: this.search,
          });
        }
      }, 500);
    },
    pullingDown() {
      if (this.search.length < 1) {
        this.$refs.wrapper.bs.finishPullDown();
        return;
      }
      this.flag = false;
      this.page = 1;
      this.list = [];
      this.getHomeData({ page: this.page, key: this.search });
    },
  },
};
</script>

<style lang="less" scoped>
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