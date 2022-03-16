interface SelectOptionsProps {
  id: any;
  value: string;
  label: string;
}
interface ApproveOptions {
  id: any;
  value: boolean;
  label: string;
}

export const bookCategoryOptions: Array<SelectOptionsProps> = [
  { id: 1, value: 'TEKST_MESIMOR', label: 'Tekst Mesimor' },
  { id: 2, value: 'MONOGRAFI', label: 'Monografi' },
  { id: 3, value: 'MANUAL', label: 'Manual' },
  { id: 4, value: 'CIKEL_LEKSIONESH', label: 'Cikel Leksionesh' },
  { id: 5, value: 'KOMENTAR', label: 'Komentar' },
];
export const magazineCategoryOptions: Array<SelectOptionsProps> = [
  {
    id: 6,
    value: 'REVISTA_PERIODIKE_SHKENCORE',
    label: 'Revista Periodike Shkencore',
  },
  {
    id: 7,
    value: 'REVISTA_PERIODIKE_PROFESIONALE',
    label: 'Revista Periodike Profesionale',
  },
];

export const fieldOptions: Array<SelectOptionsProps> = [
  { id: 1, value: 'E_DREJTA_PENALE', label: 'E Drejta Penale' },
  { id: 2, value: 'E_DREJTA_CIVILE', label: 'E Drejta Civile' },
  { id: 3, value: 'PROCUDURE_PENALE', label: 'Procedure Penale' },
  { id: 4, value: 'PROCEDURE_CIVILE', label: 'Procedure Civile' },
];

export const typeOptions: Array<SelectOptionsProps> = [
  { id: 1, value: 'LIBER', label: 'Liber' },
  { id: 2, value: 'PERIODIK', label: 'Periodik' },
];

export const biblioLevelOptions: Array<SelectOptionsProps> = [
  { id: 1, value: 'Niveli 1', label: 'Niveli 1' },
  { id: 2, value: 'Niveli 2', label: 'Niveli 2' },
  { id: 3, value: 'Niveli 3', label: 'Niveli 3' },
];

export const userRoleOptions: Array<SelectOptionsProps> = [
  { id: 1, value: 'ADMIN', label: 'Admin' },
  { id: 2, value: 'MENAXHER', label: 'Menaxher' },
  { id: 3, value: 'PERDORUES', label: 'Perdorues' },
];

export const userTypeOptions: Array<SelectOptionsProps> = [
  { id: 1, value: 'GJYKATES', label: 'Gjykates' },
  { id: 2, value: 'PROKUROR', label: 'Prokuror' },
  { id: 3, value: 'STUDENT', label: 'Student' },
];

export const userApproveOptions: Array<ApproveOptions> = [
  { id: 1, value: true, label: 'Aktiv' },
  { id: 2, value: false, label: 'Inaktiv' },
];
