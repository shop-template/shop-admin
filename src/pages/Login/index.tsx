import { useState } from 'react';
import { Tabs } from 'antd';
import { useTitle } from 'ahooks';
import AccountLoginForm from './components/AccountLoginForm';
import PhoneLoginForm from './components/PhoneLoginForm';
import config from '@/config';

type LoginType = 'account' | 'phone';

const LoginPage: React.FC = () => {
  useTitle(`登录 - ${config.name}`);
  const [loginType, setLoginType] = useState<LoginType>('account');

  const tabItems = [
    { label: '密码登录', key: 'account' },
    { label: '短信登录', key: 'phone' },
  ];

  return (
    <>
      <Tabs
        items={tabItems}
        activeKey={loginType}
        centered
        size="large"
        style={{ marginTop: -15 }}
        onChange={(key) => setLoginType(key as LoginType)}
      />
      {loginType === 'account' && <AccountLoginForm></AccountLoginForm>}
      {loginType === 'phone' && <PhoneLoginForm></PhoneLoginForm>}
    </>
  );
};

export default LoginPage;
