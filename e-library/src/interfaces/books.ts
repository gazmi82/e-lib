export interface Author {
  id: number;
  emriPlote: string;
  ditelindja: Date;
}

export interface kategoriaList {
  id: string;
  listeKategoria:
    | 'TEKST_MESIMOR'
    | 'MONOGRAFI'
    | 'MANUAL'
    | 'CIKEL_LEKSIONESH'
    | 'KOMENTAR'
    | 'REVISTA_PERIODIKE_SHKENCORE'
    | 'REVISTA_PERIODIKE_PROFESIONALE';
}

export interface fushaList {
  id: string;
  listeFusha:
    | 'E_DREJTA_PENALE'
    | 'E_DREJTA_CIVILE'
    | 'PROCUDURE_PENALE'
    | 'PROCEDURE_CIVILE';
}

export interface Book {
  autoreTeLibrave: Array<Author>;
  dataPublikimit: string;
  dataRegjistrimit: string;
  emri: string;
  fileUrl: string;
  filename: string;
  favorite: boolean;
  fushaList: Array<fushaList>;
  id: 42;
  imgName: string;
  imgUrl: string;
  kategoriaList: Array<kategoriaList>;
  kodiISBN: string;
  lloji: 'LIBER' | 'PERIODIK';
  nrFaqeve: number;
  pershkrimi: string;
  faqeTeLexuara: number;
  cmimi: number;
  mePagese: boolean;
}
export interface Library {
  id: number;
  libri: Book;
  dataRegjistrimit: string;
  faqeTeLexuara: number;
}
