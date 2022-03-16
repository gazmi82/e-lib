import React from 'react';
import CostumLoadable from '../components/Loaders/CostumLoadable';
import routesWithPermissions from './routesWithPermissions';

type Route = {
  caseSensitive?: boolean;
  children?: Route[];
  element?: React.ReactNode;
  path?: string;
};

const HomePageLoader = () => import('../pages/Home');
const ViewAllBooksLoader = () => import('../pages/viewAllBooks');
const ViewAllMagazinesLoader = () => import('../pages/viewAllMagazines');
const MyLibraryLoader = () => import('../pages/myLibrary');
const CreateBooks = () => import('../pages/createBooks/index');
const EditBooks = () => import('../pages/editBook');
const Login = () => import('../pages/auth/login');
const Register = () => import('../pages/auth/register');
const SingleBook = () => import('../pages/singleBook/singleBookPage');
const Authors = () => import('../pages/authors');
const ManageUsers = () => import('../pages/manageUsers');

const routes: Route[] = [
  {
    path: '/',
    element: <CostumLoadable loader={HomePageLoader} path="/" />,
  },
  {
    path: '/books',
    element: <CostumLoadable loader={ViewAllBooksLoader} path="/books" />,
  },
  {
    path: '/manage/books',
    element: (
      <CostumLoadable loader={ViewAllBooksLoader} path="/manage/books" />
    ),
  },
  {
    path: '/books/:id',
    element: <CostumLoadable loader={SingleBook} path="/books/:id" />,
  },
  {
    path: '/manage/edit-books/:id',
    element: (
      <CostumLoadable loader={EditBooks} path="/manage/edit-books/:id" />
    ),
  },
  {
    path: '/magazines',
    element: (
      <CostumLoadable loader={ViewAllMagazinesLoader} path="/magazines" />
    ),
  },
  {
    path: '/manage/magazines',
    element: (
      <CostumLoadable
        loader={ViewAllMagazinesLoader}
        path="/manage/magazines"
      />
    ),
  },
  {
    path: '/library',
    element: <CostumLoadable loader={MyLibraryLoader} path="/library" />,
  },
  {
    path: '/manage/create-book',
    element: <CostumLoadable loader={CreateBooks} path="/manage/create-book" />,
  },
  {
    path: '/manage',
    element: <CostumLoadable loader={ManageUsers} path="/manage" />,
  },
  {
    path: '/login',
    element: <CostumLoadable loader={Login} path="/login" />,
  },
  {
    path: '/register',
    element: <CostumLoadable loader={Register} path="/register" />,
  },
  {
    path: '/manage/authors',
    element: <CostumLoadable loader={Authors} path="/manage/authors" />,
  },
];

export default routes;
