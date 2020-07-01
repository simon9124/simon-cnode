import fly from "@/utils/fly";
import flyMock from "@/utils/fly.mock";

// 获取页面内容 - 首页
export function getHomeContent(tab, limit, page) {
  return fly.request(`topics?tab=${tab}&limit=${limit}&page=${page}`, null, {
    method: "get",
  });
}

// 获取页面内容 - api
export function getContentApi() {
  return flyMock.request("content/getContentApi", null, {
    method: "get",
  });
}
