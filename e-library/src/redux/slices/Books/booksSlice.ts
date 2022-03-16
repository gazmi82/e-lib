import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { booksApis } from './BooksApi';
import notificationThrower from '../../../helpers/notificationThrower';
import { Book } from '../../../interfaces/books';

interface BookState {
  books: Array<Book>;
  homePageData: {
    homeBooks: Array<Book>;
    homeRevist: Array<Book>;
  };
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: BookState = {
  books: [],
  homePageData: {
    homeBooks: [],
    homeRevist: [],
  },
  loading: false,
  error: null,
  currentPage: 0,
};

export const createBooks = createAsyncThunk<
  { books: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('books/createBooks', async (query, thunkApi) => {
  const response = await booksApis.crateBook(query.bookData);

  if (response.success) {
    const files = new FormData();
    files.append('id', response.payload.data.id);
    files.append('file', query.bookFiles.file);
    files.append('image', query.bookFiles.image);
    thunkApi.dispatch(postBookResourses(files));
  }
  return response.data;
});

export const postBookResourses = createAsyncThunk<
  { payload: any; files: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('books/postBookResourses', async (query, thunkApi) => {
  const response = await booksApis.postBookResourses(query);
  return response;
});

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await booksApis.fetchBooks();
  return response;
});

export const updateBookProgres = createAsyncThunk(
  'books/updateBookProgres',
  async (args: { faqeTeLexuara: number; id: number }) => {
    const response = await booksApis.updateBookProgres(
      Number(args.faqeTeLexuara),
      args.id,
    );
    return response;
  },
);

export const fetchHomePageData = createAsyncThunk(
  'books/fetchHomePageData',
  async (args: { query: any; type: string }) => {
    const response = await booksApis.fetchHomePageData(args.query);
    return { type: args.type, response: response };
  },
);

export const updateBookData = createAsyncThunk<
  { payload: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('books/updateBookData', async (args: { data: any; id: number }) => {
  const response = await booksApis.updateBookData(args.data, args.id);
  return response;
});

export const updateBookFile = createAsyncThunk<
  { payload: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('books/updateBookFile', async (args: { data: any; id: any }) => {
  const file = new FormData();
  file.append('id', args.id);
  file.append('file', args.data);
  const response = await booksApis.updateBookFile(file);
  return response;
});

export const updateBookImage = createAsyncThunk<
  { payload: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('books/updateBookImage', async (args: { data: any; id: any }) => {
  const image = new FormData();
  image.append('id', args.id);
  image.append('file', args.data);
  const response = await booksApis.updateBookImage(image);
  return response;
});
export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (id: number) => {
    const response = await booksApis.deleteBook(id);
    return response;
  },
);
export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    resetBooksState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        return {
          ...state,
          books: action.payload.payload.data.librat,
          currentPage: action.payload.payload.data.currentPage,
          loading: false,
        };
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 6000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(fetchHomePageData.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchHomePageData.fulfilled, (state, action) => {
        if (action.payload.type === 'revist') {
          state.homePageData.homeRevist = action.payload.response.payload.data;
        } else {
          state.homePageData.homeBooks = action.payload.response.payload.data;
        }
        state.loading = false;
      })
      .addCase(fetchHomePageData.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 6000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(updateBookProgres.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Progresi nuk u ruajt',
          duration: 6000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
        };
      })
      .addCase(createBooks.pending, state => {
        notificationThrower({
          type: 'info',
          title: 'Info',
          duration: 6000,
          message: 'Duke ruajtur te dhenat e librit' as string,
        });
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createBooks.fulfilled, (state, action) => {
        notificationThrower({
          type: 'success',
          title: 'Te dhenat e librit u ruajten me sukses.',
          duration: 7000,
          message:
            'Ju lutemi te prisni derisa te ruhen dokumentet e librit' as string,
        });
        return {
          ...state,
          books: [],
          loading: false,
        };
      })
      .addCase(createBooks.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 6000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(postBookResourses.pending, state => {
        notificationThrower({
          type: 'info',
          title: 'Info',
          duration: 6000,
          message: 'Duke ruajtur dokumentat e librit' as string,
        });
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(postBookResourses.fulfilled, (state, action) => {
        notificationThrower({
          type: 'success',
          title: 'Dokumentat e librit u ruajten me sukses.',
          duration: 6000,
          message: 'Dokumentat e librit u ruajten me sukes.' as string,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(postBookResourses.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 6000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(updateBookData.pending, state => {
        notificationThrower({
          type: 'info',
          title: 'Info',
          duration: 6000,
          message: 'Duke ruajtur te dhenat e librit' as string,
        });
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateBookData.fulfilled, state => {
        notificationThrower({
          type: 'success',
          title: 'Ndryshimi u krye',
          duration: 7000,
          message: 'Te dhenat e librit u ruajten me sukses.' as string,
        });
        return {
          ...state,
          books: [],
          loading: false,
        };
      })
      .addCase(updateBookData.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 6000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(updateBookFile.pending, state => {
        notificationThrower({
          type: 'info',
          title: 'Info',
          duration: 6000,
          message: 'Duke ruajtur dokumentin' as string,
        });
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateBookFile.fulfilled, state => {
        notificationThrower({
          type: 'success',
          title: 'Ndryshimi u krye',
          duration: 7000,
          message: 'Dokumenti u ruajt me sukses.' as string,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(updateBookFile.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 6000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(updateBookImage.pending, state => {
        notificationThrower({
          type: 'info',
          title: 'Info',
          duration: 6000,
          message: 'Duke ruajtur imazhin' as string,
        });
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateBookImage.fulfilled, state => {
        notificationThrower({
          type: 'success',
          title: 'Ndryshimi u krye',
          duration: 7000,
          message: 'Imazhi u ruajt me sukses.' as string,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(updateBookImage.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 6000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(deleteBook.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteBook.fulfilled, state => {
        notificationThrower({
          type: 'success',
          title: 'Libri u fshi me sukses.',
          duration: 6000,
          message: '',
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(deleteBook.rejected, (state, action) => {
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

export const { resetBooksState } = booksSlice.actions;

export const selectBooks = (state: RootState) => state.books;
export const selectHomePageData = (state: RootState) =>
  state.books.homePageData;
export const selectErrorMessage = (state: RootState) => state.books.error;
export const selectLoading = (state: RootState) => state.books.loading;
export default booksSlice.reducer;
