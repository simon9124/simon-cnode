import fly from "@/utils/fly";

// 获取页面内容 - 首页
export function getHomeContent(tab, limit, page) {
  return fly.request(`topics?tab=${tab}&limit=${limit}&page=${page}`, null, {
    method: "get",
  });
}
