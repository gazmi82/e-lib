import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import notificationThrower from '../../../helpers/notificationThrower';
import { User } from '../../../interfaces/users';
import { RootState } from '../../store';
import { usersApis } from './usersApi';

interface UserState {
  users: Array<User>;
  loading: boolean;
  error: string | null;
  singleUser: User | null;
  singleUserLoading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  singleUser: null,
  singleUserLoading: false,
};
export const fetchSingleUser = createAsyncThunk(
  'users/fetchSingleUser',
  async (id: number) => {
    const response = await usersApis.fetchSingleUser(id);
    return response;
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    const response = await usersApis.deleteUser(id);
    return response;
  },
);
export const updateUserRole = createAsyncThunk(
  'users/updateUserRole',
  async (args: { data: any; id: number }) => {
    const response = await usersApis.updateUserRole(args.data, args.id);
    return response;
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSingleUser.pending, state => {
        return {
          ...state,
          singleUserLoading: true,
        };
      })
      .addCase(fetchSingleUser.fulfilled, (state, action) => {
        return {
          ...state,
          singleUser: action.payload.payload.data,
          singleUserLoading: false,
        };
      })
      .addCase(fetchSingleUser.rejected, (state, action) => {
        notificationThrower({
          type: 'danger',
          title: 'Error',
          duration: 4000,
          message: action.error.message as string,
        });
        return {
          ...state,
          error: action.error.message as any,
          singleUserLoading: false,
        };
      })
      .addCase(deleteUser.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteUser.fulfilled, state => {
        notificationThrower({
          type: 'success',
          title: 'Perdoruesi u fshi me sukses.',
          duration: 6000,
          message: '',
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
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
      .addCase(updateUserRole.pending, state => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateUserRole.fulfilled, state => {
        notificationThrower({
          type: 'success',
          title: 'Perdoruesi u modifikua me sukses.',
          duration: 6000,
          message: '',
        });
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(updateUserRole.rejected, (state, action) => {
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

export const selectUsers = (state: RootState) => state.users;
export const selectErrorMessage = (state: RootState) => state.users.error;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectSingleUser = (state: RootState) => state.users.singleUser;
export const { resetUserState } = usersSlice.actions;
export default usersSlice.reducer;
