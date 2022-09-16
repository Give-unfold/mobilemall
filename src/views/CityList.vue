<template>
  <div class="citylist">
    <van-nav-bar
      title="选择城市"
      :left-text="positionCity"
      left-arrow
      @click-left="$router.back()"
    />

    <van-index-bar>
      <div v-for="(value, keys) in cityList" :key="keys">
        <van-index-anchor :index="keys" />
        <van-cell
          :title="item.name"
          v-for="item in value"
          :key="item.id"
          @click="cityListChangeCity(item.name)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  created() {},
  methods: {
    ...mapMutations(["changePositionCity"]),
    cityListChangeCity(name) {
      this.changePositionCity(name);
      this.$router.back();
    },
  },
  computed: {
    ...mapState(["positionCity", "cityList"]),
  },
};
</script>

<style lang="less" scoped>
.van-nav-bar__content {
  position: fixed !important;
  top: 0;
  left: 0;
}
.van-index-bar {
  height: calc(100vh - 46px);
  overflow: auto;
}
</style>