export interface User {
  id: number;
  emri: string;
  mbiemri: string;
  username: string;
  email: string;
  aprovuar: boolean;
  roli: 'ADMIN' | 'MENAXHER' | 'PERDORUES';
  tipPerdorues: 'GJYKATES' | 'PROKUROR' | 'STUDENT';
}
