<template>
  <div class="container-content-common">

    <scroll-view scroll-y>

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <home-back></home-back>
          <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
          <span>{{isLogin?'登录':'找回密码'}}</span>
        </div>
      </div>

      <!-- content -->
      <div class='container-content-common-content'>

        <!-- 登录 -->
        <div v-if="isLogin"
             class="login-form">

          <!-- 用户名 -->
          <div class="login-form-label">
            用户名
          </div>
          <div class="login-form-input">
            <input @input="inputRef($event,'username')"
                   placeholder="请输入（最多20位）"
                   maxlength="20">
            <!-- <mp-input v-model="formData.username"
                      placeholder=""></mp-input> -->
          </div>

          <!-- 密码 -->
          <div class="login-form-label">
            密码
          </div>
          <div class="login-form-input relative">
            <input class="password"
                   @input="inputRef($event,'password')"
                   placeholder="请输入（最多20位）"
                   maxlength="20"
                   :type="passwordShow?'text':'password'">
            <img v-show="!passwordShow"
                 class="password-img absolute"
                 src="../../../static/images/password-not-view.png"
                 @click="passwordToggle">
            <img v-show="passwordShow"
                 class="password-img absolute"
                 src="../../../static/images/password-view.png"
                 @click="passwordToggle">

            <!-- <mp-input v-model="formData.password"
                      placeholder=""
                      password></mp-input> -->
          </div>

          <!-- 按钮 -->
          <div class="login-form-buttons">
            <mp-button type="default"
                       size="small"
                       btnClass="login-button"
                       @click="handleLogin">登录</mp-button>
            <mp-button type="default"
                       size="small"
                       btnClass="login-button">通过 GitHub 登录</mp-button>
            <span class="link"
                  @click="isLogin=false">忘记密码了？</span>
          </div>

        </div>

        <!-- 找回密码 -->
        <div v-else
             class="login-form">

          <!-- 电子邮箱 -->
          <div class="login-form-label"
               style="width:20%">
            电子邮箱
          </div>
          <div class="login-form-input"
               style="width:80%">
            <input @input="inputRef($event,'email')"
                   placeholder="请输入注册邮箱">
          </div>
          <div class="login-form-explain">请输入您注册帐户时使用的电子邮箱</div>

          <!-- 按钮 -->
          <div class="login-form-buttons">
            <mp-button type="default"
                       size="small"
                       btnClass="login-button"
                       @click="handleSubmitEmail">提交</mp-button>
          </div>

        </div>

        <!-- toast -->
        <mp-toast :type="toast.type"
                  v-model="toast.show"
                  :content="toast.content">
        </mp-toast>

      </div>

    </scroll-view>

  </div>
</template>

<script>
// function
import Bus from "@/utils/bus";
import { validateEmail } from "@/utils/validate";
// components
import HomeBack from "@/components/homeBack";
import mpButton from "mpvue-weui/src/button";
import mpInput from "mpvue-weui/src/input";
import mpToast from "mpvue-weui/src/toast";

export default {
  components: { HomeBack, mpButton, mpInput, mpToast },
  data () {
    return {
      // 页面属性：登录 or 找回密码
      isLogin: true,
      // 登录表单
      formData: {
        username: "",
        password: "",
        email: ""
      },
      // 密码显示与否
      passwordShow: false,
      // toast相关
      toast: {
        show: false,
        type: "error",
        content: ""
      }
    };
  },
  created () {
    // 接收兄弟组件事件 - 标签切换后，切换回 "isLogin" 状态
    Bus.$on("isLogin", status => {
      this.isLogin = status;
    });
  },
  methods: {
    // 监听输入框变化
    inputRef (event, type) {
      // console.log(event.mp.detail.value);
      switch (type) {
        case "username":
          this.formData.username = event.mp.detail.value;
          break;
        case "password":
          this.formData.password = event.mp.detail.value;
          break;
        case "email":
          this.formData.email = event.mp.detail.value;
          break;
      }
    },
    // 切换密码显示与否
    passwordToggle () {
      this.passwordShow = !this.passwordShow;
    },
    // 登录按钮
    handleLogin () {
      if (this.formData.username === "" || this.formData.password === "") {
        // 如果用户名或密码未填写
        this.toast = {
          show: true,
          type: "error",
          content: "用户名或密码未填写"
        };
      } else {
        // 已填写用户名和密码
        this.toast = {
          show: true,
          type: "success",
          content:
            "用户名：" +
            this.formData.username +
            "，" +
            "密码：" +
            this.formData.password
        };
      }
      console.log(this.formData);
    },
    // 提交邮箱
    handleSubmitEmail () {
      if (this.formData.email === "" || !validateEmail(this.formData.email)) {
        // 如果未填写邮箱或填写错误
        this.toast = {
          show: true,
          type: "error",
          content: "邮箱填写错误"
        };
      } else {
        // 已正确填写邮箱
        this.toast = {
          show: true,
          type: "success",
          content: this.formData.email
        };
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/common/content.scss';
.container-content-common /deep/ {
  .container-content-common-content {
    .title-main {
      margin-bottom: 0;
    }
  }
}
</style>
