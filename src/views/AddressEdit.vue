<template>
  <div class="addressEdit">
    <van-nav-bar
      :title="isAdd ? '保存地址' : '新增地址'"
      left-text="返回"
      left-arrow
      fixed
      @click-left="$router.back()"
    />

    <van-address-edit
      :area-list="areaList"
      :show-delete="isAdd"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @click-area="clickArea"
      :address-info="addressInfo"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqAreaList, addCreate, updaCreate, deleteCreate } from "../ajax/Api";
export default {
  data() {
    return {
      areaList: {},
    };
  },
  computed: {
    ...mapState(["userInfo"]),
    isAdd() {
      return this.$route.query.id != 0;
    },
    addressInfo() {
      return this.$route.query.id != "0"
        ? this.userInfo.addressList
            ?.filter((item) => item.id == this.$route.query.id)
            .map(
              ({
                name,
                mobile: tel,
                detail: addressDetail,
                province,
                city,
                county,
              }) => ({
                name,
                tel,
                addressDetail,
                province,
                city,
                county,
              })
            )[0]
        : {};
    },
  },
  methods: {
    async clickArea() {
      this.areaList = await reqAreaList();
    },
    async onSave({
      name,
      province,
      city,
      county: country,
      addressDetail: detail,
      tel: mobile,
      areaCode: code,
    }) {
      this.$toast("保存地址成功");
      this.$route.query.id == "0"
        ? await addCreate({
            name,
            province,
            city,
            country,
            detail,
            mobile,
            code,
          })
        : await updaCreate(this.$route.query.id, {
            name,
            province,
            city,
            country,
            detail,
            mobile,
            code,
          });
      this.$router.back();
    },
    async onDelete() {
      await deleteCreate(this.$route.query.id);
      this.$toast("delete");
      this.$router.back();
    },
    onChangeDetail(val) {},
  },
};
</script>

<style lang="less" scoped>
.van-address-edit {
  margin-top: 46px;
}
</style>