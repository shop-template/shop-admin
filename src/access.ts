export default (initialState: {
  currentUser?: API.ResultUserInfo;
  fetchUserInfo?: () => Promise<API.ResultUserInfo | undefined>;
}) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://next.umijs.org/docs/max/access
  const { currentUser } = initialState;
  const isAdmin = currentUser && currentUser.access === 'admin';
  console.log(isAdmin);
  return {
    isAdmin,
  };
};
