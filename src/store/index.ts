import createSagaMiddleware from 'redux-saga'

import { configureStore } from '@reduxjs/toolkit'

import editorReducer from '../tabs/editor/editorSlice'

import saga from './saga'

let sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    editor: editorReducer
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware
  ]
})

sagaMiddleware.run(saga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
