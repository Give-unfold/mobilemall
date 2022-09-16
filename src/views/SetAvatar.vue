<template>
  <div class="setAvatar">
    <van-nav-bar
      title="设置头像"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <main>
      <div class="avatar">
        <img :src="IMG_URL + userInfo.avatar" alt="" ref="img" />
      </div>
    </main>
    <input type="file" v-show="false" ref="file" @change="changefile" />
    <button @click="updaAvatar" class="xuanze">选择图片</button>
    <button @click="addAvatar">上传图片</button>
  </div>
</template>

<script>
import { IMG_URL } from "../ajax/Url";
import { uploadAvatar } from "../ajax/Api";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return { IMG_URL };
  },
  methods: {
    ...mapActions(["syncUpdataAvatar"]),
    changefile() {
      const fr = new FileReader();
      fr.readAsDataURL(this.$refs.file.files[0]);
      if (this.$refs.file.files[0].type.indexOf("image") == -1)
        return this.$toast("请选择image文件");
      fr.onload = () => {
        this.$refs.img.src = fr.result;
      };
    },
    updaAvatar() {
      this.$refs.file.click();
    },
    async addAvatar() {
      const fd = new FormData();
      fd.append("avatar", this.$refs.file.files[0]);
      if (!this.$refs.file.files[0]) return this.$toast("请先选择图片再上传");
      const res = await uploadAvatar(fd);
      this.syncUpdataAvatar(res.avatar);
      this.$toast("头像修改成功");
      console.log(res);
      this.$router.replace("/me");
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
};
</script>

<style lang="less" scoped>
main {
  height: calc(100vh - 146px);
  background-color: #f8f8f8;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ececec;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
button {
  width: 100%;
  height: 50px;
  background-color: rgb(0, 196, 105);
  color: white;
  border: none;
}
.xuanze {
  background-color: #008bfa;
}
</style>