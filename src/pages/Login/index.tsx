import { useState } from 'react';
import { Tabs } from 'antd';
import AccountLoginForm from './components/AccountLoginForm';
import PhoneLoginForm from './components/PhoneLoginForm';

type LoginType = 'account' | 'phone';

const LoginPage: React.FC = () => {
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
        onChange={(key) => setLoginType(key as LoginType)}
      />
      {/* 密码登录 */}
      {loginType === 'account' && <AccountLoginForm></AccountLoginForm>}
      {loginType === 'phone' && <PhoneLoginForm></PhoneLoginForm>}
    </>
  );
};

export default LoginPage;
