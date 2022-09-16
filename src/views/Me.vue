<template>
  <div class="me">
    <header>
      <div class="img">
        <span v-if="!isLogin" @click="toLogin"><i class="icon-user"></i></span>
        <img :src="IMG_URL + userInfo?.avatar" alt="" v-else />
      </div>
      <span @click="toLogin" v-if="!isLogin">请登录</span>
      <span v-else>{{ userInfo?.nickname }}</span>
    </header>
    <div class="centen">
      <div class="box">
        <p><van-icon name="pending-payment" /></p>
        <span>待付款</span>
      </div>
      <div class="box">
        <p><van-icon name="records" /></p>
        <span>待发货</span>
      </div>
      <div class="box">
        <p><van-icon name="tosend" /></p>
        <span>已发货</span>
      </div>
      <div class="box">
        <p><van-icon name="logistics" /></p>
        <span>已完成</span>
      </div>
    </div>
    <ul>
      <li @click="$router.push('/orderList')">
        <p>
          <i class="icon-file-text2"></i>
          <span>我的订单</span>
        </p>
        <span>></span>
      </li>
      <li @click="$router.push('/likelist')">
        <p>
          <i class="icon-heart"></i>
          <span>我的收藏</span>
        </p>
        <span>></span>
      </li>
      <li
        @click="$router.push({ path: '/addressList', query: { from: 'me' } })"
      >
        <p>
          <i class="icon-location2"></i>
          <span>收货地址</span>
        </p>
        <span>></span>
      </li>
      <li @click="$router.push('/setting')">
        <p>
          <i class="icon-cog"></i>
          <span>用户设置</span>
        </p>
        <span>></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { IMG_URL } from "../ajax/Url";
export default {
  data() {
    return {
      IMG_URL,
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    isLogin() {
      return !!sessionStorage.getItem("token");
    },
  },
};
</script>

<style lang="less" scoped>
.me {
  header {
    height: 90px;
    background: #f37d0f;
    color: white;
    display: flex;
    & > .img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid;
      margin: 10px 0 0 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      & > span {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        font-size: 24px;
      }
    }
    span {
      margin: 25px 0 0 10px;
    }
  }
  .centen {
    display: flex;
    height: 80px;
    .box {
      text-align: center;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid #eee;
      border-right: 1px solid #eee;
      p {
        font-size: 24px;
      }
    }
  }
  & > ul {
    & > li {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 10px 16px;
      height: 24px;
      i {
        margin-right: 5px;
      }
    }
  }
}
</style>