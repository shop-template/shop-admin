import { Button, Form, Input, Spin } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useModel, history } from 'umi';
import { useRequest } from 'ahooks';
import formPattern from '@/config/formPattern';
import { loginRequest } from '@/services/loginController';
import config from '@/config/config';
import Cookies from 'js-cookie';

const LoginForm: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const { loading: loginLoading, run } = useRequest(loginRequest, {
    manual: true,
    onSuccess: (result) => {
      if (result.success) {
        setInitialState(result.data);
        Cookies.set(config.token, result.data?.token as string, { expires: 7 });
        history.push('/home');
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
          name="phone"
          rules={[
            { required: true, message: '请输入手机号！' },
            {
              pattern: formPattern.phonePattern,
              message: '请输入正确的手机号',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入验证码！' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入验证码"
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
