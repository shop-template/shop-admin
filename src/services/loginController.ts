import { request } from '@umijs/max';

export async function loginRequest(body: API.AccountLoginForm) {
  return request<API.ResultLoginInfo>('/api/login', {
    method: 'POST',
    data: body,
  });
}
