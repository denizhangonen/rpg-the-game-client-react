import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import IAuth from '../../Shared/models/Auth/IAuth';
import axios from '../../Shared/axios';
import jwtDecode from 'jwt-decode';
import * as AUTH_ROUTES from '../../Shared/Routes/authRoutes';
import * as AUTH_UTILITIES from '../../Shared/authUtilities';
import * as GLOSSARY from '../../Shared/glossary';
import { authCheckState } from '../actions/auth.actions';

interface IAuthReducerState {
  auth: IAuth | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: IAuthReducerState = {
  auth: undefined,
  status: 'idle',
};

export const loginAsync = createAsyncThunk(
  '/auth/login',
  async (payload: any) => {
    const { email, password } = payload;
    try {
      const response = await axios.post(AUTH_ROUTES.LOGIN, { email, password });
      const dT: any = jwtDecode(response.data.token);
      const successObj: IAuth = {
        email: email,
        token: response.data.token,
        userId: response.data.userId,
        expirationDate: new Date(dT.exp * 1000).toString(),
        charId: dT.charId,
      };
      await AUTH_UTILITIES.setLocalStorage(successObj);
      return successObj;
    } catch (error) {
      console.log('error:', error);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state, action: PayloadAction<IAuth>) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      AUTH_UTILITIES.clearLocalStorage();
      state.auth = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.auth = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(authCheckState.fulfilled, (state, action) => {
        state.auth = action.payload ?? undefined; // Handle null payload
        state.status = 'idle';
      });
  },
});

export const { authSuccess, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

