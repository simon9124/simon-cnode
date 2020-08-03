<template>
  <div class='back-container'
       @click="backTop">
    回到顶部
  </div>
</template>

<script>

export default {
  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop (e) {
      console.log("回到顶部");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.back-container {
  width: 24px;
  color: gray;
  font-size: 0.86em;
  line-height: 1.4em;
  text-align: center;
  padding: 12px 0 12px 5px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 12px 0 0 12px;
  border-right: 0;
  position: fixed;
  right: 0;
  bottom: 5px;
  cursor: pointer;
}
</style>
