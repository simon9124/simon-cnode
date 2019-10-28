import fly from '@/utils/fly';

// 获取页面内容 - api
export function getHomeContent(tab, limit, page) {
  return fly.request(`topics?tab=${tab}&limit=${limit}&page=${page}`, null, {
    method: 'get'
  });
}

// 根据id获取文章内容
export function getArticle(id) {
  return fly.request(`topic/${id}`, null, {
    method: 'get'
  });
}
