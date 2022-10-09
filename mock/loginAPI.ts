const userList = [
  {
    id: 1,
    name: 'admin',
    label: '樊小书生',
    access: 'admin',
    token: 'tokenadmin',
    account: '11122223333',
    avatar: 'https://img.fxss.work/header-1583418772000-23-production',
  },
  {
    id: 2,
    name: 'zhangsan',
    label: '张三',
    access: 'user',
    token: 'tokenzhangsan',
    account: '11144445555',
    avatar: 'https://img.fxss.work/header-1583418772000-23-production',
  },
];

// const phoneList: string[] = []
const smsList: number[] = [];
const getSms = (phone: string) => {
  let code = String(Math.round(Math.random() * 1000000));
  if (code.length < 6) {
    code = `${code}${phone.slice(0, 6 - code.length)}`;
  }
  return Number(code);
};

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
  'post /api/phoneLogin': (req: any, res: any) => {
    const curUser = userList.find((x) => x.account === req.body.phone);
    console.log(req.body.sms);
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
};
