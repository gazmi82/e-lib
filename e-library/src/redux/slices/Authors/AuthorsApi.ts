import Request from '../../../helpers/request';
import getConfig from '../../../helpers/config';

const config = getConfig();

const { test } = config;

export const authorsApis = {
  fetchAuthors: (query?: any) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/autori`,
      query: query,
    }),
  createAuthor: (data: any) =>
    Request.doRequest({
      method: 'post',
      url: `${test.baseUrl}/autori/`,
      data: data,
    }),
  fetchSingleAuthor: (id: number) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/autori/${id}`,
    }),
  updateAuthor: (data: any, id: number) =>
    Request.doRequest({
      method: 'put',
      url: `${test.baseUrl}/autori/${id}`,
      data: data,
    }),
  deleteAuthor: (id: number) =>
    Request.doRequest({
      method: 'delete',
      url: `${test.baseUrl}/autori/${id}`,
    }),
};
