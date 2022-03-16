import Request from '../../../../helpers/request';
import getConfig from '../../../../helpers/config';

const config = getConfig();

const { test } = config;

export const registerApi = {
  Register: (data?: any) =>
    Request.doRequest({
      method: 'post',
      url: `${test.baseUrl}/auth/signup`,
      data: data,
    }),
};
