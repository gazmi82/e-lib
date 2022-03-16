import {fushaList } from '../../interfaces/books';

const capitalize = (string:string) => {
    const words = string.toLowerCase().split("_");

    for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}

const fieldDataTransformer = (array: Array<fushaList>) => {
  return array.map(data => {
    return { id: data.id ,value: data?.listeFusha ,label: capitalize(data?.listeFusha) };
  });
};

export default fieldDataTransformer;
