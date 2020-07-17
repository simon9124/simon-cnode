import fly from "@/utils/fly";
import flyGithub from "@/utils/fly.github";

// 根据id获取文章内容
export function getUser(name) {
  return fly.request(`user/${name}`, null, {
    method: "get",
  });
}

// 获取页面内容 - api
export function getGithubPerson(name) {
  return flyGithub.request(`users/${name}`, null, {
    method: "get",
  });
}
