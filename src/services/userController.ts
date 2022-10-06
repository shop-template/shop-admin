import { request } from '@umijs/max';

export async function tokenToUserRequest() {
  return request<API.ResultTokenUserInfo>('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
