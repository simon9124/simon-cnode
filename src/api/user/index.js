import fly from "@/utils/fly";

// 根据id获取文章内容
export function getUser(name) {
  return fly.request(`user/${name}`, null, {
    method: "get",
  });
}
