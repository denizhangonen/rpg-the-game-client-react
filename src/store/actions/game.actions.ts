import axios from '../../Shared/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getChar = createAsyncThunk(
  '',
  async ({ userId }: { userId: string }) => {
    try {
      const response = await axios.get(`/char/getUserCharDetails/${userId}`);
      return response.data.data;
    } catch (error) {
      console.log('error:', error);
    }
  }
);

