<template>
  <div class="setusername">
    <van-nav-bar
      title="修改昵称"
      left-text="返回"
      left-arrow
      @click-left="fanhui"
    />

    <van-cell-group>
      <van-field v-model="updataUsernames" label="昵称" />
    </van-cell-group>
    <button @click="updaName">确认修改</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { updataUsername } from "../ajax/Api";
export default {
  data() {
    return {
      name: "",
    };
  },
  created() {
    this.name = this.userInfo?.nickname;
  },
  methods: {
    ...mapMutations(["updataUsername"]),
    fanhui() {
      this.updataUsername(this.name);
      this.$router.back();
    },
    async updaName() {
      const res = await updataUsername(this.userInfo.nickname);
      this.$router.replace("/me");
    },
  },
  computed: {
    ...mapState(["userInfo"]),
    updataUsernames: {
      get() {
        return this.userInfo?.nickname;
      },
      set(newValue) {
        this.updataUsername(newValue);
        return this.userInfo?.nickname;
      },
    },
  },
};
</script>

<style lang="less" scoped>
button {
  width: 100%;
  height: 50px;
  background-color: rgb(0, 196, 105);
  color: white;
  border: none;
}
</style>