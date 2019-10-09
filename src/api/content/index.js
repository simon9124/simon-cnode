import fly from '@/utils/fly.mock';
// import fly from '@/utils/fly';

// 获取页面内容 - api
export function getContentApi () {
  return fly.request('content/getContentApi', null, {
    method: 'get'
  });
}
