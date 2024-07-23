import axios from '../../Shared/axios';
import jwtDecode from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import * as ACTION_TYPES from './actionTypes/auth-types';
import * as AUTH_ROUTES from '../../Shared/Routes/authRoutes';
import * as GLOSSARY from '../../Shared/glossary';
import IAuth from '../../Shared/models/Auth/IAuth';
import * as AUTH_UTILITIES from '../../Shared/authUtilities';

export const auth =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(authStart());
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
      dispatch(authSuccess(successObj));
    } catch (err) {
      dispatch(authFail(err));
    }
  };

const authStart = () => ({
  type: ACTION_TYPES.AUTH_START,
});

const authSuccess = (data: IAuth) => ({
  type: ACTION_TYPES.AUTH_SUCCESS,
  payload: data,
});

const authFail = (error: any) => ({
  type: ACTION_TYPES.AUTH_FAIL,
  payload: error,
});

export const authCheckState = createAsyncThunk(
  'auth/checkState',
  async (_, { dispatch }) => {
    const token = localStorage.getItem(GLOSSARY.ACCESS_TOKEN);
    if (!token) {
      dispatch(logout());
      return null;
    } else {
      const expirationDate = new Date(
        localStorage.getItem(GLOSSARY.ACCESS_TOKEN_EXPIRATION_DATE) as string
      );

      if (expirationDate <= new Date()) {
        dispatch(logout());
        return null;
      } else {
        const email = localStorage.getItem(GLOSSARY.EMAIL);
        const userId = localStorage.getItem(GLOSSARY.USERID);
        const charId = localStorage.getItem(GLOSSARY.CHAR_ID);
        if (email && token && userId && expirationDate && charId) {
          const successObj: IAuth = {
            email,
            token,
            userId,
            expirationDate: expirationDate.toString(),
            charId,
          };

          dispatch(authSuccess(successObj));
          return successObj;
        } else {
          dispatch(logout());
          return null;
        }
      }
    }
  }
);

export const logout = () => {
  AUTH_UTILITIES.clearLocalStorage();
  return {
    type: ACTION_TYPES.AUTH_LOGOUT,
  };
};

