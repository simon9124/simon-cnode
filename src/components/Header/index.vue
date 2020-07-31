<template>
  <div class="container-header">
    <div class="container-header-inner">

      <!-- logo -->
      <!-- <img src="http://static2.cnodejs.org/public/images/cnodejs_light.svg"> -->

      <!-- search -->
      <!-- <input confirm-type="search"
             :value="searchValue"
             @focus="searchFocus"
             @confirm="search($event)" /> -->

      <!-- 头部导航栏 -->
      <tab></tab>

    </div>
  </div>
</template>

<script>
// components
import Tab from "@/components/Header/tab";

export default {
  components: {
    Tab
  },
  data () {
    return {
      // 搜索框
      searchValue: ""
    };
  },
  methods: {
    // 输入框获取焦点
    searchFocus () { },
    // 点击搜索
    search (e) {
      // console.log(e.target.value);
      this.searchValue = e.target.value;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container-header {
  position: relative;
  background: #444;
  // box-sizing: border-box;
  &-inner {
    width: 90%;
    margin: auto;
    padding: 5px;
    img {
      width: 120px;
      height: 28px;
      // padding: 10px 0;
    }
    input {
      font-size: 13px;
      width: 233px;
      height: 26px;
      background: url('http://static2.cnodejs.org/public/images/search.e53b380a.hashed.png')
        4px 4px no-repeat #888;
      padding-left: 25px;
      border-radius: 15px;
    }
  }
}
</style>
