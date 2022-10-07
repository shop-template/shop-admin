import { request } from '@umijs/max';

export async function loginRequest(body: API.AccountLoginForm) {
  return request<API.ResultLoginInfo>('/api/login', {
    method: 'POST',
    data: body,
  });
}

export async function sendSmsLoginRequest(body: API.SendSmsLoginBody) {
  return request<API.SendSmsLoginResultInfo>('/api/sendSmsLogin', {
    method: 'POST',
    data: body,
  });
}

export async function phoneLoginRequest(body: API.PhoneLoginBody) {
  return request<API.PhoneLoginResultInfo>('/api/phoneLogin', {
    method: 'POST',
    data: body,
  });
}
