import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { authorsApis } from './AuthorsApi';
import notificationThrower from '../../../helpers/notificationThrower';
import { Author } from '../../../interfaces/books';

interface AuthorsState {
  authors: Array<Author>;
  loading: boolean;
  totalPages: number;
  currentPage: number;
  error: string | null;
  singleAuthor: Author | null;
  singleAuthorLoading: boolean;
}

const initialState: AuthorsState = {
  authors: [],
  totalPages: 0,
  currentPage: 0,
  loading: false,
  error: null,
  singleAuthor: null,
  singleAuthorLoading: false,
};

export const fetchAuthors = createAsyncThunk<
  { payload: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('authors/fetchAuthors', async (args: any) => {
  const response = await authorsApis.fetchAuthors();
  return response;
});
export const createAuthor = createAsyncThunk(
  'authors/createAuthors',
  async (data: any) => {
    const response = await authorsApis.createAuthor(data);
    return response;
  },
);
export const deleteAuthor = createAsyncThunk(
  'authors/deleteAuthors',
  async (id: number) => {
    const response = await authorsApis.deleteAuthor(id);
    return response;
  },
);
export const updateAuthor = createAsyncThunk(
  'authors/updateAuthors',
  async (args: { data: any; id: number }) => {
    const response = await authorsApis.updateAuthor(args.data, args.id);
    return response;
  },
);
export const fetchSingleAuthor = createAsyncThunk(
  'authors/fetchSingleAuthor',
  async (id: number) => {
    const response = await authorsApis.fetchSingleAuthor(id);
    return response;
  },
);

export const authorsSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {
    resetAuthorState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAuthors.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        return {
          ...state,
          authors: action.payload?.payload?.data?.autoret ?? [],
          loading: false,
        };
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 3000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(fetchSingleAuthor.pending, state => {
        return {
          ...state,
          singleAuthorLoading: true,
        };
      })
      .addCase(fetchSingleAuthor.fulfilled, (state, action) => {
        return {
          ...state,
          singleAuthor: action.payload.payload.data,
          singleAuthorLoading: false,
        };
      })
      .addCase(fetchSingleAuthor.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 3000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          loading: false,
        };
      })
      .addCase(createAuthor.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(createAuthor.fulfilled, (state, action) => {
        notificationThrower({
          type: 'success',
          title: 'Autori u krijua me sukses.',
          duration: 7000,
        });
        return {
          ...state,
          authors: [],
          loading: false,
        };
      })
      .addCase(createAuthor.rejected, (state, action) => {
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
      .addCase(deleteAuthor.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteAuthor.fulfilled, state => {
        notificationThrower({
          type: 'success',
          title: 'Autori u fshi me sukses.',
          duration: 7000,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(deleteAuthor.rejected, (state, action) => {
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
      .addCase(updateAuthor.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateAuthor.fulfilled, state => {
        notificationThrower({
          type: 'success',
          title: 'Autori u ndryshua me sukses.',
          duration: 7000,
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(updateAuthor.rejected, (state, action) => {
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
      });
  },
});

export const selectAuthors = (state: RootState) => state.authors;
export const selectErrorMessage = (state: RootState) => state.authors.error;
export const selectLoading = (state: RootState) => state.authors.loading;
export const selectSingleAuthor = (state: RootState) =>
  state.authors.singleAuthor;
export const singleAuthorLoading = (state: RootState) =>
  state.authors.singleAuthorLoading;
export const { resetAuthorState } = authorsSlice.actions;

export default authorsSlice.reducer;
