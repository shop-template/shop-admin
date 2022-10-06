const userList = [
  {
    id: 1,
    name: 'admin',
    label: '樊小书生',
    access: 'admin',
    token: 'tokenadmin',
    account: '11122223333',
    headerImg: 'https://img.fxss.work/header-1583418772000-23-production',
  },
  {
    id: 2,
    name: 'zhangsan',
    label: '张三',
    access: 'user',
    token: 'tokenzhangsan',
    account: '11144445555',
    headerImg: 'https://img.fxss.work/header-1583418772000-23-production',
  },
];

export default {
  'post /api/login': (req: any, res: any) => {
    const { username } = req.body;
    const curUser = userList.find(
      (x) => x.name === username || x.account === username,
    );
    if (curUser) {
      setTimeout(() => {
        res.json({
          success: true,
          data: curUser,
          errorCode: 0,
        });
      }, 1500);
    } else {
      res.json({
        success: false,
        data: {},
        errorCode: 1,
        errorMessage: '用户不存在',
      });
    }
  },
  'post /api/user': (req: any, res: any) => {
    const curUser = userList.find((x) => x.token === req.headers.token);
    if (curUser) {
      res.json({
        success: true,
        data: curUser,
        errorCode: 0,
      });
    } else {
      res.json({
        success: false,
        data: {},
        errorCode: 1,
        errorMessage: '用户不存在',
      });
    }
  },
};
