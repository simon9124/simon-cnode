<template>
  <div class="page">
    <span class="page-block center"
          @click="getData(1)">{{'«'}}</span>
    <span v-if="pageList[2]-2>1"
          class="page-block center">...</span>
    <span v-for="pageNum in pageList"
          :key="pageNum"
          class="page-block center"
          :style="{color:pageNum===page?'#80bd01':'#778087'}"
          @click="getData(pageNum)">{{pageNum}}</span>
    <span v-if="pageMax-pageList[2]>2"
          class="page-block center">...</span>
    <span class="page-block center"
          @click="getData(pageMax)">{{'»'}}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 页码总数
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
      default: 10
    },
  },
  data () {
    return {
      pageList: [], // 页码列表
      pageCurrent: 1, // 当前页码
      pageMax: 0 // 最大页数
    };
  },
  onLoad () {
    this.initData();
  },
  methods: {
    initData () {
      this.$nextTick(() => {
        this.pageList = []; // 清空页码
        this.pageMax = Math.ceil(this.total / this.limit); //
        var i = 1;
        do {
          this.pageList.push(i);
          i++;
        } while (i <= this.pageMax);
        this.pageList.length > 5 && // 最多显示5页
          (this.pageList = this.pageList.slice(0, 5));
        this.pageCurrent = this.page;
      });
    },
    // 子组件事件回调：分页
    getData (pageCurrent) {
      this.pageCurrent = pageCurrent; // 当前页码添加颜色
      this.$emit("getData", pageCurrent);
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
