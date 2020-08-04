<template>
  <div class='back-container'
       @click="backTop"
       v-show="backToTopDisplay">
    回到顶部
  </div>
</template>

<script>
export default {
  props: {
    // 是否显示
    backToTopDisplay: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    // 子组件事件回调：回到顶部
    backTop (e) {
      this.$emit("back-top", 0);
    }
  }
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
  bottom: 30px;
  cursor: pointer;
  animation: fade-in;
  animation-duration: 0.5s;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  } /*初始状态 透明度为0*/
  40% {
    opacity: 0;
  } /*过渡状态 透明度为0*/
  100% {
    opacity: 1;
  } /*结束状态 透明度为1*/
}
</style>
