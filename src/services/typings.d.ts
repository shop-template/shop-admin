declare namespace API {
  interface ResponseInfo {
    success?: boolean;
    errorMessage?: string;
    errorCode?: number;
    data?: any;
  }

  interface AccountLoginForm {
    username: string;
    password: string;
  }

  interface ResultUserInfo {
    id: number;
    name: string;
    label: string;
    access: string;
    token: string;
    account: string;
    headerImg: string;
  }

  interface ResultLoginInfo {
    success?: boolean;
    errorMessage?: string;
    errorCode?: number;
    data?: ResultUserInfo;
  }

  interface ResultTokenUserInfo {
    success?: boolean;
    errorMessage?: string;
    errorCode?: number;
    data?: ResultUserInfo;
  }

  interface SendSmsLoginBody {
    phone: string;
  }

  interface SendSmsLoginResultInfo {
    success?: boolean;
    errorMessage?: string;
    errorCode?: number;
    data?: {
      code: string;
    };
  }

  interface PhoneLoginBody {
    phone: string;
    code: string;
  }

  interface PhoneLoginResultInfo {
    success?: boolean;
    errorMessage?: string;
    errorCode?: number;
    data?: ResultUserInfo;
  }
}
