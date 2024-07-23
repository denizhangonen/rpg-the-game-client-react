import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../Shared/axios';

export const getBattleState = createAsyncThunk(
  'battle/getBattleState',
  async (battleId: string) => {
    const response = await axios.get(`/battle/1vs1/${battleId}/state`);
    return response.data.battle;
  }
);

export const performAction = createAsyncThunk(
  'battle/performAction',
  async ({
    battleId,
    playerId,
    actionType,
    value,
  }: {
    battleId: string;
    playerId: string;
    actionType: string;
    value: number;
  }) => {
    const response = await axios.post(`/battle/1vs1/${battleId}/action`, {
      playerId,
      actionType,
      value,
    });

    return response.data.battle;
  }
);

