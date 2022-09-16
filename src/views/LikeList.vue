<template>
  <div class="likeList">
    <van-nav-bar
      title="我的收藏"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />

    <main>
      <van-cell-group>
        <van-cell
          v-for="item in likeList"
          :key="item.id"
          :title="item.name | mapText"
          :label="'￥' + item.price?.toFixed(2)"
          :icon="item.cover"
          :to="{ path: '/productInfo', query: { id: item.id } }"
          is-link
        />
      </van-cell-group>
    </main>
  </div>
</template>

<script>
import { getLikeList } from "../ajax/Api";
export default {
  data() {
    return {
      likeList: [],
    };
  },
  methods: {
    async getLikeList() {
      const res = await getLikeList();
      this.likeList = res;
      // console.log(res);
    },
  },
  created() {
    this.getLikeList();
  },
  filters: {
    mapText(a) {
      return a.split(" ")[0];
    },
  },
};
</script>

<style lang="less" scoped>
main {
  height: calc(100vh - 46px);
  overflow: auto;
  img {
    font-size: 50px;
  }
}
</style>