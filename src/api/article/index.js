import fly from "@/utils/fly";

// 根据id获取文章内容
export function getArticle(id) {
  return fly.request(`topic/${id}`, null, {
    method: "get",
  });
}
