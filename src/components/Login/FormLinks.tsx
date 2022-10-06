import { useEffect, useState } from 'react';
import { useLocation, Link } from 'umi';

type linksItem = {
  path: string;
  name: string;
};

const FormLinks: React.FC = () => {
  const location = useLocation();

  const [links, setLinks] = useState<linksItem[]>([]);
  useEffect(() => {
    if (location.pathname === '/layout/login') {
      setLinks([
        {
          path: '/layout/register',
          name: '注册',
        },
        {
          path: '/layout/forget',
          name: '忘记密码',
        },
      ]);
    } else if (location.pathname === '/layout/register') {
      setLinks([
        {
          path: '/layout/login',
          name: '登录',
        },
        {
          path: '/layout/forget',
          name: '忘记密码',
        },
      ]);
    } else if (location.pathname === '/layout/forget') {
      setLinks([
        {
          path: '/layout/login',
          name: '登录',
        },
        {
          path: '/layout/register',
          name: '注册',
        },
      ]);
    }
  }, [location]);

  return (
    <div className="pb-24 clear-both">
      {links.map((item, index) => (
        <Link
          key={item.path}
          to={item.path}
          className={index ? 'float-right' : 'float-left'}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default FormLinks;
