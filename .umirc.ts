import { defineConfig } from '@umijs/max';
import config from './src/config';

export default defineConfig({
  antd: {
    dark: false,
    // babel-plugin-import
    import: true,
    // less or css, default less
    style: 'less',
    configProvider: {
      locale: 'zh_CN',
    },
  },
  alias: {
    '@': require('path').resolve(__dirname, './src'),
    '@components': require('path').resolve(__dirname, './src/components'),
  },
  history: {
    type: 'browser',
  },
  metas: [
    { name: 'keywords', content: config.name },
    { name: 'description', content: config.name },
  ],
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: config.name,
  },

  routes: [
    {
      path: '/',
      redirect: '/home',
    },

    {
      name: '首页',
      path: '/home',
      icon: 'HomeOutlined',
      component: './Home',
    },

    {
      path: '/layout',
      component: '@/layouts/Login/index',
      layout: false,
      hideInMenu: true,
      routes: [
        { path: '/layout', redirect: 'layout/login' },
        {
          name: '登陆',
          path: '/layout/login',
          component: './Login',
        },
        {
          name: '注册',
          path: '/layout/register',
          component: './Register',
        },
      ],
    },

    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },

    {
      name: '用户中心',
      path: '/user',
      icon: 'UserOutlined',
      routes: [
        { path: '/user', redirect: '/user/info' },
        {
          name: '个人中心',
          path: '/user/info',
          component: './User/info.tsx',
        },
        {
          name: '用户管理',
          path: '/user/users',
          component: './User/users.tsx',
          access: 'isAdmin',
        },
      ],
    },

    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],

  npmClient: 'yarn',
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  tailwindcss: {},
});
