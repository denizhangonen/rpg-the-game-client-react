import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './reducers/a.reducer';

export const store = configureStore({
  reducer: {
    counter: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
