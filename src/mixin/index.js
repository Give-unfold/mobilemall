import { reqHomeData } from "../ajax/Api";
export default {
  data() {
    return {
      list: [],
      page: 1,
      flag: true,
      totalPages: "",
    }
  },
  methods: {
    async getHomeData(obj) {
      const res = await reqHomeData(obj);
      this.list = [...this.list, ...res.data];
      this.$refs.wrapper.bs.refresh();
      this.totalPages = res.totalPages;
      this.flag
        ? this.$refs.wrapper.bs.finishPullUp()
        : this.$refs.wrapper.bs.finishPullDown();
    },
    pullingUp() {
      this.flag = true;
      if (this.page > this.totalPages) {
        this.$refs.wrapper.bs.finishPullUp();
        return this.$toast("没有更多内容了");
      }
      this.page++;
      this.getHomeData({ page: this.page });
    },
    // pullingDown() {
    //   this.flag = false;
    //   this.page = 1;
    //   this.list = [];
    //   this.getHomeData({ page: this.page });
    // },
  }
}