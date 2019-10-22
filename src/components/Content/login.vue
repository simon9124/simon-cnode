<template>
  <div class="container-content-common">

    <scroll-view scroll-y>

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <span href='/'
                class="breadcrumb-dashboard">主页</span>
          <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
          <span>登录</span>
        </div>
      </div>

      <!-- content -->
      <div class='container-content-common-content'>

        <div class="login-form">

          <!-- 用户名 -->
          <div class="login-form-label">
            用户名
          </div>
          <div class="login-form-input">
            <mp-input v-model="formData.username"></mp-input>
          </div>

          <!-- 密码 -->
          <div class="login-form-label">
            密码
          </div>
          <div class="login-form-input">
            <mp-input v-model="formData.password"></mp-input>
          </div>

          <!-- 按钮 -->
          <div class="login-form-buttons">
            <mp-button type="default"
                       size="small"
                       btnClass="login-button">登录</mp-button>
            <mp-button type="default"
                       size="small"
                       btnClass="login-button">通过 GitHub 登录</mp-button>
            <span class="link">忘记密码了？</span>
          </div>
        </div>

      </div>

    </scroll-view>

  </div>
</template>

<script>
import mpButton from 'mpvue-weui/src/button';
import mpInput from 'mpvue-weui/src/input';

export default {
  components: { mpButton, mpInput },
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {}
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/common/content.scss";
.container-content-common /deep/ {
  .container-content-common-content {
    .title-main {
      margin-bottom: 0;
    }
  }
}
</style>
