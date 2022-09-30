import { useState } from 'react';
import classnames from 'classnames';
import { Button, Checkbox, Form, Input, Typography, Tabs } from 'antd';
import config from '@/config/config';

import styles from './index.less';

const { Title } = Typography;
type LoginType = 'phone' | 'account';

const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');

  const tabItems = [
    { label: '密码登录', key: 'account' },
    { label: '手机号登录', key: 'phone' },
  ];
  return (
    <div className={styles['login-page']}>
      <div
        className={classnames(
          styles['ligin-page-form-box'],
          'p-24 border rounded',
        )}
      >
        <Title className="text-center truncate" style={{ marginBottom: 15 }}>
          {config.name}
        </Title>
        <Tabs
          items={tabItems}
          activeKey={loginType}
          centered
          onChange={(key) => setLoginType(key as LoginType)}
        />
        <Form
          name="basic"
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
