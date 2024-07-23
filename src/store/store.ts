import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './reducers/a.reducer';
import authReducer from './reducers/auth.reducer';
import gameReducer from './reducers/game.reducer';
import battleReducer from './reducers/battle.reducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    game: gameReducer,
    battle: battleReducer,
  },
  // No need to manually add middleware; Redux Toolkit does it by default
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
