<template>
  <div class="container-header">
    <div class="container-header-inner">

      <!-- logo -->
      <img src="http://static2.cnodejs.org/public/images/cnodejs_light.svg">

      <!-- search -->
      <input :value="searchValue" />

      <!-- 头部导航栏 -->
      <tab></tab>

    </div>
  </div>
</template>

<script>
// components
import Tab from '@/components/Header/tab';

export default {
  components: {
    Tab
  },
  data () {
    return {
      searchValue: ''
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container-header {
  position: relative;
  background: #444;
  &-inner {
    width: 90%;
    margin: auto;
    padding: 5px;
    img {
      width: 120px;
      height: 28px;
      padding: 10px 0;
    }
    input {
      font-size: 13px;
      width: 233px;
      height: 26px;
      background: url("../../../static/images/Search.png") no-repeat #888;
      padding-left: 20px;
      border-radius: 15px;
    }
  }
}
</style>
