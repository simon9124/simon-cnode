import fly from "@/utils/fly";
import flyGithub from "@/utils/fly.github";

// 根据name获取用户信息
export function getUser(name) {
  return fly.request(`user/${name}`, null, {
    method: "get",
  });
}

// 根据githubUsername获取在github的用户信息
export function getGithubPerson(name) {
  return flyGithub.request(`users/${name}`, null, {
    method: "get",
  });
}

// 根据name获取用户收藏
export function getUserCollect(name) {
  return fly.request(`topic_collect/${name}`, null, {
    method: "get",
  });
}
