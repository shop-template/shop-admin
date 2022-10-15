const userList = [
  {
    id: 1,
    name: '樊小书生',
    label: 'admin',
    access: 'admin',
    token: 'tokenadmin',
    account: '11122223333',
    avatar: 'https://img.fxss.work/header-1583418772000-23-production',
  },
  {
    id: 2,
    name: '张三',
    label: 'zhangsan',
    access: 'user',
    token: 'tokenzhangsan',
    account: '11144445555',
    avatar: 'https://img.fxss.work/header-1583418772000-23-production',
  },
];

// 手机号列表
const phoneList: string[] = [];
// 验证码列表
const smsList: number[] = [];
// 获取验证码
const getSms = (phone: string) => {
  let code = String(Math.round(Math.random() * 1000000));
  if (code.length < 6) {
    code = `${code}${phone.slice(0, 6 - code.length)}`;
  }
  return Number(code);
};
const getToken = (num: number): string => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + num);
};

export default {
  // 密码登录
  'post /api/login': (req: any, res: any) => {
    const { username } = req.body;
    const curUser = userList.find(
      (x) => x.label === username || x.account === username,
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
  // 获取用户信息
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
  // 获取用户列表
  'post /api/userList': userList,
  // 登录验证码
  'post /api/sendSmsLogin': (req: any, res: any) => {
    const curUser = userList.find((x) => x.account === req.body.phone);
    if (curUser) {
      const code = getSms(req.body.phone);
      smsList.push(code);
      res.json({
        success: true,
        data: {
          code,
        },
        errorCode: 0,
        errorMessage: '',
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
  // 注册验证码
  'post /api/sendSms': (req: any, res: any) => {
    const code = getSms(req.body.phone);
    phoneList.push(req.body.phone);
    smsList.push(code);
    res.json({
      success: true,
      data: {
        code,
      },
      errorCode: 0,
      errorMessage: '',
    });
  },
  // 短信登录
  'post /api/phoneLogin': (req: any, res: any) => {
    const curUser = userList.find((x) => x.account === req.body.phone);
    if (curUser) {
      if (smsList.includes(req.body.sms * 1)) {
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
          errorMessage: '验证码有误',
        });
      }
    } else {
      res.json({
        success: false,
        data: {},
        errorCode: 1,
        errorMessage: '用户不存在',
      });
    }
  },
  // 手机号注册
  'post /api/phoneRegister': (req: any, res: any) => {
    if (phoneList.includes(req.body.phone)) {
      if (smsList.includes(req.body.sms * 1)) {
        const user = {
          id: userList[userList.length - 1].id + 1,
          name: '',
          label: '',
          access: 'user',
          token: getToken(10),
          account: req.body.phone,
          avatar: '',
        };
        userList.push(user);
        res.json({
          success: true,
          data: user,
          errorCode: 0,
        });
      } else {
        res.json({
          success: false,
          data: {},
          errorCode: 1,
          errorMessage: '验证码有误',
        });
      }
    }
  },
};
