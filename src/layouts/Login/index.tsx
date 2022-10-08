import classnames from 'classnames';
import { Outlet } from 'umi';
import { Typography } from 'antd';
import FormLinks from '@/components/Login/FormLinks';
import config from '@/config';

import styles from './index.less';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div className={classnames(styles['login-page'], 'box-border')}>
      <div
        className={classnames(
          styles['ligin-page-form-box'],
          'p-24 border border-gray-200 rounded',
        )}
      >
        <Title className="text-center truncate" style={{ marginBottom: 15 }}>
          {config.name}
        </Title>
        <Outlet></Outlet>
        <FormLinks></FormLinks>
      </div>
    </div>
  );
};

export default LoginPage;
