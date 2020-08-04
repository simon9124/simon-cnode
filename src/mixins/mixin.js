let mixin = {
  data() {
    return {
      dataStack: [], // 解决mpvue相同组件数据不更新问题，建立栈堆
    };
  },
  onUnload() {
    Object.assign(this.$data, this.dataStack.pop()); // 恢复
  },
  onLoad() {
    this.dataStack.push({ ...JSON.parse(JSON.stringify(this.$data)) }); // 备份
  },
};
export default mixin;
