import { request } from '@umijs/max';

export async function tokenToUserRequest() {
  return request<API.ResultTokenUserInfo>('/api/user', {
    method: 'POST',
  });
}

export async function userListRequest() {
  return request<API.ResultTokenUserInfo[]>('/api/userList', {
    method: 'POST',
  });
}
