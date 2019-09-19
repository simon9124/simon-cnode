import fly from '@/utils/fly.mock';

// 新增
export function getContentApi () {
  return fly.request({
    url: '/content/getContentApi',
    method: 'get'
  });
}
