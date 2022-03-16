import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { loginApi } from './loginApi';
import jwt_decode from 'jwt-decode';
import { createAction } from '@reduxjs/toolkit';

interface LoginState {
  isLoading: boolean;
  isAuth: boolean;
  userRole: string | null;
  error: string | null;
}

const initialState: LoginState = {
  isLoading: false,
  isAuth: false,
  userRole: null,
  error: null,
};

export const userLogin = createAsyncThunk<
  { payload: any; success: boolean },
  any,
  { rejectValue: { payload: any; success: boolean } }
>('auth/login', async (data: any) => {
  const response = await loginApi.Login(data);
  return response;
});

export const logOut = createAction<null>('auth/logOut');

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userLogin.pending, state => {
        return {
          ...state,
          isLoading: true,
        };
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        localStorage.setItem('idToken', action.payload.payload.data.jwt);
        const decoded: any = jwt_decode(action.payload.payload.data.jwt);
        return {
          ...state,
          userRole: decoded.role[0],
          isLoading: false,
          isAuth: true,
          error: '',
        };
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message as any;
      })
      .addCase(logOut, (state, action) => {
        return {
          ...state,
          isLoading: false,
          isAuth: false,
          userRole: null,
          error: null,
        };
      });
  },
});

export const selectLogin = (state: RootState) => state.login;
export const selectUserRole = (state: RootState) => state.login.userRole;
export const selectErrorMessage = (state: RootState) => state.login.error;
export const selectLoading = (state: RootState) => state.login.isLoading;
export const selectAuth = (state: RootState) => state.login.isAuth;

export default loginSlice.reducer;
