import { Author } from '../../interfaces/books';

const authorsDataTransformer = (array: Array<Author>) => {
  return array.map(data => {
    return { value: data?.id, label: data?.emriPlote };
  });
};

export default authorsDataTransformer;
