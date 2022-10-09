import classnames from 'classnames';
import { Outlet } from 'umi';
import { Typography } from 'antd';
import FormLinks from '@/components/Login/FormLinks';
import config from '@/config';

import styles from './index.less';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  return (
    <div
      className={classnames(
        styles['login-page'],
        'box-border flex justify-center items-start',
      )}
    >
      <div className={classnames(styles['ligin-page-form-box'])}>
        <Title className="text-center truncate">{config.name}</Title>
        <Outlet></Outlet>
        <FormLinks></FormLinks>
      </div>
    </div>
  );
};

export default LoginPage;
