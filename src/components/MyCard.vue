<template>
  <div class="mycard" @click="listItem()">
    <div class="img"><img v-lazy="imgUrl" alt="" /></div>
    <p>{{ title }}</p>
    <span>{{ price | mapPrice }}</span>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
    },
    title: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
  },
  methods: {
    listItem() {
      this.$emit("clickListItem");
    },
  },
  filters: {
    mapPrice(price) {
      return `￥${price.toFixed(2)}`;
    },
  },
};
</script>

<style lang="less" scoped>
.mycard {
  border: 1px solid #bbb;
  border-radius: 10px;
  margin: 5px 0;
  padding: 5px;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 14px;
  }
  .img {
    width: 100%;
    height: 178px;
    text-align: center;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  span {
    font-size: 12px;
    color: red;
  }
}
</style>