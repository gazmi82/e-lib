import { kategoriaList } from '../../interfaces/books';

const capitalize = (string: string) => {
  const words = string.toLowerCase().split('_');
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(' ');
};

const categoryDataTransformer = (array: Array<kategoriaList>) => {
  return array.map(data => {
    return {
      value: data?.listeKategoria,
      label: capitalize(data?.listeKategoria),
    };
  });
};

export default categoryDataTransformer;
