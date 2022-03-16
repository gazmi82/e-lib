import React from 'react';

interface Author {
  id?: number;
  value?: number;
  label?: string;
}

interface Category {
  id?: number;
  value?: string;
  label?: string;
  listeKategoria?: string;
}

interface listeFusha {
  listeFusha: string;
  value?: string;
}

interface CreateBookData {
  image?: any;
  emri?: string;
  pershkrimi?: string;
  autoreTeLibrave?: Array<Author>;
  kategoriaList?: Array<Category>;
  fushaList?: any;
  lloji?: string;
  dataPublikimit?: string;
  nrFaqeve?: string;
  kodiISBN?: string;
  cmimi?: number;
  mePagese?: any;
  file?: any;
}
const createBookDataTransformer = (data: CreateBookData) => {
  const bookData: CreateBookData = {};
  const bookFiles: CreateBookData = {};
  Object.keys(data).forEach(key => {
    switch (key) {
      case 'emri':
      case 'pershkrimi':
      case 'lloji':
      case 'nrFaqeve':
      case 'kodiISBN':
      case 'cmimi':
      case 'mePagese':
        bookData[key] = data[key];
        break;
      case 'dataPublikimit':
        bookData[key] = data[key];
        break;
      case 'fushaList':
        bookData['fushaList'] = data.fushaList?.map((fusha: any) => {
          return { listeFusha: fusha.value };
        });
        break;
      case 'kategoriaList':
        bookData['kategoriaList'] = data.kategoriaList?.map(cat => {
          return { listeKategoria: cat.value };
        });
        break;
      case 'autoreTeLibrave':
        bookData['autoreTeLibrave'] = data.autoreTeLibrave?.map(aut => {
          //added emriPlote temporary for when updating books
          return { id: aut.value, emriPlote: aut.label };
        });
        break;
      case 'file':
      case 'image':
        bookFiles[key] = data[key];
        break;
    }
  });
  return { bookData, bookFiles };
};

export default createBookDataTransformer;
