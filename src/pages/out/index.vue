<template>
  <web-view :src="href"></web-view>
</template>

<script>

export default {
  data () {
    return {
      href: ""
    };
  },
  onLoad () {
    this.href = this.$root.$mp.query.href;
  }
};
</script>

<style>
</style>
