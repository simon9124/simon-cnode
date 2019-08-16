<template>
  <div class="container">
    <header-container></header-container>
    <content-container></content-container>
  </div>
</template>

<script>
// components
import HeaderContainer from '@/components/Header';
import ContentContainer from '@/components/Content';

export default {
  components: {
    HeaderContainer,
    ContentContainer
  },
  data () {
    return {};
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  height: 100%;
  background-color: #e1e1e1;
}
</style>
