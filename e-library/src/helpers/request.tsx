import axios, { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

const api = axios.create({});

api.interceptors.request.use((requestConfig: AxiosRequestConfig) => {
  const idToken = localStorage.getItem('idToken');

  const headers = {
    Authorization: '',
    'Access-Control-Allow-Origin': '*',
  };

  if (idToken) {
    headers.Authorization = `Bearer ${idToken}`;
  }

  requestConfig.headers = { ...requestConfig.headers, ...headers };

  return requestConfig;
});

class Request {
  static async doRequest(options: any): Promise<any> {
    try {
      if (options.query) {
        const query = queryString.stringify(options.query, {
          arrayFormat: 'comma',
        });
        options.url = options.url + '?' + query;
        delete options.query;
      }
      const response = await api(options);
      return { success: true, payload: response };
    } catch (error: any) {
      throw error;
    }
  }
}

export default Request;
