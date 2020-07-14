<template>
  <div class="container-content-common">

    <scroll-view scroll-y>

      <!-- header -->
      <div class='container-content-common-header'>
        <div class='breadcrumb'>
          <span href='/'
                class="breadcrumb-dashboard">主页</span>
          <span class="breadcrumb-slant">&nbsp;/&nbsp;</span>
          <span>API</span>
        </div>
      </div>

      <!-- content -->
      <div class='container-content-common-content'>

        <!-- 引子 -->
        <div class="intro">
          <div class="txt">
            <p>以下 api 路径均以 <a class="bold"
                 href="https://cnodejs.org/api/v1">https://cnodejs.org/api/v1</a> 为前缀</p>
            <p>update 2019-03-21：涉及发帖和发评论的接口都已经下线了，太多人为了测试客户端乱发帖了。</p>
          </div>
        </div>

        <!-- 动态内容 -->
        <div class="block"
             v-for="(item,index) in content"
             :key="item.title_main">

          <!-- 主标题 -->
          <div class="title title-main bold">{{item.title_main}}</div>

          <!-- 主标题下属内容：topic -->
          <div v-for="(topic,_index) in item.topic"
               :key="topic.title_sub">

            <!-- 副标题 -->
            <div class="title title-sub bold">{{topic.title_sub}}</div>

            <!-- 副标题下属内容 -->
            <div class="txt">

              <!-- 介绍 -->
              <p>{{topic.txt}}</p>

              <!-- 行 -->
              <p>
                <ul>
                  <li v-for="(li,__index) in topic.txt_list"
                      :key="li"
                      style="white-space: pre-wrap;"
                      v-html="li"></li>
                </ul>
              </p>

              <!-- 示例 -->
              <p v-if="topic.example!==undefined">示例：
                <a href="#">{{topic.example}}</a>
              </p>

              <!-- 返回值 -->
              <p v-if="topic.result_example!==undefined">返回值示例：
                <pre>
                <div class="topic-pre">
                  <code style="white-space: pre-wrap;"
                        v-html="topic.result_example"></code>
                </div>
                </pre>
              </p>

            </div>

          </div>

          <!-- 主标题下属内容：txt_main -->
          <div v-if="item.txt_main!==undefined"
               class="txt">
            <p>{{item.txt_main}}</p>
          </div>

        </div>

      </div>

    </scroll-view>

  </div>
</template>

<script>
// mockData
import { APIData } from "./mockContent";

export default {
  data () {
    return {
      content: APIData
    };
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/common/content.scss';
</style>
