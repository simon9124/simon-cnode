// 头部标签
const navList = [
  {
    title: "首页",
    type: "all",
  },
  {
    title: "新手入门",
    type: "new",
  },
  {
    title: "API",
    type: "api",
  },
  {
    title: "关于",
    type: "about",
  },
  {
    title: "注册",
    type: "register",
  },
  {
    title: "登录",
    type: "login",
  },
];

// 帖子标签
const tabList = [
  {
    title: "全部",
    type: "all",
  },
  {
    title: "精华",
    type: "good",
  },
  {
    title: "分享",
    type: "share",
  },
  {
    title: "问答",
    type: "ask",
  },
  {
    title: "招聘",
    type: "job",
  },
  {
    title: "客户端测试",
    type: "dev",
  },
];

const obj2style = (style) => {
  let str = [];
  Object.keys(style).forEach((key) => {
    str.push(`${key}:${style[key]};`);
  });
  return str.join(";");
};
export { navList, tabList, obj2style };
