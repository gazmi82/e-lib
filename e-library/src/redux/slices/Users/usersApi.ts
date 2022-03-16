import Request from '../../../helpers/request';
import getConfig from '../../../helpers/config';

const config = getConfig();

const { test } = config;

export const usersApis = {
  fetchUsers: (query?: any) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/perdorues`,
      query: query || {},
    }),

  fetchSingleUser: (id?: number) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/perdorues/${id}`,
    }),

  deleteUser: (id?: number) =>
    Request.doRequest({
      method: 'delete',
      url: `${test.baseUrl}/perdorues/${id}`,
    }),
  updateUserRole: (data: any, id?: number) =>
    Request.doRequest({
      method: 'put',
      url: `${test.baseUrl}/perdorues/aktivizo/${id}`,
      data: data,
    }),
};
