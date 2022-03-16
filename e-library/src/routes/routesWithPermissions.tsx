interface stringToArray {
  [key: string]: Array<string>;
}

const routesWithPermissions: stringToArray = {
  '/': [],
  '/books': [],
  '/books/:id': [],
  '/magazines': [],
  '/library': [],
  '/manage/books': ['Administrator', 'Menaxher'],
  '/manage/magazines': ['Administrator', 'Menaxher'],
  '/manage/create-book': ['Administrator', 'Menaxher'],
  '/manage/edit-books/:id': ['Administrator', 'Menaxher'],
  '/manage/authors': ['Administrator', 'Menaxher'],
  '/login': [],
  '/register': [],
  '/manage': ['Administrator'],
};

export default routesWithPermissions;
