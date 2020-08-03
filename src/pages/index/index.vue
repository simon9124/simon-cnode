<template>
  <div class="container">
    <header-container></header-container>
    <content-container></content-container>
    <!-- <back-to-top></back-to-top> -->
  </div>
</template>

<script>
// components
import HeaderContainer from "@/components/Header";
import ContentContainer from "@/components/Content";
import BackToTop from "@/components/backToTop";

export default {
  components: {
    HeaderContainer,
    ContentContainer,
    BackToTop
  },
  data () {
    return {};
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
