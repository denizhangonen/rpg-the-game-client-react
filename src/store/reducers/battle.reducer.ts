import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { getBattleState, performAction } from '../actions/battle.actions';

interface IBattleReducerState {
    battle: any | null;
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: IBattleReducerState = {
    battle: null,
    status: 'idle',
    error: null,
};

export const battleSlice = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        battleSuccess: () => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBattleState.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getBattleState.fulfilled, (state, action) => {
                state.status = 'idle';
                state.battle = action.payload;
            })
            .addCase(getBattleState.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(performAction.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(performAction.fulfilled, (state, action) => {
                state.status = 'idle';
                state.battle = action.payload;
            })
            .addCase(performAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            });
    },
});

export const {} = battleSlice.actions;

// Selector to get battle state
export const selectBattle = (state: RootState) => state.battle.battle;

export default battleSlice.reducer;
