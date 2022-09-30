import { defineConfig } from '@umijs/max';
import config from './src/config/config';

export default defineConfig({
  antd: {
    dark: false,
    // babel-plugin-import
    import: true,
    // less or css, default less
    style: 'less',
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
      component: './Home',
    },

    {
      name: '登陆',
      path: '/login',
      component: './Login',
      menuRender: false,
      hideInMenu: true,
    },

    {
      name: '权限演示',
      path: '/access',
      component: './Access',
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
