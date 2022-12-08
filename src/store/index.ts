import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import counterReducer from '../counter/counterSlice'
import editorReducer from '../editor/editorSlice'

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    counter: counterReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
