import { useState } from 'react';
import { Button, Form, Input, Spin, message, Modal } from 'antd';
import {
  LockOutlined,
  UserOutlined,
  ExclamationCircleOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { useModel, history } from 'umi';
import { useRequest, useCountDown, useTitle } from 'ahooks';
import formPattern from '@/config/formPattern';
import {
  phoneRegisterRequest,
  sendSmsRequest,
} from '@/services/loginController';
import config from '@/config';
import Cookies from 'js-cookie';

const { Search } = Input;

const RegisterPage: React.FC = () => {
  useTitle(`注册 - ${config.name}`);
  const [form] = Form.useForm();

  // 验证码倒计时
  const [showCountDown, setShowCountDown] = useState<boolean>(false);
  const [targetDate, setTargetDate] = useState<number>();
  const [, formattedRes] = useCountDown({
    targetDate,
    onEnd: () => {
      setShowCountDown(false);
    },
  });
  const { setInitialState } = useModel('@@initialState');

  // 发送验证码
  const { loading: sendSmsLoading, run: sendSmsRun } = useRequest(
    sendSmsRequest,
    {
      manual: true,
      onSuccess: (result) => {
        if (result.success) {
          setShowCountDown(true);
          setTargetDate(Date.now() + 60 * 1000);
          message.success(`演示需要，验证码:${result.data?.code}`);
        }
      },
    },
  );
  const onSmsSearch = () => {
    form
      .validateFields(['phone'])
      .then((values) => {
        sendSmsRun(values);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 短信注册
  const { loading: loginLoading, run } = useRequest(phoneRegisterRequest, {
    manual: true,
    onSuccess: async (result) => {
      if (result.success) {
        Cookies.set(config.token, result.data?.token as string, { expires: 7 });
        setInitialState(result.data);
        Modal.info({
          title: '提示',
          icon: <ExclamationCircleOutlined />,
          content: '注册成功，请完善个人信息',
          okText: '确定',
          onOk() {
            history.push('/user/info');
          },
        });
      }
    },
  });
  const onFinish = async (values: any) => {
    console.log(values);
    run(values);
  };

  return (
    <Spin spinning={loginLoading}>
      <Form form={form} name="login" size="large" onFinish={onFinish}>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: '请输入手机号！' },
            {
              pattern: formPattern.phonePattern,
              message: '请输入正确格式的手机号',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            allowClear
            placeholder="请输入手机号"
          />
        </Form.Item>
        <Form.Item
          name="sms"
          rules={[
            { required: true, message: '请输入验证码！' },
            {
              pattern: formPattern.smsPattern,
              message: '请输入正确格式的验证码',
            },
          ]}
          dependencies={['phone']}
        >
          <Search
            prefix={<LockOutlined />}
            placeholder="请输入验证码"
            allowClear
            enterButton={
              <Button
                type="primary"
                loading={sendSmsLoading}
                disabled={showCountDown}
              >
                {showCountDown
                  ? `${formattedRes.seconds}秒后重新获取`
                  : '发送验证码'}
              </Button>
            }
            onSearch={onSmsSearch}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码！' },
            {
              pattern: formPattern.passwordPattern,
              message: '密码为6~20位的大小写祖母、数字！',
            },
          ]}
        >
          <Input.Password
            prefix={<SafetyOutlined />}
            allowClear
            placeholder="请输入密码"
          />
        </Form.Item>
        <Form.Item
          name="cPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入密码！' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('请确保两次输入代码一致！'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<SafetyOutlined />}
            allowClear
            placeholder="请再次输入密码"
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

export default RegisterPage;
