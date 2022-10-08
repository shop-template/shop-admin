import { useState } from 'react';
import { Tabs } from 'antd';
import AccountLoginForm from './components/AccountLoginForm';
import PhoneLoginForm from './components/PhoneLoginForm';
import classnames from 'classnames';

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
      <div className={classnames(loginType === 'account' ? 'block' : 'hidden')}>
        <AccountLoginForm></AccountLoginForm>
      </div>
      <div className={classnames(loginType === 'phone' ? 'block' : 'hidden')}>
        <PhoneLoginForm></PhoneLoginForm>
      </div>
    </>
  );
};

export default LoginPage;
