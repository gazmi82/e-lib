import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import notificationThrower from '../../../../helpers/notificationThrower';
import { RootState } from '../../../store';
import { registerApi } from './registerApi';

interface RegisterState {
  isLoading: boolean;
  isAuth: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  isLoading: false,
  isAuth: false,
  error: null,
};

export const userRegister = createAsyncThunk<
  { payload: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('auth/signup', async (data: any) => {
  const response = await registerApi.Register(data);
  return response;
});

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userRegister.pending, state => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, state => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = '';
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message as any;
      });
  },
});

export const selectRegister = (state: RootState) => state.register;
export const selectErrorMessage = (state: RootState) => state.register.error;
export const selectLoading = (state: RootState) => state.register.isLoading;
export const selectAuth = (state: RootState) => state.register.isAuth;

export default registerSlice.reducer;
