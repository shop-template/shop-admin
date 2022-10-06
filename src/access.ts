export default (initialState: API.ResultUserInfo) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access
  return {
    isAdmin: () => initialState.access === 'admin',
  };
};
