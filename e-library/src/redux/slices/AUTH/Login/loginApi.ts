import Request from '../../../../helpers/request';
import getConfig from '../../../../helpers/config';

const config = getConfig();

const { test } = config;

export const loginApi = {
  Login: (data?: any) =>
    Request.doRequest({
      method: 'post',
      url: `${test.baseUrl}/auth/login`,
      data: data,
    }),
};
