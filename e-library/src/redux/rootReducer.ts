import booksSlice from './slices/Books/booksSlice';
import counterReducer from './slices/counter/counterSlice';
import { combineReducers } from '@reduxjs/toolkit';
import authorsSlice from './slices/Authors/authorsSlice';
import singleBook from './slices/Books/singleBookSlice';
import loginSlice from './slices/AUTH/Login/loginSlice';
import registerSlice from './slices/AUTH/Register/registerSlice';
import usersSlice from './slices/Users/usersSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  books: booksSlice,
  authors: authorsSlice,
  singleBook: singleBook,
  login: loginSlice,
  register: registerSlice,
  users: usersSlice,
});

export default rootReducer;
