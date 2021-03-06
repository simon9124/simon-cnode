let mixin = {
  data() {
    return {
      dataStack: [], // 解决mpvue相同组件数据不更新问题，建立栈堆
      scrollTop: null, // scroll-view 距离顶部的滚动高度
      backToTopDisplay: false, // "回到顶部" 是否显示
      scrollTopTemp: null, // scroll-view 距离顶部的滚动高度 - 临时变量
    };
  },
  onUnload() {
    Object.assign(this.$data, this.dataStack.pop()); // 恢复
  },
  onLoad() {
    this.dataStack.push({ ...JSON.parse(JSON.stringify(this.$data)) }); // 备份
  },
  methods: {
    // 监听scroll-view滚动
    scroll(e) {
      // console.log(e);
      this.backToTopDisplay = e.mp.detail.scrollTop > 250;
      this.scrollTopTemp = e.mp.detail.scrollTop; // 保留scrollTop滑动距离 -> 存给临时变量
    },
  },
  // 分享给好友
  onShareAppMessage(res) {
    return {
      title: this.shareTitle,
    };
  },
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: this.shareTitle,
      imageUrl: this.shareImage || "",
    };
  },
};
export default mixin;
