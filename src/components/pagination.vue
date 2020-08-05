<template>
  <div class="page">
    <span class="page-block center"
          @click="pageChange(1)">{{'«'}}</span>
    <span v-if="pageList[2]-2>1"
          class="page-block center">...</span>
    <span v-for="pageNum in pageList"
          :key="pageNum"
          class="page-block center"
          :style="{color:pageNum===page?'#80bd01':'#778087'}"
          @click="pageChange(pageNum)">{{pageNum}}</span>
    <span v-if="pageMax-pageList[2]>2"
          class="page-block center">...</span>
    <span class="page-block center"
          @click="pageChange(pageMax)">{{'»'}}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 内容总数
    total: {
      type: Number,
      default: 0
    },
    // 每页数量
    limit: {
      type: Number,
      default: 10
    },
    // 当前页码
    page: {
      type: Number,
      default: 1
    },
  },
  data () {
    return {
      pageList: [] // 页码列表
    };
  },
  computed: {
    // 最大页数
    pageMax () {
      return Math.ceil(this.total / this.limit);
    },
  },
  onLoad () {
    this.initData();
  },
  onUnload () {
    // Fixbug-Watcher: 关闭页面时 Watcher 没有被取消订阅，再次进入页面会出现重复订阅的情况
    let watcherId = -1;
    if (this._watcher) {
      watcherId = this._watcher.id;
      this._watcher.teardown();
    }
    let i = this._watchers.length;
    while (i--) {
      if (this._watchers[i].id === watcherId) {
        this._watchers[i].teardown();
      }
    }
  },
  methods: {
    initData () {
      this.pageList = []; // 清空页码
      var i = 1;
      do {
        this.pageList.push(i);
        i++;
      } while (i <= this.pageMax);
      this.pageList.length > 5 && // 最多显示5页
        (this.pageList = this.pageList.slice(0, 5));
    },
    // 子组件事件回调：分页
    pageChange (pageCurrent) {
      this.$emit("page-change", pageCurrent);
    },
  },
  watch: {
    // 监听页码变化 -> 页码列表更新
    page (val) {
      if (val <= 3) {
        this.pageList = [];
        var i = 1;
        do {
          this.pageList.push(i);
          i++;
        } while (i <= this.pageMax);
        this.pageList.length > 5 && // 最多显示5页
          (this.pageList = this.pageList.slice(0, 5));
      } else if (val === this.pageMax) {
        this.pageList = [val - 2, val - 1, val];
      } else if (val === this.pageMax - 1) {
        this.pageList = [val - 2, val - 1, val, val + 1];
      } else {
        this.pageList = [val - 2, val - 1, val, val + 1, val + 2];
      }
    },
    // 监听页码变化 -> 总数更新
    total (val) {
      this.initData();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.page {
  padding: 10px;
  background-color: #fff;

  &-block {
    display: inline-block;
    width: 30px;
    height: 28px;
    padding: 4px 8px;
    font-size: 0.8em;
    line-height: 18px;
    border: 1px solid #ddd;
    border-right: none;
    box-sizing: border-box;

    &:first-child {
      width: 34px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    &:last-child {
      width: 34px;
      border-right: 1px solid #ddd;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
