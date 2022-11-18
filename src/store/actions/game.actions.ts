import * as ACTION_TYPES from '../actions/actionTypes/auth-types';
import * as AUTH_ROUTES from '../../Shared/Routes/authRoutes';
import * as AUTH_UTILITIES from '../../Shared/authUtilities';
import * as GLOSSARY from '../../Shared/glossary';
import axios from '../../Shared/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getChar = createAsyncThunk(
    '',
    async ({ userId }: { userId: string }) => {
        try {
            const response = await axios.get(
                `/char/getUserCharDetails/${userId}`
            );
            return response.data.data;
        } catch (error) {
            console.log('error:', error);
        }
    }
);

