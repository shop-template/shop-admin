// 运行时配置
import type { RequestConfig } from 'umi';
import { history } from 'umi';
import Cookies from 'js-cookie';
import { tokenToUserRequest } from '@/services/userController';
import { message } from 'antd';
import config from '@/config';

const loginPath = '/layout/login';
// const isDev = process.env.NODE_ENV === 'development';

export const request: RequestConfig = {
  timeout: 3000,
  // other axios options you want
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    [
      (url, options) => {
        const noTokenApis = [
          '/api/login',
          '/api/sendSmsLogin',
          '/api/phoneLogin',
        ];
        if (!noTokenApis.includes(url)) {
          const token = Cookies.get(config.token);
          if (!token) {
            history.push({
              pathname: '/layout/login',
              // search: `?from=${window.location.pathname}`,
            });
            throw new Error('token不存在');
          }
          options.headers.token = token;
        }
        return { url, options };
      },
      (error: any) => {
        console.log(error);
        return Promise.reject(error);
      },
    ],
  ],
  responseInterceptors: [
    [
      (response) => {
        console.log(response);
        if (response.status === 200) {
          const data = response.data as API.ResponseInfo;
          if (data.success) {
            return response;
          } else {
            if (data.errorMessage) message.error(data.errorMessage);
          }
        }
        return response;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    ],
  ],
};

// 不需要根据token直接获取用户信息的白名单
const whiteList = ['/layout/login'];
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  currentUser?: API.ResultUserInfo;
  fetchUserInfo?: () => Promise<API.ResultUserInfo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const user = await tokenToUserRequest();
      return user.data as API.ResultUserInfo;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  if (!whiteList.includes(window.location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
    };
  }
  return {
    fetchUserInfo,
  };
}

export const layout = (layoutData: any) => {
  console.log(layoutData);
  const initialState: {
    currentUser?: API.ResultUserInfo;
    fetchUserInfo?: () => Promise<API.ResultUserInfo | undefined>;
  } = layoutData.initialState;
  const setInitialState = layoutData.setInitialState;
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    layout: 'mix',
    contentWidth: 'Fluid',
    fixSiderbar: true,
    logout: (initialState: {
      currentUser?: API.ResultUserInfo;
      fetchUserInfo?: () => Promise<API.ResultUserInfo | undefined>;
    }) => {
      console.log(initialState);
      Cookies.remove(config.token);
      setInitialState(
        (s: {
          currentUser?: API.ResultUserInfo;
          fetchUserInfo?: () => Promise<API.ResultUserInfo | undefined>;
        }) => ({
          ...s,
          currentUser: {
            id: 0,
            name: '',
            label: '',
            access: '',
            token: '',
            account: '',
            avatar: '',
          },
        }),
      );
      message.success('退出成功');
      history.push('/layout/login');
    },
    avatarProps: {
      src: initialState.currentUser?.avatar,
      title: initialState.currentUser?.label,
    },
    // rightRender: () => {
    //   return (
    //     <>
    //       {/* <div>
    //         <Avatar size={30} src={initialState.currentUser?.avatar} alt="用户头像" />
    //         <span>{initialState.currentUser?.label}</span>
    //       </div> */}
    //     </>
    //   );
    // },
  };
};
