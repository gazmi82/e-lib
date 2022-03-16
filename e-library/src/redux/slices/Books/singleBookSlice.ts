import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
  ActionReducerMapBuilder,
} from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store';
import { booksApis } from './BooksApi';
import notificationThrower from '../../../helpers/notificationThrower';
import { Book } from '../../../interfaces/books';
import { fetchHomePageData } from './booksSlice';
import { useDispatch } from 'react-redux';
interface BookState {
  singleBook: Book | null;
  singleBookLoading: boolean;
  error: string | null;
}

const initialState: BookState = {
  singleBook: null,
  singleBookLoading: false,
  error: null,
};

export const saveInLibraria = createAsyncThunk<
  { payload: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('book/saveInLibraria', async (data, thunkApi) => {
  const response = await booksApis.saveInLibraria(data);
  // thunkApi.dispatch(
  //   fetchHomePageData({
  //     type: 'revist',
  //     query: { lloji: 'PERIODIK', numri: 5 },
  //   }),
  // );
  // thunkApi.dispatch(
  //   fetchHomePageData({ type: 'liber', query: { lloji: 'LIBER', numri: 5 } }),
  // );
  return response;
});

export const removeFromLibraria = createAsyncThunk<
  { payload: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('book/removeFromLibraria', async (id, thunkApi) => {
  const response = await booksApis.removeFromLibraria(id);
  // thunkApi.dispatch(
  //   fetchHomePageData({
  //     type: 'revist',
  //     query: { lloji: 'PERIODIK', numri: 5 },
  //   }),
  // );
  // thunkApi.dispatch(
  //   fetchHomePageData({ type: 'liber', query: { lloji: 'LIBER', numri: 5 } }),
  // );
  return response;
});

export const fetchSingleBook = createAsyncThunk(
  'books/fetchSingleBook',
  async (id: any) => {
    const response = await booksApis.fetchSingleBook(id);
    return response;
  },
);

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: { resetBookState: () => initialState },
  extraReducers: builder => {
    builder
      .addCase(fetchSingleBook.pending, state => {
        return {
          ...state,
          singleBookLoading: true,
        };
      })
      .addCase(fetchSingleBook.fulfilled, (state, action) => {
        return {
          ...state,
          singleBook: action.payload.payload.data,
          singleBookLoading: false,
        };
      })
      .addCase(fetchSingleBook.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 4000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          singleBookLoading: false,
        };
      })
      .addCase(saveInLibraria.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(saveInLibraria.fulfilled, (state, action) => {
        notificationThrower({
          type: 'success',
          title: 'Libri u ruajt me sukses.',
          duration: 6000,
          message: '',
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(saveInLibraria.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 4000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(removeFromLibraria.fulfilled, (state, action) => {
        notificationThrower({
          type: 'success',
          title: 'Libri u hoq nga libraria me sukses.',
          duration: 6000,
          message: '',
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(removeFromLibraria.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 4000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      });
  },
});

export const { resetBookState } = bookSlice.actions;

export const selectSingleBook = (state: RootState) => state.singleBook;
export const selectSingleBookErrorMessage = (state: RootState) =>
  state.singleBook.error;
export const selectSingleBookLoading = (state: RootState) =>
  state.singleBook.singleBookLoading;

export default bookSlice.reducer;
