<template>
  <div class="container">
    <header-container></header-container>
    <content-container></content-container>
  </div>
</template>

<script>
// components
import HeaderContainer from "@/components/Header";
import ContentContainer from "@/components/Content";

export default {
  components: {
    HeaderContainer,
    ContentContainer
  },
  data () {
    return {
      shareTitle: "cnode中文社区" // 转发的标题
    };
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
