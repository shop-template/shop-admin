import { request } from '@umijs/max';

export async function loginRequest(body: API.AccountLoginForm) {
  return request<API.ResultLoginInfo>('/api/login', {
    method: 'POST',
    data: body,
  });
}

export async function sendSmsLoginRequest(body: API.SendSmsBody) {
  return request<API.SendSmsResultInfo>('/api/sendSmsLogin', {
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

export async function sendSmsRequest(body: API.SendSmsBody) {
  return request<API.SendSmsResultInfo>('/api/sendSms', {
    method: 'POST',
    data: body,
  });
}

export async function phoneRegisterRequest(body: API.PhoneRegisterBody) {
  return request<API.PhoneRegisterResultInfo>('/api/phoneRegister', {
    method: 'POST',
    data: body,
  });
}
