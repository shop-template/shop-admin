import { Button, Form, Input, Spin, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';
import { useRequest } from 'ahooks';
import formPattern from '@/config/formPattern';
import { loginRequest } from '@/services/loginController';
import config from '@/config';
import Cookies from 'js-cookie';

const { Password } = Input;

const LoginForm: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  // 密码登录
  const { loading: loginLoading, run } = useRequest(loginRequest, {
    manual: true,
    onSuccess: async (result) => {
      if (result.success) {
        message.success('登录成功');
        Cookies.set(config.token, result.data?.token as string, { expires: 7 });
        await fetchUserInfo();
        // 延迟跳转，否则路由权限有误
        setTimeout(() => {
          history.push('/');
        }, 300);
      }
    },
  });
  const onFinish = async (values: any) => {
    run(values);
  };

  return (
    <Spin spinning={loginLoading}>
      <Form name="login" size="large" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名！' },
            {
              pattern: formPattern.namePattern,
              message: '用户名包含大小写字母、数字！',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            allowClear
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码！' }]}
        >
          <Password
            prefix={<LockOutlined />}
            allowClear
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item className="mb-16">
          <Button type="primary" htmlType="submit" block loading={loginLoading}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default LoginForm;
