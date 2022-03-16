import Request from '../../../helpers/request';
import getConfig from '../../../helpers/config';

const config = getConfig();

const { test } = config;

export const booksApis = {
  crateBook: (data?: any) =>
    Request.doRequest({
      method: 'post',
      url: `${test.baseUrl}/libri/ruaj_librin`,
      data: data,
    }),
  postBookResourses: (data?: any) =>
    Request.doRequest({
      method: 'post',
      url: `${test.baseUrl}/libri/ruaj_resurset`,
      data: data,
    }),
  fetchBooks: (query?: any) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/libri`,
      query: query || {},
    }),
  fetchSingleBook: (id?: any) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/libri/get_libri/${id}`,
    }),
  fetchHomePageData: (query?: any) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/libri/home_view`,
      query: query || {},
    }),
  saveInLibraria: (data?: any) =>
    Request.doRequest({
      method: 'post',
      url: `${test.baseUrl}/libraria`,
      data: data,
    }),
  removeFromLibraria: (id?: any) =>
    Request.doRequest({
      method: 'delete',
      url: `${test.baseUrl}/libraria/${id}`,
    }),
  getLibrary: (query?: any) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/libraria`,
      query: query || {},
    }),
  updateBookProgres: (data: any, id: any) =>
    Request.doRequest({
      method: 'put',
      url: `${test.baseUrl}/libraria/${id}?faqeTeLexuara=${data}`,
    }),
  fetchAllBooks: (query?: any) =>
    Request.doRequest({
      method: 'get',
      url: `${test.baseUrl}/libri/all`,
      query: query || {},
    }),
  updateBookImage: (data: any) =>
    Request.doRequest({
      method: 'put',
      url: `${test.baseUrl}/libri/update_image`,
      data: data,
    }),
  updateBookFile: (data: any) =>
    Request.doRequest({
      method: 'put',
      url: `${test.baseUrl}/libri/update_resurset`,
      data: data,
    }),
  updateBookData: (data: any, id: any) =>
    Request.doRequest({
      method: 'put',
      url: `${test.baseUrl}/libri/${id}`,
      data: data,
    }),
  deleteBook: (id: number) =>
    Request.doRequest({
      method: 'delete',
      url: `${test.baseUrl}/libri/${id}`,
    }),
};
