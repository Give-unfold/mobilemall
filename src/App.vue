<template>
  <div id="app">
    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>

    <my-tabbar bgc="#eee" jcolor="" v-if="$route.meta.isShow">
      <!-- to为跳转地址,icon为字体图标类名,tag为自定义标签 -->
      <my-tabbar-item icon="icon-home">首页</my-tabbar-item>
      <my-tabbar-item to="/cart" icon="icon-cart">购物车</my-tabbar-item>
      <my-tabbar-item to="/me" icon="icon-user">我的</my-tabbar-item>
    </my-tabbar>
  </div>
</template>

<script>
import MyTabbar from "./components/MyTabbar.vue";
import MyTabbarItem from "./components/MyTabbarItem.vue";

export default {
  components: { MyTabbar, MyTabbarItem },
};
</script>


<style lang="less">
@import url("./assets/css/test.css");
@import url("./assets/font/style.css");
.router-link-active {
  color: #1989fa !important;
}
</style>
